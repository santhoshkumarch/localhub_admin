const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? 'https://localhub_backend.railway.internal/api'
  : 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async login(email: string, password: string) {
    const crypto = require('crypto');
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: hashedPassword }),
    });
  }

  async getUsers() {
    return this.request('/users');
  }

  async getUser(id: number) {
    return this.request(`/users/${id}`);
  }

  async createUser(data: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: number, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleUserStatus(id: number) {
    return this.request(`/users/${id}/toggle-status`, {
      method: 'PATCH',
    });
  }

  async getBusinesses() {
    return this.request('/businesses');
  }

  async getPosts() {
    return this.request('/posts');
  }

  async updatePostStatus(id: number, status: string) {
    return this.request(`/posts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getHashtags() {
    return this.request('/hashtags');
  }

  async createHashtag(data: any) {
    return this.request('/hashtags', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteHashtag(id: number) {
    return this.request(`/hashtags/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();