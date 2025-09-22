import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiService } from '../services/api';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    general: {
      siteName: '',
      contactEmail: '',
      siteDescription: '',
      supportPhone: '',
      timezone: 'Asia/Kolkata'
    },
    platform: {
      userRegistration: true,
      businessRegistration: true,
      postModeration: false,
      autoApproveBusinesses: false
    },
    notifications: {
      emailNotifications: true,
      newUserRegistration: true,
      newBusinessRegistration: true,
      reportedContent: true
    },
    security: {
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireEmailVerification: false
    },
    content: {
      maxPostLength: 500,
      maxImageSize: 5,
      allowImages: true
    }
  });
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSettings();
      setSettings(prev => ({
        general: { ...prev.general, ...data.general },
        platform: { ...prev.platform, ...data.platform },
        notifications: { ...prev.notifications, ...data.notifications },
        security: { ...prev.security, ...data.security },
        content: { ...prev.content, ...data.content }
      }));
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.updateSettings(activeTab, settings[activeTab] || {});
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'platform', name: 'Platform', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'content', name: 'Content', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your LocalHub Admin platform settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'text-white border-r-4'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={activeTab === tab.id ? {background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)', borderRightColor: '#c0392b'} : {}}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                      </svg>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: '#e5080c'}}></div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                          type="text"
                          value={settings.general.siteName}
                          onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input
                          type="email"
                          value={settings.general.contactEmail}
                          onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                      <textarea
                        value={settings.general.siteDescription}
                        onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{'--tw-ring-color': '#e5080c'} as any}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                        <input
                          type="text"
                          value={settings.general.supportPhone}
                          onChange={(e) => updateSetting('general', 'supportPhone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Platform Settings */}
              {activeTab === 'platform' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Settings</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">User Registration</h3>
                          <p className="text-sm text-gray-500">Allow new users to register on the platform</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.platform.userRegistration}
                            onChange={(e) => updateSetting('platform', 'userRegistration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.platform.userRegistration ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Business Registration</h3>
                          <p className="text-sm text-gray-500">Allow businesses to register and create listings</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.platform.businessRegistration}
                            onChange={(e) => updateSetting('platform', 'businessRegistration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.platform.businessRegistration ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Post Moderation</h3>
                          <p className="text-sm text-gray-500">Require admin approval for new posts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.platform.postModeration}
                            onChange={(e) => updateSetting('platform', 'postModeration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.platform.postModeration ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Auto-approve Businesses</h3>
                          <p className="text-sm text-gray-500">Automatically approve new business registrations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.platform.autoApproveBusinesses}
                            onChange={(e) => updateSetting('platform', 'autoApproveBusinesses', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.platform.autoApproveBusinesses ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Send notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.emailNotifications}
                            onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.notifications.emailNotifications ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">New User Registration</h3>
                          <p className="text-sm text-gray-500">Notify when new users register</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.newUserRegistration}
                            onChange={(e) => updateSetting('notifications', 'newUserRegistration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.notifications.newUserRegistration ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">New Business Registration</h3>
                          <p className="text-sm text-gray-500">Notify when businesses register</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.newBusinessRegistration}
                            onChange={(e) => updateSetting('notifications', 'newBusinessRegistration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.notifications.newBusinessRegistration ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Reported Content</h3>
                          <p className="text-sm text-gray-500">Notify when content is reported</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.reportedContent}
                            onChange={(e) => updateSetting('notifications', 'reportedContent', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.notifications.reportedContent ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                        <input
                          type="number"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Require Email Verification</h3>
                          <p className="text-sm text-gray-500">Users must verify email before accessing platform</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.requireEmailVerification}
                            onChange={(e) => updateSetting('security', 'requireEmailVerification', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.security.requireEmailVerification ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Settings */}
              {activeTab === 'content' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Post Length (characters)</label>
                        <input
                          type="number"
                          value={settings.content.maxPostLength}
                          onChange={(e) => updateSetting('content', 'maxPostLength', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label>
                        <input
                          type="number"
                          value={settings.content.maxImageSize}
                          onChange={(e) => updateSetting('content', 'maxImageSize', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{'--tw-ring-color': '#e5080c'} as any}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Allow Images</h3>
                          <p className="text-sm text-gray-500">Users can upload images in posts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.content.allowImages}
                            onChange={(e) => updateSetting('content', 'allowImages', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{'--tw-ring-color': '#fef2f2', backgroundColor: settings.content.allowImages ? '#e5080c' : ''} as any}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="border-t border-gray-200 px-6 py-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 hover:opacity-90"
                  style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Settings</span>
                    </>
                  )}
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}