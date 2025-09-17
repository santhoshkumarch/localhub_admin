import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Menu {
  id: number;
  name: string;
  description: string;
  hashtags: string[];
  postCount: number;
  isActive: boolean;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  district: string;
  hashtags: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: 'Food & Restaurants', description: 'All food-related businesses and posts', hashtags: ['food', 'restaurant', 'catering'], postCount: 45, isActive: true, createdAt: '2024-01-15' },
    { id: 2, name: 'Shopping & Retail', description: 'Shopping centers, stores, and retail businesses', hashtags: ['shopping', 'retail', 'store'], postCount: 32, isActive: true, createdAt: '2024-01-14' },
    { id: 3, name: 'Services', description: 'Professional and personal services', hashtags: ['service', 'repair', 'maintenance'], postCount: 28, isActive: true, createdAt: '2024-01-13' },
    { id: 4, name: 'Healthcare', description: 'Medical and healthcare services', hashtags: ['health', 'medical', 'clinic'], postCount: 19, isActive: false, createdAt: '2024-01-12' },
  ]);

  const [posts] = useState<Post[]>([
    { id: 1, title: 'New South Indian Restaurant Opens', content: 'Authentic Tamil cuisine now available...', author: 'Muthu Restaurant', district: 'Chennai', hashtags: ['food', 'restaurant'], likes: 23, comments: 5, createdAt: '2024-01-16' },
    { id: 2, title: 'Fresh Vegetables Available', content: 'Farm fresh vegetables delivered daily...', author: 'Green Mart', district: 'Coimbatore', hashtags: ['food', 'shopping'], likes: 18, comments: 3, createdAt: '2024-01-15' },
    { id: 3, title: 'Mobile Repair Service', content: 'Quick and reliable mobile repair...', author: 'Tech Solutions', district: 'Madurai', hashtags: ['service', 'repair'], likes: 12, comments: 2, createdAt: '2024-01-14' },
    { id: 4, title: 'New Textile Store Launch', content: 'Premium quality fabrics and clothing...', author: 'Priya Textiles', district: 'Salem', hashtags: ['shopping', 'retail'], likes: 31, comments: 8, createdAt: '2024-01-13' },
    { id: 5, title: 'Catering Services Available', content: 'Professional catering for all events...', author: 'Royal Caterers', district: 'Tiruchirappalli', hashtags: ['food', 'catering'], likes: 27, comments: 6, createdAt: '2024-01-12' },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [newMenu, setNewMenu] = useState({ name: '', description: '', hashtags: [] as string[] });
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const availableHashtags = ['food', 'restaurant', 'shopping', 'retail', 'service', 'repair', 'health', 'medical', 'catering', 'store', 'maintenance', 'clinic'];

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenu.name.trim() || newMenu.hashtags.length === 0) return;

    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const menu: Menu = {
      id: Date.now(),
      name: newMenu.name,
      description: newMenu.description,
      hashtags: newMenu.hashtags,
      postCount: posts.filter(post => post.hashtags.some(tag => newMenu.hashtags.includes(tag))).length,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setMenus([menu, ...menus]);
    setNewMenu({ name: '', description: '', hashtags: [] });
    setShowCreateForm(false);
    setIsCreating(false);
  };

  const getMenuPosts = (menu: Menu) => {
    return posts.filter(post => post.hashtags.some(tag => menu.hashtags.includes(tag)));
  };

  const toggleHashtag = (hashtag: string) => {
    setNewMenu(prev => ({
      ...prev,
      hashtags: prev.hashtags.includes(hashtag)
        ? prev.hashtags.filter(h => h !== hashtag)
        : [...prev.hashtags, hashtag]
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
              <p className="text-gray-600">Create and manage content menus by grouping hashtags</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Menu</span>
            </button>
          </div>
        </div>

        {/* Create Menu Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Menu</h2>
            <form onSubmit={handleCreateMenu} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
                  <input
                    type="text"
                    value={newMenu.name}
                    onChange={(e) => setNewMenu({...newMenu, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Food & Restaurants"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newMenu.description}
                    onChange={(e) => setNewMenu({...newMenu, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the menu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Hashtags</label>
                <div className="flex flex-wrap gap-2">
                  {availableHashtags.map((hashtag) => (
                    <button
                      key={hashtag}
                      type="button"
                      onClick={() => toggleHashtag(hashtag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                        newMenu.hashtags.includes(hashtag)
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      #{hashtag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create Menu'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menus List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Menus ({menus.length})</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() => setSelectedMenu(menu)}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{menu.name}</h3>
                      <p className="text-sm text-gray-600">{menu.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{menu.postCount} posts</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        menu.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {menu.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {menu.hashtags.map((hashtag) => (
                      <span key={hashtag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Posts Modal */}
        {selectedMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMenu.name}</h2>
                    <p className="text-blue-100">{selectedMenu.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMenu(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Posts in this menu ({getMenuPosts(selectedMenu).length})</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMenu.hashtags.map((hashtag) => (
                      <span key={hashtag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {getMenuPosts(selectedMenu).map((post) => (
                    <div key={post.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{post.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                        </div>
                        <span className="text-xs text-gray-500">{post.createdAt}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span>By {post.author}</span>
                          <span>• {post.district}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.hashtags.map((hashtag) => (
                          <span key={hashtag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}