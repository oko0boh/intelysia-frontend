import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image, AlertCircle, CheckCircle, Eye } from 'lucide-react';

export interface UploadedFile {
  id: string;
  file: File;
  type: string;
  preview?: string;
  status: 'uploading' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  showPreview?: boolean;
  className?: string;
  disabled?: boolean;
}

// Default configuration
const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/webp',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = DEFAULT_MAX_FILES,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  showPreview = true,
  className = '',
  disabled = false
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate file before adding
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`;
    }

    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Allowed types: ${acceptedTypes.map(type => type.split('/')[1]).join(', ')}`;
    }

    // Check total number of files
    if (files.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }

    return null;
  };

  // Create file preview for images
  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  };

  // Add files to the upload list
  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const fileArray = Array.from(fileList);
    const newFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const error = validateFile(file);
      
      if (error) {
        // Show error for invalid files
        const errorFile: UploadedFile = {
          id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          type: file.type,
          status: 'error',
          error
        };
        newFiles.push(errorFile);
        continue;
      }

      // Create uploaded file object
      const uploadedFile: UploadedFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      // Add preview for images
      if (showPreview && file.type.startsWith('image/')) {
        uploadedFile.preview = await createPreview(file);
      }

      newFiles.push(uploadedFile);

      // Simulate upload progress
      setTimeout(() => {
        uploadedFile.status = 'completed';
        uploadedFile.progress = 100;
        setFiles(prev => prev.map(f => f.id === uploadedFile.id ? uploadedFile : f));
        onFilesChange([...files.filter(f => f.status !== 'error'), uploadedFile]);
      }, 1000 + Math.random() * 2000);
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files, maxFiles, maxSize, acceptedTypes, showPreview, onFilesChange]);

  // Remove file from list
  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles.filter(f => f.status !== 'error'));
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, [disabled, addFiles]);

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  // Open file picker
  const openFilePicker = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-6 w-6" />;
    }
    return <FileText className="h-6 w-6" />;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-gray-400 cursor-pointer'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFilePicker}
      >
        <Upload className={`h-12 w-12 mx-auto mb-4 ${
          disabled ? 'text-gray-300' : 'text-gray-400'
        }`} />
        
        <p className={`mb-2 ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
          {disabled ? 'File upload disabled' : 'Drag and drop files here, or click to browse'}
        </p>
        
        <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
          Maximum {maxFiles} files, {(maxSize / (1024 * 1024)).toFixed(1)}MB per file
        </p>
        
        <p className={`text-xs mt-1 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
          Supported: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">
            Uploaded Files ({files.filter(f => f.status !== 'error').length})
          </h4>
          
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  file.status === 'error'
                    ? 'border-red-200 bg-red-50'
                    : file.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <div className="relative">
                        <img
                          src={file.preview}
                          alt=""
                          className="h-12 w-12 object-cover rounded cursor-pointer"
                          onClick={() => setPreviewFile(file)}
                        />
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className={`p-2 rounded ${
                        file.status === 'error'
                          ? 'text-red-500'
                          : file.status === 'completed'
                          ? 'text-green-500'
                          : 'text-blue-500'
                      }`}>
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.file.size)}
                    </p>
                    
                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {file.status === 'error' && file.error && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {file.error}
                      </p>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {file.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {file.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className={`ml-3 p-1 rounded-full hover:bg-gray-200 transition-colors ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={disabled}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewFile && previewFile.preview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {previewFile.file.name}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={previewFile.preview}
              alt={previewFile.file.name}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;