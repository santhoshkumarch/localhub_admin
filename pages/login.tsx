import React, { useState } from 'react';
import Router from 'next/router';
import { saveToken, saveUser } from '../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - accept any email/password
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 1,
      email: email,
      name: 'Santhosh Kumar',
      role: 'Superadmin'
    };
    
    const fakeToken = 'FAKE_JWT_TOKEN_FOR_LOCAL_DEV';
    saveToken(fakeToken);
    saveUser(mockUser);
    Router.push('/dashboard');
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Group</h1>
            <p className="text-gray-600">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                style={{'--tw-ring-color': '#e5080c'} as any}
                type="email" 
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                style={{'--tw-ring-color': '#e5080c'} as any}
                type="password" 
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full text-white py-3 px-4 rounded-lg font-medium focus:ring-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #e5080c 0%, #ff4757 100%)', '--tw-ring-color': '#fef2f2'} as any}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo mode: Use any email/password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}