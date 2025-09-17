import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Business {
  id: number;
  name: string;
  category: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  district: string;
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
  const [businesses, setBusinesses] = useState<Business[]>([
    { id: 1, name: 'Kumar Electronics', category: 'Electronics', owner: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'kumar.electronics@gmail.com', address: 'T. Nagar, Chennai', district: 'Chennai', description: 'Complete electronics store with latest gadgets and appliances', rating: 4.5, reviewCount: 23, status: 'active', isVerified: true, registeredDate: '2024-01-15', lastUpdated: '2024-01-20', website: 'www.kumarelectronics.com' },
    { id: 2, name: 'Priya Textiles', category: 'Textiles', owner: 'Priya Selvam', phone: '+91 87654 32109', email: 'priya.textiles@yahoo.com', address: 'RS Puram, Coimbatore', district: 'Coimbatore', description: 'Premium quality fabrics and traditional wear', rating: 4.7, reviewCount: 35, status: 'active', isVerified: true, registeredDate: '2024-01-12', lastUpdated: '2024-01-18', socialMedia: { facebook: 'priyatextiles', instagram: 'priya_textiles' } },
    { id: 3, name: 'Muthu Restaurant', category: 'Restaurant', owner: 'Muthu Raman', phone: '+91 76543 21098', email: 'muthu.restaurant@gmail.com', address: 'Meenakshi Amman Temple St, Madurai', district: 'Madurai', description: 'Authentic South Indian cuisine and traditional recipes', rating: 4.3, reviewCount: 67, status: 'active', isVerified: false, registeredDate: '2024-01-10', lastUpdated: '2024-01-16' },
    { id: 4, name: 'Anitha Saree Center', category: 'Textiles', owner: 'Anitha Devi', phone: '+91 65432 10987', email: 'anitha.sarees@hotmail.com', address: 'Main Bazaar, Salem', district: 'Salem', description: 'Exclusive collection of silk sarees and ethnic wear', rating: 3.8, reviewCount: 12, status: 'suspended', isVerified: true, registeredDate: '2024-01-08', lastUpdated: '2024-01-14' },
    { id: 5, name: 'Tech Solutions', category: 'IT Services', owner: 'Kumar Krishnan', phone: '+91 54321 09876', email: 'tech.solutions@gmail.com', address: 'Anna Salai, Tiruchirappalli', district: 'Tiruchirappalli', description: 'Computer repair and IT support services', rating: 4.1, reviewCount: 8, status: 'pending', isVerified: false, registeredDate: '2024-01-05', lastUpdated: '2024-01-12' },
    { id: 6, name: 'Lakshmi General Store', category: 'Grocery', owner: 'Lakshmi Narayanan', phone: '+91 43210 98765', email: 'lakshmi.store@gmail.com', address: 'Gandhi Road, Vellore', district: 'Vellore', description: 'Daily essentials and grocery items', rating: 4.1, reviewCount: 28, status: 'active', isVerified: true, registeredDate: '2024-01-03', lastUpdated: '2024-01-19' },
    { id: 7, name: 'Ravi Auto Works', category: 'Auto Repair', owner: 'Ravi Chandran', phone: '+91 32109 87654', email: 'ravi.auto@yahoo.com', address: 'Perundurai Road, Erode', district: 'Erode', description: 'Complete automobile repair and maintenance services', rating: 4.4, reviewCount: 19, status: 'active', isVerified: true, registeredDate: '2023-12-28', lastUpdated: '2024-01-17' },
    { id: 8, name: 'Meera Fashion Boutique', category: 'Fashion', owner: 'Meera Balan', phone: '+91 21098 76543', email: 'meera.fashion@gmail.com', address: 'Big Temple Street, Thanjavur', district: 'Thanjavur', description: 'Designer clothing and fashion accessories', rating: 4.6, reviewCount: 41, status: 'pending', isVerified: false, registeredDate: '2023-12-25', lastUpdated: '2024-01-15' },
    { id: 9, name: 'Suresh Electronics', category: 'Electronics', owner: 'Suresh Babu', phone: '+91 10987 65432', email: 'suresh.electronics@hotmail.com', address: 'Palani Road, Dindigul', district: 'Dindigul', description: 'Home appliances and electronic gadgets', rating: 3.9, reviewCount: 15, status: 'active', isVerified: true, registeredDate: '2023-12-20', lastUpdated: '2024-01-13' },
    { id: 10, name: 'Divya Beauty Parlour', category: 'Beauty & Wellness', owner: 'Divya Priya', phone: '+91 09876 54321', email: 'divya.beauty@gmail.com', address: 'Old Town, Cuddalore', district: 'Cuddalore', description: 'Professional beauty and wellness services', rating: 4.8, reviewCount: 52, status: 'active', isVerified: true, registeredDate: '2023-12-18', lastUpdated: '2024-01-16' },
    { id: 11, name: 'Arjun Pharmacy', category: 'Healthcare', owner: 'Arjun Krishnan', phone: '+91 98123 45678', email: 'arjun.pharmacy@gmail.com', address: 'Hospital Road, Chennai', district: 'Chennai', description: 'Complete medical store with prescription medicines', rating: 4.2, reviewCount: 34, status: 'active', isVerified: true, registeredDate: '2023-12-15', lastUpdated: '2024-01-14' },
    { id: 12, name: 'Siva Sweets', category: 'Restaurant', owner: 'Sivakumar', phone: '+91 87123 45679', email: 'siva.sweets@yahoo.com', address: 'Gandhi Market, Coimbatore', district: 'Coimbatore', description: 'Traditional sweets and South Indian snacks', rating: 4.5, reviewCount: 89, status: 'active', isVerified: true, registeredDate: '2023-12-12', lastUpdated: '2024-01-18' },
    { id: 13, name: 'Karthik Mobile Center', category: 'Electronics', owner: 'Karthik Raja', phone: '+91 76123 45680', email: 'karthik.mobile@gmail.com', address: 'Anna Nagar, Madurai', district: 'Madurai', description: 'Mobile phones, accessories and repair services', rating: 4.0, reviewCount: 27, status: 'pending', isVerified: false, registeredDate: '2023-12-10', lastUpdated: '2024-01-12' },
    { id: 14, name: 'Vasantha Textiles', category: 'Textiles', owner: 'Vasantha Kumari', phone: '+91 65123 45681', email: 'vasantha.textiles@hotmail.com', address: 'Textile Market, Salem', district: 'Salem', description: 'Wholesale and retail textile business', rating: 4.3, reviewCount: 18, status: 'active', isVerified: true, registeredDate: '2023-12-08', lastUpdated: '2024-01-11' },
    { id: 15, name: 'Ganesan Hardware', category: 'Hardware', owner: 'Ganesan Murugan', phone: '+91 54123 45682', email: 'ganesan.hardware@gmail.com', address: 'Main Road, Tiruchirappalli', district: 'Tiruchirappalli', description: 'Construction materials and hardware supplies', rating: 3.7, reviewCount: 22, status: 'active', isVerified: false, registeredDate: '2023-12-05', lastUpdated: '2024-01-10' },
    { id: 16, name: 'Prema Bakery', category: 'Restaurant', owner: 'Prema Devi', phone: '+91 43123 45683', email: 'prema.bakery@yahoo.com', address: 'Fort Road, Vellore', district: 'Vellore', description: 'Fresh bakery items and birthday cakes', rating: 4.4, reviewCount: 63, status: 'active', isVerified: true, registeredDate: '2023-12-03', lastUpdated: '2024-01-09' },
    { id: 17, name: 'Senthil Cycle Shop', category: 'Auto Repair', owner: 'Senthil Kumar', phone: '+91 32123 45684', email: 'senthil.cycles@gmail.com', address: 'Bus Stand Road, Erode', district: 'Erode', description: 'Bicycle sales and repair services', rating: 4.1, reviewCount: 16, status: 'suspended', isVerified: true, registeredDate: '2023-12-01', lastUpdated: '2024-01-08' },
    { id: 18, name: 'Kamala Jewellery', category: 'Jewellery', owner: 'Kamala Devi', phone: '+91 21123 45685', email: 'kamala.jewellery@hotmail.com', address: 'South Main Street, Thanjavur', district: 'Thanjavur', description: 'Gold and silver jewellery with traditional designs', rating: 4.7, reviewCount: 45, status: 'active', isVerified: true, registeredDate: '2023-11-28', lastUpdated: '2024-01-07' },
    { id: 19, name: 'Murugan Provision Store', category: 'Grocery', owner: 'Murugan Selvam', phone: '+91 10123 45686', email: 'murugan.provision@gmail.com', address: 'Market Street, Dindigul', district: 'Dindigul', description: 'Daily provisions and household items', rating: 3.8, reviewCount: 31, status: 'active', isVerified: false, registeredDate: '2023-11-25', lastUpdated: '2024-01-06' },
    { id: 20, name: 'Radha Clinic', category: 'Healthcare', owner: 'Dr. Radha Krishnan', phone: '+91 09123 45687', email: 'radha.clinic@yahoo.com', address: 'Hospital Street, Cuddalore', district: 'Cuddalore', description: 'General medicine and family healthcare', rating: 4.6, reviewCount: 78, status: 'active', isVerified: true, registeredDate: '2023-11-22', lastUpdated: '2024-01-05' },
    { id: 21, name: 'Bala Furniture', category: 'Furniture', owner: 'Balamurugan', phone: '+91 98234 56789', email: 'bala.furniture@gmail.com', address: 'Furniture Street, Chennai', district: 'Chennai', description: 'Custom furniture and home decor items', rating: 4.2, reviewCount: 29, status: 'pending', isVerified: false, registeredDate: '2023-11-20', lastUpdated: '2024-01-04' },
    { id: 22, name: 'Selvi Tailoring', category: 'Fashion', owner: 'Selvi Raman', phone: '+91 87234 56790', email: 'selvi.tailoring@hotmail.com', address: 'Women Street, Coimbatore', district: 'Coimbatore', description: 'Ladies tailoring and alteration services', rating: 4.3, reviewCount: 37, status: 'active', isVerified: true, registeredDate: '2023-11-18', lastUpdated: '2024-01-03' },
    { id: 23, name: 'Vinod Stationery', category: 'Stationery', owner: 'Vinod Kumar', phone: '+91 76234 56791', email: 'vinod.stationery@gmail.com', address: 'School Street, Madurai', district: 'Madurai', description: 'Books, stationery and office supplies', rating: 3.9, reviewCount: 24, status: 'active', isVerified: false, registeredDate: '2023-11-15', lastUpdated: '2024-01-02' },
    { id: 24, name: 'Deepa Flower Shop', category: 'Flowers', owner: 'Deepa Lakshmi', phone: '+91 65234 56792', email: 'deepa.flowers@yahoo.com', address: 'Temple Street, Salem', district: 'Salem', description: 'Fresh flowers for all occasions and events', rating: 4.5, reviewCount: 42, status: 'active', isVerified: true, registeredDate: '2023-11-12', lastUpdated: '2024-01-01' },
    { id: 25, name: 'Raman Photo Studio', category: 'Photography', owner: 'Raman Pillai', phone: '+91 54234 56793', email: 'raman.photo@gmail.com', address: 'Market Road, Tiruchirappalli', district: 'Tiruchirappalli', description: 'Professional photography and video services', rating: 4.4, reviewCount: 33, status: 'active', isVerified: true, registeredDate: '2023-11-10', lastUpdated: '2023-12-30' },
    { id: 26, name: 'Indira Catering', category: 'Restaurant', owner: 'Indira Devi', phone: '+91 43234 56794', email: 'indira.catering@hotmail.com', address: 'Gandhi Road, Vellore', district: 'Vellore', description: 'Professional catering services for all events', rating: 4.6, reviewCount: 56, status: 'suspended', isVerified: true, registeredDate: '2023-11-08', lastUpdated: '2023-12-28' },
    { id: 27, name: 'Gopal Book Store', category: 'Stationery', owner: 'Gopal Krishnan', phone: '+91 32234 56795', email: 'gopal.books@gmail.com', address: 'College Road, Erode', district: 'Erode', description: 'Educational books and competitive exam materials', rating: 4.1, reviewCount: 19, status: 'active', isVerified: false, registeredDate: '2023-11-05', lastUpdated: '2023-12-26' },
    { id: 28, name: 'Shanti Dental Clinic', category: 'Healthcare', owner: 'Dr. Shanti Priya', phone: '+91 21234 56796', email: 'shanti.dental@yahoo.com', address: 'Medical Street, Thanjavur', district: 'Thanjavur', description: 'Complete dental care and oral health services', rating: 4.8, reviewCount: 67, status: 'active', isVerified: true, registeredDate: '2023-11-03', lastUpdated: '2023-12-24' },
    { id: 29, name: 'Krishnan Spices', category: 'Grocery', owner: 'Krishnan Raju', phone: '+91 10234 56797', email: 'krishnan.spices@gmail.com', address: 'Spice Market, Dindigul', district: 'Dindigul', description: 'Wholesale spices and traditional masala powders', rating: 4.3, reviewCount: 38, status: 'pending', isVerified: false, registeredDate: '2023-11-01', lastUpdated: '2023-12-22' },
    { id: 30, name: 'Malathi Beauty Salon', category: 'Beauty & Wellness', owner: 'Malathi Sundaram', phone: '+91 09234 56798', email: 'malathi.salon@hotmail.com', address: 'Women Complex, Cuddalore', district: 'Cuddalore', description: 'Complete beauty treatments and bridal makeup', rating: 4.7, reviewCount: 49, status: 'active', isVerified: true, registeredDate: '2023-10-28', lastUpdated: '2023-12-20' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const categories = ['Electronics', 'Textiles', 'Restaurant', 'IT Services', 'Grocery', 'Auto Repair', 'Beauty & Wellness', 'Fashion', 'Healthcare', 'Hardware', 'Jewellery', 'Furniture', 'Stationery', 'Flowers', 'Photography'];
  const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore', 'Erode', 'Thanjavur'];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || business.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus;
    const matchesDistrict = filterDistrict === 'all' || business.district === filterDistrict;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDistrict;
  });

  const stats = {
    total: businesses.length,
    active: businesses.filter(b => b.status === 'active').length,
    pending: businesses.filter(b => b.status === 'pending').length,
    verified: businesses.filter(b => b.isVerified).length,
  };

  const handleStatusChange = (businessId: number, newStatus: 'active' | 'pending' | 'suspended') => {
    setBusinesses(businesses.map(business =>
      business.id === businessId ? { ...business, status: newStatus } : business
    ));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Directory</h1>
          <p className="text-gray-600">Manage and monitor business listings across Tamil Nadu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
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
                  {business.address}, {business.district}
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
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBusiness.name}</h2>
                    <p className="text-blue-100">{selectedBusiness.category} • {selectedBusiness.district}</p>
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
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedBusiness.rating}</div>
                    <div className="text-sm text-blue-800">Rating</div>
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
                      <div><span className="text-gray-600">Website:</span> <span className="font-medium text-blue-600">{selectedBusiness.website}</span></div>
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