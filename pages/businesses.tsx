import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiService } from '../services/api';

interface Business {
  id: number;
  name: string;
  category: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'suspended';
  isVerified: boolean;
  registeredDate: string;
  lastUpdated: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const categories = ['Electronics', 'Textiles', 'Restaurant', 'IT Services', 'Grocery', 'Auto Repair', 'Beauty & Wellness', 'Fashion', 'Healthcare', 'Hardware', 'Jewellery', 'Furniture', 'Stationery', 'Flowers', 'Photography'];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [searchTerm, filterCategory, filterStatus]);

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || business.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: businesses.length,
    active: businesses.filter(b => b.status === 'active').length,
    pending: businesses.filter(b => b.status === 'pending').length,
    verified: businesses.filter(b => b.isVerified).length,
  };

  const handleStatusChange = async (businessId: number, newStatus: 'active' | 'pending' | 'suspended') => {
    try {
      // Add updateBusinessStatus method to apiService if it doesn't exist
      await fetch(`${process.env.NODE_ENV === 'production' ? 'https://localhubbackend-production.up.railway.app' : 'http://localhost:5000'}/api/businesses/${businessId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchBusinesses();
    } catch (error) {
      console.error('Error updating business status:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#e5080c'}}></div>
            <span className="ml-2 text-gray-600">Loading businesses...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Directory</h1>
          <p className="text-gray-600">Manage and monitor business listings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#fef2f2'}}>
                <svg className="w-6 h-6" style={{color: '#e5080c'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Businesses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Businesses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Verified Businesses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-600">{business.category}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    business.status === 'active' ? 'bg-green-100 text-green-800' :
                    business.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {business.status}
                  </span>
                  {business.isVerified && (
                    <span className="px-2 py-1 text-xs font-medium text-white rounded-full" style={{backgroundColor: '#e5080c'}}>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {business.owner}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {business.address}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {business.phone}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-medium">{business.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({business.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedBusiness(business)}
                  className="flex-1 text-white px-3 py-2 rounded-lg text-sm transition-colors hover:opacity-90"
                  style={{backgroundColor: '#e5080c'}}
                >
                  View Details
                </button>
                <select
                  value={business.status}
                  onChange={(e) => handleStatusChange(business.id, e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Business Detail Modal */}
        {selectedBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="text-white p-6 rounded-t-2xl" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBusiness.name}</h2>
                    <p className="text-red-100">{selectedBusiness.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBusiness(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-lg p-4 text-center" style={{backgroundColor: '#fef2f2'}}>
                    <div className="text-2xl font-bold" style={{color: '#e5080c'}}>{selectedBusiness.rating}</div>
                    <div className="text-sm" style={{color: '#c0392b'}}>Rating</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedBusiness.reviewCount}</div>
                    <div className="text-sm text-purple-800">Reviews</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-green-600">{selectedBusiness.status}</div>
                    <div className="text-sm text-green-800">Status</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-orange-600">{selectedBusiness.isVerified ? 'Yes' : 'No'}</div>
                    <div className="text-sm text-orange-800">Verified</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Business Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Owner:</span> <span className="font-medium">{selectedBusiness.owner}</span></div>
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{selectedBusiness.phone}</span></div>
                    <div><span className="text-gray-600">Email:</span> <span className="font-medium">{selectedBusiness.email}</span></div>
                    <div><span className="text-gray-600">Address:</span> <span className="font-medium">{selectedBusiness.address}</span></div>
                    <div><span className="text-gray-600">Description:</span> <span className="font-medium">{selectedBusiness.description}</span></div>
                    <div><span className="text-gray-600">Registered:</span> <span className="font-medium">{selectedBusiness.registeredDate}</span></div>
                    {selectedBusiness.website && (
                      <div><span className="text-gray-600">Website:</span> <span className="font-medium" style={{color: '#e5080c'}}>{selectedBusiness.website}</span></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}