import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="text-xl font-semibold">LocalHub Admin</Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="block p-2 rounded hover:bg-gray-50">Dashboard</Link></li>
            <li><Link href="/users" className="block p-2 rounded hover:bg-gray-50">Users</Link></li>
            <li><Link href="/media" className="block p-2 rounded hover:bg-gray-50">Media</Link></li>
            <li><Link href="/transactions" className="block p-2 rounded hover:bg-gray-50">Transactions</Link></li>
            <li><Link href="/settings" className="block p-2 rounded hover:bg-gray-50">Settings</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
