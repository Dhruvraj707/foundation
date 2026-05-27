import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('scf_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/auth/me')
      .then((response) => {
        if (response.data.success) {
          setUser(response.data);
        }
      })
      .catch(() => {
        localStorage.removeItem('scf_token');
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (payload) => {
    setError(null);
    try {
      const response = await api.post('/auth/register', payload);
      if (response.data.success) {
        localStorage.setItem('scf_token', response.data.token);
        setUser(response.data);
      }
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const login = async (payload) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', payload);
      if (response.data.success) {
        localStorage.setItem('scf_token', response.data.token);
        setUser(response.data);
      }
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('scf_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
