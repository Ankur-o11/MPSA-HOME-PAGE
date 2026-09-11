import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('mpsa_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('mpsa_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Synchronize Auth State
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('mpsa_admin_token', adminToken);
    } else {
      localStorage.removeItem('mpsa_admin_token');
    }
  }, [adminToken]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('mpsa_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('mpsa_admin_user');
    }
  }, [adminUser]);

  // Admin Login Handler
  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        // Generic security error message
        throw new Error(data.message || 'Invalid username or password.');
      }

      setAdminToken(data.token);
      setAdminUser(data.admin);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid username or password.');
      return { success: false, message: err.message };
    }
  };

  // Admin Logout Handler
  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('mpsa_admin_token');
    localStorage.removeItem('mpsa_admin_user');
  };

  // Helper for Authenticated Admin API Requests
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${adminToken}`
    };

    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      logout();
      throw new Error('401 Unauthorized: Session expired. Please log in again.');
    }

    return res;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        adminToken, 
        adminUser, 
        isAuthenticated: Boolean(adminToken), 
        loading, 
        error, 
        setError,
        login, 
        logout, 
        authFetch 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
