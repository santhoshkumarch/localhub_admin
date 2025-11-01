const API_BASE_URL = 'https://localhubbackend-production.up.railway.app/api';

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

  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getBusinesses() {
    return this.request('/businesses');
  }

  async getPosts(params?: { search?: string; status?: string; category?: string; authorType?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
    if (params?.authorType && params.authorType !== 'all') queryParams.append('authorType', params.authorType);
    
    const endpoint = queryParams.toString() ? `/posts/admin?${queryParams}` : '/posts/admin';
    return this.request(endpoint);
  }

  async updatePostStatus(id: number, status: string) {
    return this.request(`/posts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async setPostDuration(id: number, viewDuration: number) {
    return this.request(`/posts/${id}/duration`, {
      method: 'PATCH',
      body: JSON.stringify({ viewDuration }),
    });
  }

  async setPostViewLimit(id: number, viewLimit: number) {
    return this.request(`/posts/${id}/view-limit`, {
      method: 'PATCH',
      body: JSON.stringify({ viewLimit }),
    });
  }

  async assignPostLabel(id: number, menuId: number, assignedLabel: string) {
    return this.request(`/posts/${id}/label`, {
      method: 'PATCH',
      body: JSON.stringify({ menuId, assignedLabel }),
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

  async getMenus() {
    return this.request('/menus');
  }

  async getMenuPosts(id: number, timeFilter?: string) {
    const params = timeFilter ? `?timeFilter=${timeFilter}` : '';
    return this.request(`/menus/${id}/posts${params}`);
  }

  async createMenu(data: any) {
    return this.request('/menus', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMenu(id: number, data: any) {
    return this.request(`/menus/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMenu(id: number) {
    return this.request(`/menus/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllLabels() {
    return this.request('/menus/labels/all');
  }

  async getLabelPosts(menuId: number, labelName: string) {
    return this.request(`/menus/${menuId}/labels/${encodeURIComponent(labelName)}/posts`);
  }

  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(category: string, settings: any) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify({ category, settings }),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(data: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: any) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();