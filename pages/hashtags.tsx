import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Label {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  usageCount: number;
}

export default function LabelsPage() {
  const [labels, setLabels] = useState<Label[]>([
    { id: 1, name: 'business', color: 'blue', createdAt: '2024-01-15', usageCount: 45 },
    { id: 2, name: 'food', color: 'green', createdAt: '2024-01-14', usageCount: 32 },
    { id: 3, name: 'shopping', color: 'purple', createdAt: '2024-01-13', usageCount: 28 },
  ]);
  
  const [newLabel, setNewLabel] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isCreating, setIsCreating] = useState(false);

  const colors = [
    { name: 'blue', class: 'bg-blue-100 text-blue-800 border-blue-200' },
    { name: 'green', class: 'bg-green-100 text-green-800 border-green-200' },
    { name: 'purple', class: 'bg-purple-100 text-purple-800 border-purple-200' },
    { name: 'red', class: 'bg-red-100 text-red-800 border-red-200' },
    { name: 'yellow', class: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { name: 'pink', class: 'bg-pink-100 text-pink-800 border-pink-200' },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTag: Label = {
      id: Date.now(),
      name: newLabel.toLowerCase().replace(/[^a-z0-9]/g, ''),
      color: selectedColor,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0,
    };

    setLabels([newTag, ...labels]);
    setNewLabel('');
    setIsCreating(false);
  };

  const handleDelete = (id: number) => {
    setLabels(labels.filter(tag => tag.id !== id));
  };

  const getColorClass = (color: string) => {
    return colors.find(c => c.name === color)?.class || colors[0].class;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Labels</h1>
          <p className="text-sm sm:text-base text-gray-600">Create and manage labels for posts and businesses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Create New Label</h2>
          
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label Name</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="business, food, shopping..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 transition-all duration-200 ${
                        selectedColor === color.name ? 'ring-2 ring-blue-500 scale-110' : ''
                      } ${color.class}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isCreating || !newLabel.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Create Label</span>
                    <span className="sm:hidden">Create</span>
                  </>
                )}
              </button>

              {newLabel && (
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-500">Preview:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClass(selectedColor)}`}>
                    {newLabel.toLowerCase().replace(/[^a-z0-9]/g, '')}
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Labels ({labels.length})</h2>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Sorted by newest</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {labels.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No labels yet</h3>
                <p className="text-gray-500">Create your first label to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {labels.map((label) => (
                  <div key={label.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClass(label.color)}`}>
                        {label.name}
                      </span>
                      <button
                        onClick={() => handleDelete(label.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Usage Count:</span>
                        <span className="font-medium">{label.usageCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Created:</span>
                        <span className="font-medium">{label.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}