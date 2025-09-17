import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Santhosh Kumar',
    email: 'santhosh.kumar@localhub.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    department: 'Administration',
    location: 'Chennai, Tamil Nadu',
    bio: 'Experienced administrator managing LocalHub platform operations across Tamil Nadu districts.',
    avatar: 'SK',
    joinedDate: '2023-10-15',
    lastLogin: '2024-01-20 10:30 AM',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
                {profile.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-blue-100">{profile.role}</p>
                <p className="text-blue-200 text-sm">{profile.department}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditing ? "M5 13l4 4L19 7" : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"} />
                    </svg>
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <p className="text-gray-900 font-medium">{profile.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <p className="text-gray-900 font-medium">{profile.department}</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{profile.bio}</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
                  <p className="text-gray-900 font-medium">{profile.joinedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                  <p className="text-gray-900 font-medium">{profile.lastLogin}</p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}