import React, { useState } from 'react';
import Layout from '../components/Layout';

interface District {
  id: number;
  name: string;
  code: string;
  headquarters: string;
  population: string;
  area: string;
  businessCount: number;
  userCount: number;
  isActive: boolean;
}

export default function DistrictsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [districts] = useState<District[]>([
    { id: 1, name: 'Chennai', code: 'CHN', headquarters: 'Chennai', population: '7.09M', area: '426 km²', businessCount: 1250, userCount: 45000, isActive: true },
    { id: 2, name: 'Coimbatore', code: 'CBE', headquarters: 'Coimbatore', population: '3.46M', area: '7469 km²', businessCount: 890, userCount: 32000, isActive: true },
    { id: 3, name: 'Madurai', code: 'MDU', headquarters: 'Madurai', population: '3.04M', area: '3741 km²', businessCount: 650, userCount: 28000, isActive: true },
    { id: 4, name: 'Tiruchirappalli', code: 'TRY', headquarters: 'Tiruchirappalli', population: '2.72M', area: '4404 km²', businessCount: 420, userCount: 18500, isActive: true },
    { id: 5, name: 'Salem', code: 'SLM', headquarters: 'Salem', population: '3.48M', area: '5245 km²', businessCount: 380, userCount: 16200, isActive: true },
    { id: 6, name: 'Tirunelveli', code: 'TVL', headquarters: 'Tirunelveli', population: '3.08M', area: '6823 km²', businessCount: 290, userCount: 12800, isActive: true },
    { id: 7, name: 'Vellore', code: 'VLR', headquarters: 'Vellore', population: '3.93M', area: '6077 km²', businessCount: 340, userCount: 14500, isActive: true },
    { id: 8, name: 'Erode', code: 'ERD', headquarters: 'Erode', population: '2.25M', area: '5692 km²', businessCount: 310, userCount: 13200, isActive: true },
    { id: 9, name: 'Thanjavur', code: 'TJV', headquarters: 'Thanjavur', population: '2.41M', area: '3396 km²', businessCount: 280, userCount: 11800, isActive: true },
    { id: 10, name: 'Dindigul', code: 'DGL', headquarters: 'Dindigul', population: '2.16M', area: '6266 km²', businessCount: 220, userCount: 9500, isActive: true },
    { id: 11, name: 'Cuddalore', code: 'CDL', headquarters: 'Cuddalore', population: '2.61M', area: '3678 km²', businessCount: 180, userCount: 8200, isActive: true },
    { id: 12, name: 'Kanchipuram', code: 'KCH', headquarters: 'Kanchipuram', population: '3.99M', area: '4432 km²', businessCount: 450, userCount: 19800, isActive: true },
    { id: 13, name: 'Villupuram', code: 'VPM', headquarters: 'Villupuram', population: '3.46M', area: '7194 km²', businessCount: 160, userCount: 7800, isActive: true },
    { id: 14, name: 'Sivaganga', code: 'SVG', headquarters: 'Sivaganga', population: '1.34M', area: '4189 km²', businessCount: 120, userCount: 5400, isActive: true },
    { id: 15, name: 'Karur', code: 'KRR', headquarters: 'Karur', population: '1.06M', area: '2895 km²', businessCount: 140, userCount: 6200, isActive: true },
    { id: 16, name: 'Ramanathapuram', code: 'RMD', headquarters: 'Ramanathapuram', population: '1.35M', area: '4123 km²', businessCount: 95, userCount: 4800, isActive: true },
    { id: 17, name: 'Virudhunagar', code: 'VDN', headquarters: 'Virudhunagar', population: '1.94M', area: '4234 km²', businessCount: 170, userCount: 7600, isActive: true },
    { id: 18, name: 'Theni', code: 'TNI', headquarters: 'Theni', population: '1.25M', area: '2889 km²', businessCount: 110, userCount: 5200, isActive: true },
    { id: 19, name: 'Namakkal', code: 'NMK', headquarters: 'Namakkal', population: '1.73M', area: '3368 km²', businessCount: 130, userCount: 6800, isActive: true },
    { id: 20, name: 'Dharmapuri', code: 'DHP', headquarters: 'Dharmapuri', population: '1.51M', area: '4497 km²', businessCount: 85, userCount: 4200, isActive: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredDistricts = districts
    .filter(district => 
      district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'businessCount') return b.businessCount - a.businessCount;
      if (sortBy === 'userCount') return b.userCount - a.userCount;
      return a.name.localeCompare(b.name);
    });

  const totalStats = districts.reduce((acc, district) => ({
    businesses: acc.businesses + district.businessCount,
    users: acc.users + district.userCount,
  }), { businesses: 0, users: 0 });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tamil Nadu Districts</h1>
          <p className="text-gray-600">Manage districts and view regional statistics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Districts</p>
                <p className="text-2xl font-semibold text-gray-900">{districts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Businesses</p>
                <p className="text-2xl font-semibold text-gray-900">{totalStats.businesses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{totalStats.users}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Districts</p>
                <p className="text-2xl font-semibold text-gray-900">{districts.filter(d => d.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="businessCount">Sort by Businesses</option>
                <option value="userCount">Sort by Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Districts ({filteredDistricts.length})</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDistricts.map((district) => (
                <div 
                  key={district.id} 
                  onClick={() => setSelectedDistrict(district)}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-200 border border-gray-200 cursor-pointer hover:shadow-md transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{district.name}</h3>
                      <p className="text-sm text-gray-500">Code: {district.code}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${district.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {district.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Headquarters:</span>
                      <span className="font-medium">{district.headquarters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-medium">{district.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{district.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Businesses:</span>
                      <span className="font-medium text-blue-600">{district.businessCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Users:</span>
                      <span className="font-medium text-purple-600">{district.userCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District Detail Modal */}
        {selectedDistrict && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedDistrict.name} District</h2>
                    <p className="text-blue-100">Code: {selectedDistrict.code} | HQ: {selectedDistrict.headquarters}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedDistrict.businessCount}</div>
                    <div className="text-sm text-blue-800">Businesses</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedDistrict.userCount}</div>
                    <div className="text-sm text-purple-800">Users</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedDistrict.population}</div>
                    <div className="text-sm text-green-800">Population</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedDistrict.area}</div>
                    <div className="text-sm text-orange-800">Area</div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">District Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">District Name:</span>
                        <span className="font-medium">{selectedDistrict.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">District Code:</span>
                        <span className="font-medium">{selectedDistrict.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Headquarters:</span>
                        <span className="font-medium">{selectedDistrict.headquarters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedDistrict.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedDistrict.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Analytics</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Businesses:</span>
                        <span className="font-medium text-blue-600">{selectedDistrict.businessCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Density:</span>
                        <span className="font-medium">{(selectedDistrict.businessCount / parseInt(selectedDistrict.area)).toFixed(2)} per km²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">User to Business Ratio:</span>
                        <span className="font-medium">{Math.round(selectedDistrict.userCount / selectedDistrict.businessCount)}:1</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>View Businesses</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>View Users</span>
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Analytics</span>
                      </button>
                    </div>
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