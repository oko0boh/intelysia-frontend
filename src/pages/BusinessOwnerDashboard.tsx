import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Eye, 
  Phone, 
  Globe, 
  MapPin, 
  Star, 
  MessageCircle, 
  Settings, 
  Edit3, 
  Camera, 
  Clock,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';

interface BusinessStats {
  views: number;
  callClicks: number;
  websiteClicks: number;
  directionClicks: number;
  reviewCount: number;
  averageRating: number;
  monthlyGrowth: number;
}

interface BusinessInfo {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  hours: string;
  photos: string[];
  verified: boolean;
  claimed: boolean;
}

interface Notification {
  id: string;
  type: 'review' | 'update' | 'verification' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const BusinessOwnerDashboard: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    id: 'business-123',
    name: 'Restaurant Le Palmier',
    category: 'Restaurant & Food',
    address: '123 Avenue de la République, Cotonou, Benin',
    phone: '+229 96 12 34 56',
    email: 'contact@lepalmier.bj',
    website: 'https://lepalmier.bj',
    description: 'Authentic Beninese cuisine in the heart of Cotonou. We serve traditional dishes with a modern twist, using fresh local ingredients.',
    hours: 'Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM',
    photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
    verified: true,
    claimed: true
  });

  const [stats, setStats] = useState<BusinessStats>({
    views: 1247,
    callClicks: 89,
    websiteClicks: 156,
    directionClicks: 234,
    reviewCount: 42,
    averageRating: 4.3,
    monthlyGrowth: 12
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star review from Marie Kone',
      timestamp: new Date('2024-01-15T10:30:00'),
      read: false
    },
    {
      id: '2',
      type: 'update',
      title: 'Profile Update',
      message: 'Your business hours have been updated successfully',
      timestamp: new Date('2024-01-14T15:20:00'),
      read: true
    },
    {
      id: '3',
      type: 'verification',
      title: 'Verification Complete',
      message: 'Your business has been verified successfully',
      timestamp: new Date('2024-01-13T09:15:00'),
      read: true
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'reviews' | 'photos' | 'settings'>('overview');

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Render notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'update':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'verification':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOHead
        title="Business Dashboard - Intelysia"
        description="Manage your business listing, view analytics, and respond to customers."
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{businessInfo.name}</h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {businessInfo.category} • {businessInfo.address.split(',')[1]}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Verification Badge */}
              {businessInfo.verified && (
                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </div>
              )}

              {/* View Public Profile */}
              <Link
                to={`/business/${businessInfo.id}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart className="h-4 w-4 inline mr-2" />
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Analytics
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === 'reviews'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="h-4 w-4 inline mr-2" />
                Reviews ({stats.reviewCount})
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === 'photos'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Camera className="h-4 w-4 inline mr-2" />
                Photos ({businessInfo.photos.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Settings
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition">
                  <Edit3 className="h-4 w-4 inline mr-2" />
                  Edit Business Info
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition">
                  <Camera className="h-4 w-4 inline mr-2" />
                  Add Photos
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Update Hours
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Profile Views</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-green-600 text-sm mt-2 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{stats.monthlyGrowth}% this month
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Phone Calls</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.callClicks}</p>
                      </div>
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">This month</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Website Clicks</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.websiteClicks}</p>
                      </div>
                      <Globe className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">This month</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Directions</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.directionClicks}</p>
                      </div>
                      <MapPin className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">This month</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition ${
                          !notification.read ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Info Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <Edit3 className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Category</label>
                          <p className="text-gray-900">{businessInfo.category}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Phone</label>
                          <p className="text-gray-900">{businessInfo.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <p className="text-gray-900">{businessInfo.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Website</label>
                          <p className="text-gray-900">{businessInfo.website}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Hours</label>
                          <p className="text-gray-900">{businessInfo.hours}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Rating</label>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(stats.averageRating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-900">
                              {stats.averageRating} ({stats.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900 mt-1">{businessInfo.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'overview' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h3>
                <p className="text-gray-600">
                  This section is under development. Check back soon for more features!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOwnerDashboard;