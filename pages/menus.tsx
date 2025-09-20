import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Menu {
  id: number;
  name: string;
  description: string;
  icon: string;
  labels: string[];
  timeFilter: 'all' | '1month' | '3months' | '6months';
  postCount: number;
  isActive: boolean;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  assignedLabel?: string;
  menuId?: number;
  likes: number;
  comments: number;
  createdAt: string;
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: 'Jobs', description: 'Job opportunities and career posts', icon: '💼', labels: ['Career', 'Vacancy', 'Full-time Job', 'Part-time Job', 'Internship'], timeFilter: '3months', postCount: 15, isActive: true, createdAt: '2024-01-15' },
    { id: 2, name: 'Offers', description: 'Deals and promotional offers', icon: '🏷️', labels: ['Discounts', 'Coupons', 'Sale', 'Special Offer'], timeFilter: '1month', postCount: 12, isActive: true, createdAt: '2024-01-14' },
    { id: 3, name: 'Events', description: 'Community and business events', icon: '🎉', labels: ['Workshop', 'Seminar', 'Conference', 'Networking'], timeFilter: '6months', postCount: 18, isActive: true, createdAt: '2024-01-13' },
    { id: 4, name: 'Services', description: 'Professional services', icon: '🔧', labels: ['Repair', 'Maintenance', 'Consultation'], timeFilter: 'all', postCount: 8, isActive: false, createdAt: '2024-01-12' },
  ]);

  const [posts] = useState<Post[]>([
    { id: 1, title: 'We are hiring Full-time Sales Executive', content: 'Looking for experienced sales professional for full-time position...', author: 'Tech Corp', assignedLabel: 'Full-time Job', menuId: 1, likes: 23, comments: 5, createdAt: '2024-01-16' },
    { id: 2, title: 'Part-time Delivery Boy needed', content: 'Join our delivery team for part-time work...', author: 'Digital Agency', assignedLabel: 'Part-time Job', menuId: 1, likes: 18, comments: 3, createdAt: '2024-01-15' },
    { id: 3, title: 'Summer Internship opportunity', content: 'Internship program for students...', author: 'StartupHub', assignedLabel: 'Internship', menuId: 1, likes: 12, comments: 2, createdAt: '2024-01-14' },
    { id: 4, title: '50% Off Electronics Sale', content: 'Huge discount on all electronics...', author: 'ElectroMart', assignedLabel: 'Discounts', menuId: 2, likes: 31, comments: 8, createdAt: '2024-01-13' },
    { id: 5, title: 'Mobile Repair Service', content: 'Quick mobile repair services...', author: 'Tech Solutions', assignedLabel: 'Repair', menuId: 4, likes: 27, comments: 6, createdAt: '2024-01-12' },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [newMenu, setNewMenu] = useState({ name: '', description: '', icon: '', labels: [] as string[], timeFilter: '3months' as const });
  const [newLabel, setNewLabel] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const predefinedLabels = ['Career', 'Vacancy', 'Full-time Job', 'Part-time Job', 'Internship', 'Discounts', 'Coupons', 'Sale', 'Special Offer', 'Workshop', 'Seminar', 'Conference', 'Networking', 'Repair', 'Maintenance', 'Consultation', 'Training', 'Support', 'Emergency'];

  const availableIcons = ['💼', '🍽️', '🛍️', '🔧', '🏥', '🎓', '🏠', '🚗', '💻', '📱', '🎨', '⚽', '🎵', '📚', '✈️', '🌟'];

  const timeFilterOptions = [
    { value: 'all', label: 'All Time' },
    { value: '1month', label: 'Last 1 Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' }
  ];

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenu.name.trim() || !newMenu.icon || newMenu.labels.length === 0) return;

    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const menu: Menu = {
      id: Date.now(),
      name: newMenu.name,
      description: newMenu.description,
      icon: newMenu.icon,
      labels: newMenu.labels,
      timeFilter: newMenu.timeFilter,
      postCount: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setMenus([menu, ...menus]);
    setNewMenu({ name: '', description: '', icon: '', labels: [], timeFilter: '3months' });
    setShowCreateForm(false);
    setIsCreating(false);
  };

  const getMenuPosts = (menu: Menu) => {
    let filtered = posts.filter(post => post.menuId === menu.id);
    
    if (menu.timeFilter !== 'all') {
      const now = new Date();
      const months = menu.timeFilter === '1month' ? 1 : menu.timeFilter === '3months' ? 3 : 6;
      const cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
      filtered = filtered.filter(post => new Date(post.createdAt) >= cutoffDate);
    }
    
    return filtered;
  };

  const addLabel = () => {
    if (newLabel.trim() && !newMenu.labels.includes(newLabel.trim())) {
      setNewMenu(prev => ({
        ...prev,
        labels: [...prev.labels, newLabel.trim()]
      }));
      setNewLabel('');
    }
  };

  const removeLabel = (label: string) => {
    setNewMenu(prev => ({
      ...prev,
      labels: prev.labels.filter(l => l !== label)
    }));
  };

  const togglePredefinedLabel = (label: string) => {
    setNewMenu(prev => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label]
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
              <p className="text-gray-600">Create custom menus with icons and filtering rules</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}
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
            <form onSubmit={handleCreateMenu} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
                  <input
                    type="text"
                    value={newMenu.name}
                    onChange={(e) => setNewMenu({...newMenu, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Jobs"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
                <div className="flex flex-wrap gap-2">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewMenu({...newMenu, icon})}
                      className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all duration-200 ${
                        newMenu.icon === icon
                          ? 'bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={newMenu.icon === icon ? {borderColor: '#e5080c'} : {}}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Filter Rule</label>
                <select
                  value={newMenu.timeFilter}
                  onChange={(e) => setNewMenu({...newMenu, timeFilter: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Labels</label>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Predefined Labels</h4>
                  <div className="flex flex-wrap gap-2">
                    {predefinedLabels.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => togglePredefinedLabel(label)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                          newMenu.labels.includes(label)
                            ? 'text-white border-red-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                        style={newMenu.labels.includes(label) ? {backgroundColor: '#e5080c'} : {}}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Add Custom Label</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLabel())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{'--tw-ring-color': '#e5080c'} as any}
                      placeholder="e.g., Remote Job"
                    />
                    <button
                      type="button"
                      onClick={addLabel}
                      className="text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{backgroundColor: '#e5080c'}}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Selected Labels</h4>
                  <div className="flex flex-wrap gap-2">
                    {newMenu.labels.map((label) => (
                      <span
                        key={label}
                        className="px-3 py-1 text-white text-sm rounded-full flex items-center space-x-2"
                        style={{backgroundColor: '#e5080c'}}
                      >
                        <span>{label}</span>
                        <button
                          type="button"
                          onClick={() => removeLabel(label)}
                          className="text-white hover:text-red-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isCreating || !newMenu.name || !newMenu.icon || newMenu.labels.length === 0}
                  className="text-white px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 hover:opacity-90"
                  style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{menu.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{menu.name}</h3>
                        <p className="text-gray-600 text-sm">{menu.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">{menu.postCount} posts</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {timeFilterOptions.find(opt => opt.value === menu.timeFilter)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        menu.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {menu.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {menu.labels.map((label) => (
                        <span key={label} className="px-2 py-1 text-white text-xs rounded-full" style={{backgroundColor: '#e5080c'}}>
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Detail Modal */}
        {selectedMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{selectedMenu.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMenu.name}</h2>
                      <p className="text-gray-600">{selectedMenu.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          Filter: {timeFilterOptions.find(opt => opt.value === selectedMenu.timeFilter)?.label}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          Labels: {selectedMenu.labels.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMenu(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Filtered Posts ({getMenuPosts(selectedMenu).length})
                </h3>
                
                {getMenuPosts(selectedMenu).length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">📝</div>
                    <p className="text-gray-500">No posts match the current filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getMenuPosts(selectedMenu).map((post) => (
                      <div key={post.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{post.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{post.content}</p>
                            <div className="flex items-center space-x-4 mt-3">
                              <span className="text-sm text-gray-500">By {post.author}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.createdAt}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.likes} likes</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.comments} comments</span>
                            </div>
                          </div>
                        </div>
                        {post.assignedLabel && (
                          <div className="mt-3">
                            <span className="px-2 py-1 text-white text-xs rounded-full" style={{backgroundColor: '#e5080c'}}>
                              {post.assignedLabel}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}