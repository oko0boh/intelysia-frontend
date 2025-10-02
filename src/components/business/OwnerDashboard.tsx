import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Phone, 
  Globe, 
  MapPin, 
  Eye, 
  TrendingUp, 
  Star,
  Edit3,
  Save,
  X,
  Clock,
  Mail,
  Camera,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { claimApiService } from '../../services/claimApi';
import { OwnerDashboardStats, BusinessUpdateRequest } from '../../types/claim';

interface OwnerDashboardProps {
  business: ProcessedBusiness;
  ownerId: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  business,
  ownerId
}) => {
  const [stats, setStats] = useState<OwnerDashboardStats | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: business.name,
    description: business.description,
    phone: business.enrichedPhones?.[0] || business.phone || '',
    email: business.enrichedEmails?.[0] || '',
    website: business.enrichedWebsites?.[0] || business.website || '',
    hours: business.enrichedHours?.[0] || business.hours || '',
    socialLinks: {
      facebook: business.social_links.facebook || '',
      instagram: business.social_links.instagram || '',
      twitter: business.social_links.twitter || '',
      whatsapp: business.enrichedSocial?.whatsapp?.[0] || ''
    }
  });
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, [business.id]);

  const loadDashboardStats = async () => {
    try {
      const response = await claimApiService.getOwnerDashboardStats(business.id);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  const handleSave = async () => {
    setUpdating(true);
    setUpdateMessage(null);

    try {
      const updateRequest: BusinessUpdateRequest = {
        businessId: business.id,
        ownerId: ownerId,
        updates: {
          name: editedData.name !== business.name ? editedData.name : undefined,
          description: editedData.description !== business.description ? editedData.description : undefined,
          phone: editedData.phone !== (business.enrichedPhones?.[0] || business.phone) ? editedData.phone : undefined,
          email: editedData.email !== (business.enrichedEmails?.[0] || '') ? editedData.email : undefined,
          website: editedData.website !== (business.enrichedWebsites?.[0] || business.website) ? editedData.website : undefined,
          hours: editedData.hours !== (business.enrichedHours?.[0] || business.hours) ? editedData.hours : undefined,
          socialLinks: editedData.socialLinks
        },
        updateReason: 'Owner update via dashboard'
      };

      const response = await claimApiService.updateBusinessInfo(updateRequest);
      if (response.success) {
        setUpdateMessage({ type: 'success', text: 'Business information updated successfully!' });
        setEditing(false);
        // In a real app, you'd refresh the business data here
      } else {
        setUpdateMessage({ type: 'error', text: response.error || 'Failed to update business information' });
      }
    } catch (error) {
      setUpdateMessage({ type: 'error', text: 'Failed to update business information' });
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditedData({
      name: business.name,
      description: business.description,
      phone: business.enrichedPhones?.[0] || business.phone || '',
      email: business.enrichedEmails?.[0] || '',
      website: business.enrichedWebsites?.[0] || business.website || '',
      hours: business.enrichedHours?.[0] || business.hours || '',
      socialLinks: {
        facebook: business.social_links.facebook || '',
        instagram: business.social_links.instagram || '',
        twitter: business.social_links.twitter || '',
        whatsapp: business.enrichedSocial?.whatsapp?.[0] || ''
      }
    });
    setEditing(false);
    setUpdateMessage(null);
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    return {
      value: Math.abs(growth),
      isPositive,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      bgColor: isPositive ? 'bg-green-100' : 'bg-red-100'
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your business information and view analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Owner Verified
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.businessViews.toLocaleString()}</p>
                <p className="text-gray-600">Profile Views</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className={`h-4 w-4 mr-1 ${formatGrowth(stats.monthlyGrowth).color}`} />
              <span className={`text-sm font-medium ${formatGrowth(stats.monthlyGrowth).color}`}>
                {formatGrowth(stats.monthlyGrowth).value}% this month
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.callClicks}</p>
                <p className="text-gray-600">Call Clicks</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.websiteClicks}</p>
                <p className="text-gray-600">Website Clicks</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MapPin className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.directionClicks}</p>
                <p className="text-gray-600">Direction Requests</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Information
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={updating}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                {updating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={updating}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {updateMessage && (
          <div className={`mb-4 p-4 rounded-lg border ${
            updateMessage.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              {updateMessage.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <p className={updateMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {updateMessage.text}
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              {editing ? (
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              {editing ? (
                <textarea
                  value={editedData.description}
                  onChange={(e) => setEditedData({...editedData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
              {editing ? (
                <input
                  type="text"
                  value={editedData.hours}
                  onChange={(e) => setEditedData({...editedData, hours: e.target.value})}
                  placeholder="e.g., Mon-Fri 9AM-6PM, Sat 10AM-4PM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.enrichedHours?.[0] || business.hours || 'Hours not specified'}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              {editing ? (
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.enrichedPhones?.[0] || business.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              {editing ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.enrichedEmails?.[0] || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              {editing ? (
                <input
                  type="url"
                  value={editedData.website}
                  onChange={(e) => setEditedData({...editedData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">
                  {business.enrichedWebsites?.[0] || business.website || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Social Media</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              {editing ? (
                <input
                  type="url"
                  value={editedData.socialLinks.facebook}
                  onChange={(e) => setEditedData({
                    ...editedData, 
                    socialLinks: {...editedData.socialLinks, facebook: e.target.value}
                  })}
                  placeholder="https://facebook.com/yourbusiness"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.social_links.facebook || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              {editing ? (
                <input
                  type="url"
                  value={editedData.socialLinks.instagram}
                  onChange={(e) => setEditedData({
                    ...editedData, 
                    socialLinks: {...editedData.socialLinks, instagram: e.target.value}
                  })}
                  placeholder="https://instagram.com/yourbusiness"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.social_links.instagram || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              {editing ? (
                <input
                  type="tel"
                  value={editedData.socialLinks.whatsapp}
                  onChange={(e) => setEditedData({
                    ...editedData, 
                    socialLinks: {...editedData.socialLinks, whatsapp: e.target.value}
                  })}
                  placeholder="+229 XX XX XX XX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.enrichedSocial?.whatsapp?.[0] || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
              {editing ? (
                <input
                  type="url"
                  value={editedData.socialLinks.twitter}
                  onChange={(e) => setEditedData({
                    ...editedData, 
                    socialLinks: {...editedData.socialLinks, twitter: e.target.value}
                  })}
                  placeholder="https://twitter.com/yourbusiness"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{business.social_links.twitter || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Summary */}
      {stats && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews & Rating</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(stats.averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalReviews}
              </div>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600">
                Last updated: {new Date(stats.lastUpdated).toLocaleDateString()}
              </div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;