import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Play,
  Pause,
  RotateCcw,
  Settings,
  Info
} from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import FileUpload, { UploadedFile } from '../components/business/FileUpload';

interface ImportJob {
  id: string;
  fileName: string;
  fileSize: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'partial_success';
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  duplicateRows: number;
  startedAt?: Date;
  completedAt?: Date;
  errorLog?: string[];
  previewData?: any[];
}

interface ImportSettings {
  hasHeaders: boolean;
  delimiter: ',' | ';' | '\t' | '|';
  updateExisting: boolean;
  skipDuplicates: boolean;
  validateData: boolean;
}

const AdminBulkImportPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentJob, setCurrentJob] = useState<ImportJob | null>(null);
  const [importHistory, setImportHistory] = useState<ImportJob[]>([]);
  const [settings, setSettings] = useState<ImportSettings>({
    hasHeaders: true,
    delimiter: ',',
    updateExisting: false,
    skipDuplicates: true,
    validateData: true
  });
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file upload
  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      // Generate preview data for the first file
      generatePreviewData(files[0]);
    } else {
      setPreviewData(null);
    }
  };

  // Generate preview data from CSV file
  const generatePreviewData = async (file: UploadedFile) => {
    try {
      const text = await file.file.text();
      const lines = text.split('\n').slice(0, 10); // Preview first 10 rows
      const rows = lines.map(line => line.split(settings.delimiter));
      setPreviewData(rows);
    } catch (error) {
      console.error('Error generating preview:', error);
    }
  };

  // Start import process
  const startImport = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    const file = uploadedFiles[0];

    const newJob: ImportJob = {
      id: `job-${Date.now()}`,
      fileName: file.file.name,
      fileSize: file.file.size,
      status: 'in_progress',
      totalRows: 0,
      processedRows: 0,
      successRows: 0,
      errorRows: 0,
      duplicateRows: 0,
      startedAt: new Date(),
      previewData: previewData || []
    };

    setCurrentJob(newJob);

    // Simulate import process
    await simulateImport(newJob);
  };

  // Simulate import process with progress updates
  const simulateImport = async (job: ImportJob) => {
    const totalRows = Math.floor(Math.random() * 1000) + 100;
    job.totalRows = totalRows;

    for (let i = 0; i <= totalRows; i += Math.floor(Math.random() * 20) + 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const processed = Math.min(i, totalRows);
      const success = Math.floor(processed * 0.85);
      const errors = Math.floor(processed * 0.05);
      const duplicates = processed - success - errors;

      const updatedJob = {
        ...job,
        processedRows: processed,
        successRows: success,
        errorRows: errors,
        duplicateRows: duplicates,
        status: processed === totalRows ? 'completed' : 'in_progress'
      } as ImportJob;

      if (processed === totalRows) {
        updatedJob.completedAt = new Date();
        setImportHistory(prev => [updatedJob, ...prev]);
      }

      setCurrentJob(updatedJob);
    }

    setIsProcessing(false);
  };

  // Cancel import
  const cancelImport = () => {
    if (currentJob) {
      const cancelledJob = {
        ...currentJob,
        status: 'failed',
        completedAt: new Date()
      } as ImportJob;
      setImportHistory(prev => [cancelledJob, ...prev]);
      setCurrentJob(null);
    }
    setIsProcessing(false);
  };

  // Download sample CSV template
  const downloadTemplate = () => {
    const csvContent = `business_name,category,address,city,phone,email,website,description
"Sample Restaurant","Restaurant & Food","123 Main St","Cotonou","+229 12345678","info@restaurant.com","https://restaurant.com","A great place to eat"
"Tech Company","Technology & IT","456 Tech Ave","Cotonou","+229 87654321","contact@tech.com","https://tech.com","Leading technology solutions"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate progress percentage
  const getProgressPercentage = (job: ImportJob): number => {
    if (job.totalRows === 0) return 0;
    return Math.round((job.processedRows / job.totalRows) * 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEOHead
        title="Bulk Import - Admin Dashboard - Intelysia"
        description="Admin interface for bulk importing business data into Intelysia directory."
      />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Admin Dashboard
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bulk Import Businesses
              </h1>
              <p className="text-gray-600">
                Import multiple businesses from CSV or Excel files
              </p>
            </div>
            
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                Upload Business Data
              </h3>

              <FileUpload
                onFilesChange={handleFilesChange}
                maxFiles={1}
                maxSize={50 * 1024 * 1024} // 50MB
                acceptedTypes={[
                  'text/csv',
                  'application/vnd.ms-excel',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ]}
                showPreview={false}
                disabled={isProcessing}
              />

              {/* Import Settings */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Import Settings
                  </button>

                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.hasHeaders}
                              onChange={(e) => setSettings(prev => ({ ...prev, hasHeaders: e.target.checked }))}
                              className="mr-2"
                            />
                            File has headers
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delimiter
                          </label>
                          <select
                            value={settings.delimiter}
                            onChange={(e) => setSettings(prev => ({ ...prev, delimiter: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value="\t">Tab</option>
                            <option value="|">Pipe (|)</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.updateExisting}
                              onChange={(e) => setSettings(prev => ({ ...prev, updateExisting: e.target.checked }))}
                              className="mr-2"
                            />
                            Update existing businesses
                          </label>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.skipDuplicates}
                              onChange={(e) => setSettings(prev => ({ ...prev, skipDuplicates: e.target.checked }))}
                              className="mr-2"
                            />
                            Skip duplicates
                          </label>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.validateData}
                              onChange={(e) => setSettings(prev => ({ ...prev, validateData: e.target.checked }))}
                              className="mr-2"
                            />
                            Validate data before import
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 flex space-x-4">
                  {!isProcessing ? (
                    <button
                      onClick={startImport}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Import
                    </button>
                  ) : (
                    <button
                      onClick={cancelImport}
                      className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Cancel Import
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Preview Data */}
            {previewData && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Data Preview
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className={index === 0 && settings.hasHeaders ? 'bg-gray-50 font-medium' : ''}>
                          {row.map((cell: string, cellIndex: number) => (
                            <td key={cellIndex} className="px-3 py-2 border border-gray-200 text-sm">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Showing first 10 rows • Total rows will be calculated during import
                </p>
              </div>
            )}

            {/* Current Import Progress */}
            {currentJob && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Import Progress
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {currentJob.fileName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getProgressPercentage(currentJob)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(currentJob)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Processed:</span>
                      <span className="ml-1 font-medium">{currentJob.processedRows.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Success:</span>
                      <span className="ml-1 font-medium text-green-600">{currentJob.successRows.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Errors:</span>
                      <span className="ml-1 font-medium text-red-600">{currentJob.errorRows.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Duplicates:</span>
                      <span className="ml-1 font-medium text-yellow-600">{currentJob.duplicateRows.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Import Guidelines */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Import Guidelines
              </h3>

              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <strong>Required Fields:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    <li>business_name</li>
                    <li>category</li>
                    <li>city</li>
                  </ul>
                </div>

                <div>
                  <strong>Optional Fields:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    <li>address</li>
                    <li>phone</li>
                    <li>email</li>
                    <li>website</li>
                    <li>description</li>
                  </ul>
                </div>

                <div>
                  <strong>File Requirements:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    <li>CSV or Excel format</li>
                    <li>Maximum 50MB file size</li>
                    <li>UTF-8 encoding recommended</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Import History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Imports
              </h3>

              {importHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No imports yet</p>
              ) : (
                <div className="space-y-3">
                  {importHistory.slice(0, 5).map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {job.fileName}
                        </span>
                        {job.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {job.status === 'failed' && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>
                          {job.successRows.toLocaleString()} success, {job.errorRows.toLocaleString()} errors
                        </div>
                        <div>
                          {job.completedAt?.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkImportPage;