export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

export function saveToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_data');
}

export function saveUser(user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user_data', JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
  