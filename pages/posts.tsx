import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiService } from '../services/api';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorType: 'business' | 'individual';
  category: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  status: 'approved' | 'pending' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  viewDuration?: number; // in days
  expiresAt?: string;
  viewLimit?: number;
  currentViews?: number;
  assignedLabel?: string;
  menuId?: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, searchTerm ? 500 : 0); // Debounce search by 500ms
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus, filterCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPosts({
        search: searchTerm || undefined,
        status: filterStatus,
        category: filterCategory
      });
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationPost, setDurationPost] = useState<Post | null>(null);
  const [viewDuration, setViewDuration] = useState(30);
  const [showViewLimitModal, setShowViewLimitModal] = useState(false);
  const [viewLimitPost, setViewLimitPost] = useState<Post | null>(null);
  const [viewLimit, setViewLimit] = useState(100);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [labelPost, setLabelPost] = useState<Post | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  const categories = ['Jobs', 'Offers', 'Events', 'Services', 'Restaurant', 'Electronics', 'Textiles', 'Grocery', 'Auto Repair', 'Fashion', 'Beauty & Wellness', 'Healthcare', 'Hardware', 'Jewellery', 'Food & Dining'];
  
  const menus = [
    { id: 1, name: 'Jobs', labels: ['Career', 'Vacancy', 'Full-time Job', 'Part-time Job', 'Internship'] },
    { id: 2, name: 'Offers', labels: ['Discounts', 'Coupons', 'Sale', 'Special Offer'] },
    { id: 3, name: 'Events', labels: ['Workshop', 'Seminar', 'Conference', 'Networking'] },
    { id: 4, name: 'Services', labels: ['Repair', 'Maintenance', 'Consultation'] }
  ];


  // Since filtering is now done on the backend, we just use the posts directly
  const filteredPosts = posts;

  const stats = {
    total: posts.length,
    approved: posts.filter(p => p.status === 'approved').length,
    pending: posts.filter(p => p.status === 'pending').length,
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
  };

  const canApprove = (post: Post) => {
    return post.viewDuration && post.viewLimit && post.assignedLabel;
  };

  const handleStatusChange = async (postId: number, newStatus: 'approved' | 'pending' | 'rejected') => {
    const post = posts.find(p => p.id === postId);
    if (newStatus === 'approved' && post && !canApprove(post)) {
      alert('Please set duration, view limit, and assign a label before approving the post.');
      return;
    }
    
    try {
      await apiService.updatePostStatus(postId, newStatus);
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, status: newStatus } : post
      ));
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const handleSetDuration = (post: Post) => {
    setDurationPost(post);
    setViewDuration(post.viewDuration || 30);
    setShowDurationModal(true);
  };

  const handleSaveDuration = async () => {
    if (durationPost) {
      try {
        await apiService.setPostDuration(durationPost.id, viewDuration);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + viewDuration);
        
        setPosts(posts.map(post =>
          post.id === durationPost.id 
            ? { ...post, viewDuration, expiresAt: expiresAt.toISOString().split('T')[0] }
            : post
        ));
      } catch (error) {
        console.error('Error setting post duration:', error);
      }
    }
    setShowDurationModal(false);
    setDurationPost(null);
  };

  const handleSetViewLimit = (post: Post) => {
    setViewLimitPost(post);
    setViewLimit(post.viewLimit || 100);
    setShowViewLimitModal(true);
  };

  const handleSaveViewLimit = async () => {
    if (viewLimitPost) {
      try {
        await apiService.setPostViewLimit(viewLimitPost.id, viewLimit);
        setPosts(posts.map(post =>
          post.id === viewLimitPost.id 
            ? { ...post, viewLimit, currentViews: post.currentViews || 0 }
            : post
        ));
      } catch (error) {
        console.error('Error setting post view limit:', error);
      }
    }
    setShowViewLimitModal(false);
    setViewLimitPost(null);
  };

  const handleAssignLabel = (post: Post) => {
    setLabelPost(post);
    setSelectedMenu(post.menuId || null);
    setSelectedLabel(post.assignedLabel || '');
    setShowLabelModal(true);
  };

  const handleSaveLabel = async () => {
    if (labelPost && selectedMenu && selectedLabel) {
      try {
        await apiService.assignPostLabel(labelPost.id, selectedMenu, selectedLabel);
        setPosts(posts.map(post =>
          post.id === labelPost.id 
            ? { ...post, menuId: selectedMenu, assignedLabel: selectedLabel }
            : post
        ));
      } catch (error) {
        console.error('Error assigning post label:', error);
      }
    }
    setShowLabelModal(false);
    setLabelPost(null);
    setSelectedMenu(null);
    setSelectedLabel('');
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
                <p className="text-sm text-gray-500">Approved Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="approved">Approved</option>
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
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: '#e5080c'}}></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'approved' ? 'bg-green-100 text-green-800' :
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
                    <span>• {post.category}</span>
                    <span>• {post.createdAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(post.hashtags || []).map((hashtag) => (
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
                <div className="flex flex-col space-y-2" style={{width: '180px'}}>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                    style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)', width: '180px'}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => handleSetDuration(post)}
                    className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                    style={{width: '180px'}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Set Duration</span>
                  </button>
                  <button
                    onClick={() => handleSetViewLimit(post)}
                    className="flex items-center justify-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg transform hover:-translate-y-0.5"
                    style={{width: '180px'}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Set View Limit</span>
                  </button>
                  <button
                    onClick={() => handleAssignLabel(post)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                    style={{width: '180px'}}
                  >
                    Assign Label
                  </button>
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(post.id, e.target.value as any)}
                    className="px-3 py-2.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                    style={{'--tw-ring-color': '#e5080c', width: '160px'} as any}
                  >
                    <option 
                      value="approved" 
                      disabled={!canApprove(post)}
                      style={{color: canApprove(post) ? 'inherit' : '#ccc'}}
                    >
                      {canApprove(post) ? '✅ Approve' : '🔒 Approve'}
                    </option>
                    <option value="pending">⏳ Pending</option>
                    <option value="rejected">❌ Reject</option>
                    <option value="expired">⏰ Expired</option>
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
                  {/* Settings Status Indicators */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${post.viewDuration ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className={post.viewDuration ? 'text-green-600' : 'text-red-600'}>
                        Duration {post.viewDuration ? `(${post.viewDuration}d)` : '(Not set)'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${post.viewLimit ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className={post.viewLimit ? 'text-green-600' : 'text-red-600'}>
                        Limit {post.viewLimit ? `(${post.viewLimit})` : '(Not set)'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${post.assignedLabel ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className={post.assignedLabel ? 'text-green-600' : 'text-red-600'}>
                        Label {post.assignedLabel ? `(${post.assignedLabel})` : '(Not set)'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Approval Status */}
                  {post.status === 'pending' && (
                    <div className="mt-2 p-2 rounded-lg text-xs" style={{backgroundColor: canApprove(post) ? '#f0f9ff' : '#fef2f2'}}>
                      <div className={`font-medium ${canApprove(post) ? 'text-blue-800' : 'text-red-800'}`}>
                        {canApprove(post) ? '✓ Ready to approve' : '⚠ Missing settings'}
                      </div>
                      {!canApprove(post) && (
                        <div className="text-red-600 mt-1">
                          Set all three settings above to enable approval
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

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

        {/* Label Assignment Modal */}
        {showLabelModal && labelPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="text-white p-6 rounded-t-2xl" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
                <h2 className="text-xl font-bold">Assign Label</h2>
                <p className="text-red-100 text-sm">{labelPost.title}</p>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Menu
                  </label>
                  <select
                    value={selectedMenu || ''}
                    onChange={(e) => {
                      setSelectedMenu(parseInt(e.target.value));
                      setSelectedLabel('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{'--tw-ring-color': '#e5080c'} as any}
                  >
                    <option value="">Select a menu...</option>
                    {menus.map((menu) => (
                      <option key={menu.id} value={menu.id}>{menu.name}</option>
                    ))}
                  </select>
                </div>
                
                {selectedMenu && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Label
                    </label>
                    <select
                      value={selectedLabel}
                      onChange={(e) => setSelectedLabel(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{'--tw-ring-color': '#e5080c'} as any}
                    >
                      <option value="">Select a label...</option>
                      {menus.find(m => m.id === selectedMenu)?.labels.map((label) => (
                        <option key={label} value={label}>{label}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveLabel}
                    disabled={!selectedMenu || !selectedLabel}
                    className="flex-1 text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{backgroundColor: '#e5080c'}}
                  >
                    Assign Label
                  </button>
                  <button
                    onClick={() => setShowLabelModal(false)}
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
                    <p className="text-red-100">By {selectedPost.author}</p>
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
                    {selectedPost.assignedLabel && (
                      <div><span className="text-gray-600">Assigned Label:</span> <span className="font-medium">{selectedPost.assignedLabel}</span></div>
                    )}
                    {selectedPost.menuId && (
                      <div><span className="text-gray-600">Menu:</span> <span className="font-medium">{menus.find(m => m.id === selectedPost.menuId)?.name}</span></div>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600">Hashtags:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(selectedPost.hashtags || []).map((hashtag) => (
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