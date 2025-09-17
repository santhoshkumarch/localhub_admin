import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useQuery, gql } from '@apollo/client';

const USERS_QUERY = gql`
  query Users($page: Int, $perPage: Int, $search: String) {
    users(filter: { search: $search }, paging: { page: $page, perPage: $perPage }) {
      pageInfo { page perPage total totalPages }
      items {
        id
        email
        name
        phone
        isActive
        createdAt
      }
    }
  }
`;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(25);
  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(USERS_QUERY, {
    variables: { page, perPage, search },
    fetchPolicy: 'network-only'
  });

  const items = data?.users?.items ?? [];
  const pageInfo = data?.users?.pageInfo ?? { page: 1, perPage, total: 0, totalPages: 0 };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex items-center space-x-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search email or name" className="border rounded px-3 py-1" />
            <button onClick={() => { setPage(1); }} className="bg-indigo-600 text-white px-3 py-1 rounded">Search</button>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium">Email</th>
                <th className="p-3 text-left text-sm font-medium">Name</th>
                <th className="p-3 text-left text-sm font-medium">Phone</th>
                <th className="p-3 text-left text-sm font-medium">Active</th>
                <th className="p-3 text-left text-sm font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="p-4 text-center">Loading…</td></tr>
              )}
              {error && (
                <tr><td colSpan={5} className="p-4 text-center text-red-600">Error loading users</td></tr>
              )}
              {!loading && items.length === 0 && (
                <tr><td colSpan={5} className="p-4 text-center text-gray-500">No users found</td></tr>
              )}
              {items.map((u: any) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3 text-sm">{u.email}</td>
                  <td className="p-3 text-sm">{u.name ?? '-'}</td>
                  <td className="p-3 text-sm">{u.phone ?? '-'}</td>
                  <td className="p-3 text-sm">{u.isActive ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-sm">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">Showing page {pageInfo.page} of {pageInfo.totalPages}</div>
          <div className="space-x-2">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded border">Prev</button>
            <button disabled={page >= pageInfo.totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border">Next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
