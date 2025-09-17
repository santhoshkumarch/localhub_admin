import React from 'react';
import Layout from '../components/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total users</div>
            <div className="text-2xl font-semibold">—</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Active (7d)</div>
            <div className="text-2xl font-semibold">—</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Revenue (30d)</div>
            <div className="text-2xl font-semibold">—</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Pending transactions</div>
            <div className="text-2xl font-semibold">—</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Recent activity</h2>
          <div className="text-sm text-gray-500">Activity stream will appear here</div>
        </div>
      </div>
    </Layout>
  );
}
