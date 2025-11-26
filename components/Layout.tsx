import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useTheme } from '../ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-secondary/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md group-hover:shadow-primary/50 transition-all duration-300">
              DV
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
              Dev<span className="text-primary">Log</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

            <Link 
              to="/" 
              className={`hidden md:block text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/' && !isAdmin ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Feed
            </Link>
            
            {user?.isAuthenticated ? (
              <div className="flex items-center gap-2">
                 <Link 
                  to="/admin/dashboard" 
                  className={`hidden md:block text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${isAdmin ? 'text-primary bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Dashboard
                </Link>
                
                <div className="relative group">
                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </button>
                    {/* Dropdown for logout/mobile dash */}
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50 overflow-hidden">
                        <Link to="/admin/dashboard" className="block md:hidden px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Dashboard</Link>
                        <button 
                            onClick={() => {
                                onLogout();
                                navigate('/');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-sm"
                title="Admin Login"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20 py-8 bg-white dark:bg-secondary/30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} DevLog. Built with React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};