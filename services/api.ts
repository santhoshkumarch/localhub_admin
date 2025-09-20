const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://localhub-backend-production.up.railway.app/api'
  : 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
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
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUsers() {
    return this.request('/users');
  }

  async updateUser(id: number, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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