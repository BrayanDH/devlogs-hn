import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { User } from './types';
import { ThemeProvider } from './ThemeContext';

// Feature Imports
import { HomePage } from './features/home/HomePage';
import { PostDetail } from './features/post/PostDetail';
import { LoginPage } from './features/auth/LoginPage';
import { DashboardPage } from './features/admin/DashboardPage';
import { EditorPage } from './features/admin/EditorPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('devlog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = () => {
    const newUser = { username: 'admin', isAuthenticated: true };
    setUser(newUser);
    sessionStorage.setItem('devlog_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('devlog_user');
  };

  return (
    <ThemeProvider>
        <HashRouter>
        <Layout user={user} onLogout={logout}>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route 
                path="/admin/login" 
                element={user ? <Navigate to="/admin/dashboard" /> : <LoginPage onLogin={login} />} 
            />
            <Route 
                path="/admin/dashboard" 
                element={user ? <DashboardPage /> : <Navigate to="/admin/login" />} 
            />
            <Route 
                path="/admin/new" 
                element={user ? <EditorPage /> : <Navigate to="/admin/login" />} 
            />
            <Route 
                path="/admin/edit/:id" 
                element={user ? <EditorPage /> : <Navigate to="/admin/login" />} 
            />
            </Routes>
        </Layout>
        </HashRouter>
    </ThemeProvider>
  );
};

export default App;