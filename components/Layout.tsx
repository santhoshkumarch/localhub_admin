import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 fixed w-full top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Left side - Brand & Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 lg:hidden transform active:scale-95"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LocalHub
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide">ADMIN PANEL</p>
              </div>
            </div>
          </div>

          {/* Right side - User Profile */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">SK</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Santhosh Kumar</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile Settings
                </Link>
                <Link href="/account-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account Settings
                </Link>
                <hr className="my-1" />
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:static lg:translate-x-0 ${isSidebarOpen ? 'w-64' : 'lg:w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-500 ease-in-out z-30 shadow-lg lg:shadow-none`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LocalHub</span>
                  <p className="text-xs text-gray-500 font-medium">ADMIN PANEL</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Collapse Button */}
          <div className="hidden lg:flex justify-end p-4 border-b border-gray-200">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <svg className={`w-5 h-5 text-gray-600 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/dashboard') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/users" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/users') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Users</span>
                </Link>
              </li>
              <li>
                <Link href="/businesses" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/businesses') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Business Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/posts" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/posts') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Posts</span>
                </Link>
              </li>
              <li>
                <Link href="/districts" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/districts') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Districts</span>
                </Link>
              </li>
              <li>
                <Link href="/hashtags" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/hashtags') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Hashtags</span>
                </Link>
              </li>
              <li>
                <Link href="/menus" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/menus') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Menus</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${isActive('/settings') ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 lg:hidden'}`}>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 transition-all duration-500 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}