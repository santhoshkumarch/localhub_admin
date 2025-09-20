import React, { useState } from 'react';
import Layout from '../../components/Layout';

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  district: string;
  businessCount: number;
  postsCount: number;
  isActive: boolean;
  isVerified: boolean;
  joinedDate: string;
  lastActive: string;
  avatar: string;
  businesses: Business[];
  userType: 'individual' | 'business';
}

interface Business {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  reviewCount: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, email: 'rajesh.kumar@gmail.com', name: 'Rajesh Kumar', phone: '+91 98765 43210', district: 'Chennai', businessCount: 2, postsCount: 15, isActive: true, isVerified: true, joinedDate: '2024-01-15', lastActive: '2 hours ago', avatar: 'RK', userType: 'business', businesses: [{ id: 1, name: 'Kumar Electronics', category: 'Electronics', address: 'T. Nagar, Chennai', phone: '+91 98765 43210', status: 'active', rating: 4.5, reviewCount: 23 }, { id: 2, name: 'RK Mobile Service', category: 'Mobile Repair', address: 'Anna Nagar, Chennai', phone: '+91 98765 43211', status: 'active', rating: 4.2, reviewCount: 18 }] },
    { id: 2, email: 'priya.s@yahoo.com', name: 'Priya Selvam', phone: '+91 87654 32109', district: 'Coimbatore', businessCount: 1, postsCount: 8, isActive: true, isVerified: true, joinedDate: '2024-01-12', lastActive: '1 day ago', avatar: 'PS', userType: 'business', businesses: [{ id: 3, name: 'Priya Textiles', category: 'Textiles', address: 'RS Puram, Coimbatore', phone: '+91 87654 32109', status: 'active', rating: 4.7, reviewCount: 35 }] },
    { id: 3, email: 'muthu.restaurant@gmail.com', name: 'Muthu Raman', phone: '+91 76543 21098', district: 'Madurai', businessCount: 1, postsCount: 22, isActive: true, isVerified: false, joinedDate: '2024-01-10', lastActive: '3 hours ago', avatar: 'MR', userType: 'business', businesses: [{ id: 4, name: 'Muthu Restaurant', category: 'Restaurant', address: 'Meenakshi Amman Temple St, Madurai', phone: '+91 76543 21098', status: 'active', rating: 4.3, reviewCount: 67 }] },
    { id: 4, email: 'anitha.textiles@hotmail.com', name: 'Anitha Devi', phone: '+91 65432 10987', district: 'Salem', businessCount: 1, postsCount: 5, isActive: false, isVerified: true, joinedDate: '2024-01-08', lastActive: '1 week ago', avatar: 'AD', userType: 'business', businesses: [{ id: 5, name: 'Anitha Saree Center', category: 'Textiles', address: 'Main Bazaar, Salem', phone: '+91 65432 10987', status: 'suspended', rating: 3.8, reviewCount: 12 }] },
    { id: 5, email: 'kumar.tech@gmail.com', name: 'Kumar Krishnan', phone: '+91 54321 09876', district: 'Tiruchirappalli', businessCount: 0, postsCount: 12, isActive: true, isVerified: false, joinedDate: '2024-01-05', lastActive: '5 minutes ago', avatar: 'KK', userType: 'individual', businesses: [] },
    { id: 6, email: 'lakshmi.store@gmail.com', name: 'Lakshmi Narayanan', phone: '+91 43210 98765', district: 'Vellore', businessCount: 1, postsCount: 18, isActive: true, isVerified: true, joinedDate: '2024-01-03', lastActive: '1 hour ago', avatar: 'LN', userType: 'business', businesses: [{ id: 6, name: 'Lakshmi General Store', category: 'Grocery', address: 'Gandhi Road, Vellore', phone: '+91 43210 98765', status: 'active', rating: 4.1, reviewCount: 28 }] },
    { id: 7, email: 'ravi.motors@yahoo.com', name: 'Ravi Chandran', phone: '+91 32109 87654', district: 'Erode', businessCount: 1, postsCount: 7, isActive: true, isVerified: true, joinedDate: '2023-12-28', lastActive: '4 hours ago', avatar: 'RC', userType: 'business', businesses: [{ id: 7, name: 'Ravi Auto Works', category: 'Auto Repair', address: 'Perundurai Road, Erode', phone: '+91 32109 87654', status: 'active', rating: 4.4, reviewCount: 19 }] },
    { id: 8, email: 'meera.fashion@gmail.com', name: 'Meera Balan', phone: '+91 21098 76543', district: 'Thanjavur', businessCount: 1, postsCount: 25, isActive: true, isVerified: false, joinedDate: '2023-12-25', lastActive: '2 days ago', avatar: 'MB', userType: 'individual', businesses: [{ id: 8, name: 'Meera Fashion Boutique', category: 'Fashion', address: 'Big Temple Street, Thanjavur', phone: '+91 21098 76543', status: 'pending', rating: 4.6, reviewCount: 41 }] },
    { id: 9, email: 'suresh.electronics@hotmail.com', name: 'Suresh Babu', phone: '+91 10987 65432', district: 'Dindigul', businessCount: 1, postsCount: 9, isActive: false, isVerified: true, joinedDate: '2023-12-20', lastActive: '3 days ago', avatar: 'SB', userType: 'business', businesses: [{ id: 9, name: 'Suresh Electronics', category: 'Electronics', address: 'Palani Road, Dindigul', phone: '+91 10987 65432', status: 'active', rating: 3.9, reviewCount: 15 }] },
    { id: 10, email: 'divya.beauty@gmail.com', name: 'Divya Priya', phone: '+91 09876 54321', district: 'Cuddalore', businessCount: 1, postsCount: 14, isActive: true, isVerified: true, joinedDate: '2023-12-18', lastActive: '6 hours ago', avatar: 'DP', userType: 'individual', businesses: [{ id: 10, name: 'Divya Beauty Parlour', category: 'Beauty & Wellness', address: 'Old Town, Cuddalore', phone: '+91 09876 54321', status: 'active', rating: 4.8, reviewCount: 52 }] },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterUserType, setFilterUserType] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul', 'Cuddalore'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.isActive) ||
                         (filterStatus === 'inactive' && !user.isActive) ||
                         (filterStatus === 'verified' && user.isVerified);
    const matchesDistrict = filterDistrict === 'all' || user.district === filterDistrict;
    const matchesUserType = filterUserType === 'all' || user.userType === filterUserType;
    
    return matchesSearch && matchesStatus && matchesDistrict && matchesUserType;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    verified: users.filter(u => u.isVerified).length,
    withBusiness: users.filter(u => u.businessCount > 0).length,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and monitor user accounts across all districts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-500">Active Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-500">Verified Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-500">Business Owners</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.withBusiness}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="verified">Verified Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Districts</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <select
                value={filterUserType}
                onChange={(e) => setFilterUserType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual Users</option>
                <option value="business">Business Users</option>
              </select>
            </div>

            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base">
                <span className="hidden sm:inline">Export Users</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Users ({filteredUsers.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Activity</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                          {user.avatar}
                        </div>
                        <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-xs sm:text-sm text-gray-900">{user.phone}</div>
                      <div className="text-xs sm:text-sm text-gray-500">Joined {user.joinedDate}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.userType === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.userType === 'business' ? 'Business' : 'Individual'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                      <div>{user.businessCount} businesses</div>
                      <div className="text-gray-500">{user.postsCount} posts</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {user.isVerified && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <button 
                          onClick={() => { setSelectedUser(user); setModalType('view'); }}
                          className="text-blue-600 hover:text-blue-900 text-left"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => { setSelectedUser(user); setEditForm(user); setModalType('edit'); }}
                          className="text-green-600 hover:text-green-900 text-left"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleSuspend(user.id)}
                          className="text-red-600 hover:text-red-900 text-left"
                        >
                          {user.isActive ? 'Suspend' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View User Modal */}
        {modalType === 'view' && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                      <p className="text-blue-100">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setModalType(null); setSelectedUser(null); }}
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
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedUser.businessCount}</div>
                    <div className="text-sm text-blue-800">Businesses</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedUser.postsCount}</div>
                    <div className="text-sm text-purple-800">Posts</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-green-600">{selectedUser.isActive ? 'Active' : 'Inactive'}</div>
                    <div className="text-sm text-green-800">Status</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-orange-600">{selectedUser.isVerified ? 'Yes' : 'No'}</div>
                    <div className="text-sm text-orange-800">Verified</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{selectedUser.phone}</span></div>
                    {/* <div><span className="text-gray-600">District:</span> <span className="font-medium">{selectedUser.district}</span></div> */}
                    <div><span className="text-gray-600">Joined:</span> <span className="font-medium">{selectedUser.joinedDate}</span></div>
                    <div><span className="text-gray-600">Last Active:</span> <span className="font-medium">{selectedUser.lastActive}</span></div>
                    <div><span className="text-gray-600">User Type:</span> <span className={`font-medium ${
                      selectedUser.userType === 'business' ? 'text-blue-600' : 'text-green-600'
                    }`}>{selectedUser.userType === 'business' ? 'Business User' : 'Individual User'}</span></div>
                  </div>
                </div>

                {/* User Businesses */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Businesses ({selectedUser.businesses.length})</h3>
                  {selectedUser.businesses.length === 0 ? (
                    <p className="text-gray-500 text-sm">No businesses registered</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedUser.businesses.map((business) => (
                        <div key={business.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{business.name}</h4>
                              <p className="text-sm text-gray-600">{business.category}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              business.status === 'active' ? 'bg-green-100 text-green-800' :
                              business.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {business.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
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
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-sm font-medium">{business.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">({business.reviewCount} reviews)</span>
                              </div>
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
        )}

        {/* Edit User Modal */}
        {modalType === 'edit' && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Edit User</h2>
                  <button
                    onClick={() => { setModalType(null); setSelectedUser(null); }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={(e) => { e.preventDefault(); handleSaveUser(); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <select
                        value={editForm.district || ''}
                        onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {districts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Active User</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isVerified || false}
                        onChange={(e) => setEditForm({...editForm, isVerified: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Verified User</span>
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => { setModalType(null); setSelectedUser(null); }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );

  function handleSuspend(userId: number) {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  }

  function handleSaveUser() {
    if (selectedUser && editForm) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...editForm } : user
      ));
      setModalType(null);
      setSelectedUser(null);
    }
  }
}