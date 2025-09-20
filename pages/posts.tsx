import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorType: 'business' | 'individual';
  district: string;
  category: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  status: 'published' | 'pending' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  viewDuration?: number; // in days
  expiresAt?: string;
  viewLimit?: number;
  currentViews?: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'New South Indian Restaurant Opens in Chennai', content: 'Authentic Tamil cuisine now available at our new location in T. Nagar. Special opening offers for the first 100 customers!', author: 'Muthu Restaurant', authorType: 'business', district: 'Chennai', category: 'Restaurant', hashtags: ['food', 'restaurant', 'tamil', 'chennai'], likes: 45, comments: 12, shares: 8, status: 'published', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: 2, title: 'Fresh Vegetables Available Daily', content: 'Farm fresh vegetables delivered daily to your doorstep. Organic produce from local farmers. Call now for home delivery!', author: 'Green Mart', authorType: 'business', district: 'Coimbatore', category: 'Grocery', hashtags: ['vegetables', 'organic', 'delivery', 'coimbatore'], likes: 32, comments: 7, shares: 15, status: 'published', createdAt: '2024-01-19', updatedAt: '2024-01-19' },
    { id: 3, title: 'Mobile Repair Service - Quick & Reliable', content: 'Professional mobile repair services for all brands. Screen replacement, battery change, software issues - we fix it all!', author: 'Tech Solutions', authorType: 'business', district: 'Madurai', category: 'Electronics', hashtags: ['mobile', 'repair', 'service', 'madurai'], likes: 28, comments: 5, shares: 6, status: 'published', createdAt: '2024-01-18', updatedAt: '2024-01-18' },
    { id: 4, title: 'Premium Silk Sarees Collection', content: 'New collection of Kanchipuram silk sarees arrived! Traditional designs with modern patterns. Visit our showroom for exclusive offers.', author: 'Priya Textiles', authorType: 'business', district: 'Salem', category: 'Textiles', hashtags: ['sarees', 'silk', 'traditional', 'salem'], likes: 67, comments: 18, shares: 23, status: 'published', createdAt: '2024-01-17', updatedAt: '2024-01-17' },
    { id: 5, title: 'Professional Catering Services', content: 'Royal Caterers provides professional catering for weddings, corporate events, and parties. Authentic South Indian cuisine with modern presentation.', author: 'Royal Caterers', authorType: 'business', district: 'Tiruchirappalli', category: 'Restaurant', hashtags: ['catering', 'wedding', 'events', 'tiruchirappalli'], likes: 41, comments: 9, shares: 12, status: 'published', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
    { id: 6, title: 'Electronics Sale - Up to 50% Off', content: 'Mega electronics sale at Kumar Electronics! Smartphones, laptops, home appliances - everything at discounted prices. Limited time offer!', author: 'Kumar Electronics', authorType: 'business', district: 'Vellore', category: 'Electronics', hashtags: ['electronics', 'sale', 'discount', 'vellore'], likes: 89, comments: 25, shares: 34, status: 'published', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: 7, title: 'Auto Repair Workshop - Expert Service', content: 'Complete automobile repair and maintenance services. Experienced mechanics, genuine spare parts, and affordable pricing. Your car deserves the best!', author: 'Ravi Auto Works', authorType: 'business', district: 'Erode', category: 'Auto Repair', hashtags: ['auto', 'repair', 'car', 'erode'], likes: 23, comments: 4, shares: 7, status: 'published', createdAt: '2024-01-14', updatedAt: '2024-01-14' },
    { id: 8, title: 'Designer Fashion Collection Launch', content: 'Meera Fashion Boutique presents the latest designer collection for the wedding season. Exclusive designs for modern women. Book your appointment now!', author: 'Meera Fashion Boutique', authorType: 'business', district: 'Thanjavur', category: 'Fashion', hashtags: ['fashion', 'designer', 'wedding', 'thanjavur'], likes: 56, comments: 14, shares: 19, status: 'pending', createdAt: '2024-01-13', updatedAt: '2024-01-13' },
    { id: 9, title: 'Home Appliances at Best Prices', content: 'Suresh Electronics offers the best deals on home appliances. Refrigerators, washing machines, air conditioners - all with warranty and free installation.', author: 'Suresh Electronics', authorType: 'business', district: 'Dindigul', category: 'Electronics', hashtags: ['appliances', 'home', 'warranty', 'dindigul'], likes: 34, comments: 8, shares: 11, status: 'published', createdAt: '2024-01-12', updatedAt: '2024-01-12' },
    { id: 10, title: 'Beauty Treatments & Bridal Makeup', content: 'Professional beauty treatments and bridal makeup services at Divya Beauty Parlour. Experienced beauticians and premium products for your special day.', author: 'Divya Beauty Parlour', authorType: 'business', district: 'Cuddalore', category: 'Beauty & Wellness', hashtags: ['beauty', 'bridal', 'makeup', 'cuddalore'], likes: 78, comments: 22, shares: 16, status: 'published', createdAt: '2024-01-11', updatedAt: '2024-01-11' },
    { id: 11, title: 'Looking for Good Restaurant Recommendations', content: 'Hi everyone! I am new to Chennai and looking for good South Indian restaurants. Any recommendations for authentic food? Please share your favorites!', author: 'Arun Kumar', authorType: 'individual', district: 'Chennai', category: 'Food & Dining', hashtags: ['food', 'restaurant', 'recommendations', 'chennai'], likes: 15, comments: 28, shares: 3, status: 'published', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: 12, title: 'Traditional Sweets for Festival Season', content: 'Siva Sweets brings you the finest traditional sweets for the festival season. Made with pure ghee and premium ingredients. Order online for home delivery!', author: 'Siva Sweets', authorType: 'business', district: 'Coimbatore', category: 'Restaurant', hashtags: ['sweets', 'festival', 'traditional', 'coimbatore'], likes: 92, comments: 31, shares: 27, status: 'published', createdAt: '2024-01-09', updatedAt: '2024-01-09' },
    { id: 13, title: 'Mobile Accessories & Repair Center', content: 'Karthik Mobile Center - your one-stop shop for mobile phones, accessories, and repair services. Latest models available with best prices and warranty.', author: 'Karthik Mobile Center', authorType: 'business', district: 'Madurai', category: 'Electronics', hashtags: ['mobile', 'accessories', 'repair', 'madurai'], likes: 19, comments: 6, shares: 4, status: 'published', createdAt: '2024-01-08', updatedAt: '2024-01-08' },
    { id: 14, title: 'Wholesale Textile Business Opportunity', content: 'Vasantha Textiles offers wholesale rates for bulk buyers. Quality fabrics, competitive prices, and reliable service. Contact us for business partnerships.', author: 'Vasantha Textiles', authorType: 'business', district: 'Salem', category: 'Textiles', hashtags: ['textiles', 'wholesale', 'business', 'salem'], likes: 27, comments: 9, shares: 8, status: 'published', createdAt: '2024-01-07', updatedAt: '2024-01-07' },
    { id: 15, title: 'Construction Materials & Hardware Supplies', content: 'Ganesan Hardware - complete solution for all your construction needs. Quality materials, competitive prices, and timely delivery guaranteed.', author: 'Ganesan Hardware', authorType: 'business', district: 'Tiruchirappalli', category: 'Hardware', hashtags: ['construction', 'hardware', 'materials', 'tiruchirappalli'], likes: 12, comments: 3, shares: 5, status: 'published', createdAt: '2024-01-06', updatedAt: '2024-01-06' },
    { id: 16, title: 'Fresh Bakery Items Daily', content: 'Prema Bakery serves fresh bakery items daily. Cakes, pastries, bread, and snacks made with finest ingredients. Special orders for birthdays and celebrations!', author: 'Prema Bakery', authorType: 'business', district: 'Vellore', category: 'Restaurant', hashtags: ['bakery', 'cakes', 'fresh', 'vellore'], likes: 48, comments: 11, shares: 13, status: 'published', createdAt: '2024-01-05', updatedAt: '2024-01-05' },
    { id: 17, title: 'Need Recommendations for Electronics Store', content: 'Planning to buy a new laptop for my studies. Can anyone recommend good electronics stores in Erode with reasonable prices and good service?', author: 'Priya Sharma', authorType: 'individual', district: 'Erode', category: 'Electronics', hashtags: ['laptop', 'electronics', 'recommendations', 'erode'], likes: 8, comments: 15, shares: 2, status: 'published', createdAt: '2024-01-04', updatedAt: '2024-01-04' },
    { id: 18, title: 'Gold & Silver Jewellery Collection', content: 'Kamala Jewellery presents exquisite collection of gold and silver jewellery with traditional South Indian designs. Visit our showroom for exclusive pieces.', author: 'Kamala Jewellery', authorType: 'business', district: 'Thanjavur', category: 'Jewellery', hashtags: ['jewellery', 'gold', 'silver', 'thanjavur'], likes: 73, comments: 19, shares: 21, status: 'published', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
    { id: 19, title: 'Daily Provisions & Household Items', content: 'Murugan Provision Store - your neighborhood store for daily provisions and household items. Quality products at affordable prices with home delivery service.', author: 'Murugan Provision Store', authorType: 'business', district: 'Dindigul', category: 'Grocery', hashtags: ['provisions', 'household', 'delivery', 'dindigul'], likes: 21, comments: 5, shares: 7, status: 'published', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
    { id: 20, title: 'Healthcare Services & Family Medicine', content: 'Radha Clinic provides comprehensive healthcare services and family medicine. Experienced doctors, modern facilities, and affordable treatment for all.', author: 'Dr. Radha Krishnan', authorType: 'business', district: 'Cuddalore', category: 'Healthcare', hashtags: ['healthcare', 'medicine', 'clinic', 'cuddalore'], likes: 65, comments: 16, shares: 14, status: 'published', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationPost, setDurationPost] = useState<Post | null>(null);
  const [viewDuration, setViewDuration] = useState(30);
  const [showViewLimitModal, setShowViewLimitModal] = useState(false);
  const [viewLimitPost, setViewLimitPost] = useState<Post | null>(null);
  const [viewLimit, setViewLimit] = useState(100);

  const categories = ['Restaurant', 'Electronics', 'Textiles', 'Grocery', 'Auto Repair', 'Fashion', 'Beauty & Wellness', 'Healthcare', 'Hardware', 'Jewellery', 'Food & Dining'];
  const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul', 'Cuddalore'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesDistrict = filterDistrict === 'all' || post.district === filterDistrict;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDistrict;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    pending: posts.filter(p => p.status === 'pending').length,
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
  };

  const handleStatusChange = (postId: number, newStatus: 'published' | 'pending' | 'rejected') => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, status: newStatus } : post
    ));
  };

  const handleSetDuration = (post: Post) => {
    setDurationPost(post);
    setViewDuration(post.viewDuration || 30);
    setShowDurationModal(true);
  };

  const handleSaveDuration = () => {
    if (durationPost) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + viewDuration);
      
      setPosts(posts.map(post =>
        post.id === durationPost.id 
          ? { ...post, viewDuration, expiresAt: expiresAt.toISOString().split('T')[0] }
          : post
      ));
    }
    setShowDurationModal(false);
    setDurationPost(null);
  };

  const handleSetViewLimit = (post: Post) => {
    setViewLimitPost(post);
    setViewLimit(post.viewLimit || 100);
    setShowViewLimitModal(true);
  };

  const handleSaveViewLimit = () => {
    if (viewLimitPost) {
      setPosts(posts.map(post =>
        post.id === viewLimitPost.id 
          ? { ...post, viewLimit, currentViews: post.currentViews || 0 }
          : post
      ));
    }
    setShowViewLimitModal(false);
    setViewLimitPost(null);
  };

  const getDaysRemaining = (expiresAt?: string) => {
    if (!expiresAt) return null;
    const today = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts Management</h1>
          <p className="text-gray-600">Monitor and manage user posts across the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#fef2f2'}}>
                <svg className="w-6 h-6" style={{color: '#e5080c'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Posts</p>
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
                <p className="text-sm text-gray-500">Published Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.published}</p>
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
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Likes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalLikes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
              <input
                type="text"
                placeholder="Search posts..."
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
                <option value="published">Published</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Labels</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.authorType === 'business' ? 'text-white' : 'bg-purple-100 text-purple-800'
                    }`} style={post.authorType === 'business' ? {backgroundColor: '#e5080c'} : {}}>
                      {post.authorType}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>By {post.author}</span>
                    <span>• {post.district}</span>
                    <span>• {post.category}</span>
                    <span>• {post.createdAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.hashtags.map((hashtag) => (
                      <span key={hashtag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{post.comments} comments</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-white px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-90"
                    style={{backgroundColor: '#e5080c'}}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleSetDuration(post)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Set Duration
                  </button>
                  <button
                    onClick={() => handleSetViewLimit(post)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Set View Limit
                  </button>
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(post.id, e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                  </select>
                  {post.expiresAt && (
                    <div className="text-xs text-gray-500">
                      {getDaysRemaining(post.expiresAt) !== null && (
                        <span className={getDaysRemaining(post.expiresAt)! <= 3 ? 'text-red-600' : 'text-gray-600'}>
                          {getDaysRemaining(post.expiresAt)! > 0 
                            ? `${getDaysRemaining(post.expiresAt)} days left`
                            : 'Expired'
                          }
                        </span>
                      )}
                    </div>
                  )}
                  {post.viewLimit && (
                    <div className="text-xs text-gray-500">
                      <span className={(post.currentViews || 0) >= post.viewLimit ? 'text-red-600' : 'text-gray-600'}>
                        {post.currentViews || 0}/{post.viewLimit} views
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Duration Setting Modal */}
        {showDurationModal && durationPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="text-white p-6 rounded-t-2xl" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
                <h2 className="text-xl font-bold">Set Post Duration</h2>
                <p className="text-red-100 text-sm">{durationPost.title}</p>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View Duration (Days)
                  </label>
                  <select
                    value={viewDuration}
                    onChange={(e) => setViewDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{'--tw-ring-color': '#e5080c'} as any}
                  >
                    <option value={7}>7 days</option>
                    <option value={15}>15 days</option>
                    <option value={30}>30 days (1 month)</option>
                    <option value={60}>60 days (2 months)</option>
                    <option value={90}>90 days (3 months)</option>
                    <option value={180}>180 days (6 months)</option>
                    <option value={365}>365 days (1 year)</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  Post will be automatically unpublished after {viewDuration} days from today.
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveDuration}
                    className="flex-1 text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                    style={{backgroundColor: '#e5080c'}}
                  >
                    Set Duration
                  </button>
                  <button
                    onClick={() => setShowDurationModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Limit Setting Modal */}
        {showViewLimitModal && viewLimitPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="text-white p-6 rounded-t-2xl" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
                <h2 className="text-xl font-bold">Set View Limit</h2>
                <p className="text-red-100 text-sm">{viewLimitPost.title}</p>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Views
                  </label>
                  <select
                    value={viewLimit}
                    onChange={(e) => setViewLimit(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{'--tw-ring-color': '#e5080c'} as any}
                  >
                    <option value={50}>50 views</option>
                    <option value={100}>100 views</option>
                    <option value={250}>250 views</option>
                    <option value={500}>500 views</option>
                    <option value={1000}>1,000 views</option>
                    <option value={2500}>2,500 views</option>
                    <option value={5000}>5,000 views</option>
                    <option value={10000}>10,000 views</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  Post will be automatically unpublished after reaching {viewLimit.toLocaleString()} views.
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveViewLimit}
                    className="flex-1 text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                    style={{backgroundColor: '#e5080c'}}
                  >
                    Set View Limit
                  </button>
                  <button
                    onClick={() => setShowViewLimitModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="text-white p-6 rounded-t-2xl" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
                    <p className="text-red-100">By {selectedPost.author} • {selectedPost.district}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg p-4 text-center" style={{backgroundColor: '#fef2f2'}}>
                    <div className="text-2xl font-bold" style={{color: '#e5080c'}}>{selectedPost.likes}</div>
                    <div className="text-sm" style={{color: '#c0392b'}}>Likes</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedPost.comments}</div>
                    <div className="text-sm text-purple-800">Comments</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedPost.shares}</div>
                    <div className="text-sm text-green-800">Shares</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Post Content</h3>
                  <p className="text-gray-700 mb-4">{selectedPost.content}</p>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Author:</span> <span className="font-medium">{selectedPost.author}</span></div>
                    <div><span className="text-gray-600">Type:</span> <span className="font-medium">{selectedPost.authorType}</span></div>
                    <div><span className="text-gray-600">Category:</span> <span className="font-medium">{selectedPost.category}</span></div>
                    <div><span className="text-gray-600">District:</span> <span className="font-medium">{selectedPost.district}</span></div>
                    <div><span className="text-gray-600">Status:</span> <span className="font-medium">{selectedPost.status}</span></div>
                    <div><span className="text-gray-600">Created:</span> <span className="font-medium">{selectedPost.createdAt}</span></div>
                    {selectedPost.viewDuration && (
                      <div><span className="text-gray-600">Duration:</span> <span className="font-medium">{selectedPost.viewDuration} days</span></div>
                    )}
                    {selectedPost.expiresAt && (
                      <div><span className="text-gray-600">Expires:</span> <span className="font-medium">{selectedPost.expiresAt}</span></div>
                    )}
                    {selectedPost.viewLimit && (
                      <div><span className="text-gray-600">View Limit:</span> <span className="font-medium">{selectedPost.viewLimit.toLocaleString()} views</span></div>
                    )}
                    {selectedPost.currentViews !== undefined && (
                      <div><span className="text-gray-600">Current Views:</span> <span className="font-medium">{selectedPost.currentViews.toLocaleString()}</span></div>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600">Hashtags:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPost.hashtags.map((hashtag) => (
                        <span key={hashtag} className="px-2 py-1 text-white text-xs rounded-full" style={{backgroundColor: '#e5080c'}}>
                          #{hashtag}
                        </span>
                      ))}
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