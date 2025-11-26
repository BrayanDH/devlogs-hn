import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { getPosts, deletePost } from '../../services/storageService';

export const DashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setPosts(getPosts());
  }, [refresh]);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post?')) {
      deletePost(id);
      setRefresh(p => p + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Content Manager</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your vlog entries and updates</p>
        </div>
        <Link 
          to="/admin/new" 
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Entry
        </Link>
      </div>

      <div className="bg-white dark:bg-secondary/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-5">Title</th>
              <th className="p-5 hidden md:table-cell">Date</th>
              <th className="p-5 hidden md:table-cell">Author</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-5">
                  <div className="font-semibold text-slate-900 dark:text-slate-200 text-lg mb-1">{post.title}</div>
                  <div className="text-xs text-slate-500 md:hidden">{post.date} &bull; {post.author}</div>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map(t => <span key={t} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">{t}</span>)}
                  </div>
                </td>
                <td className="p-5 text-slate-600 dark:text-slate-400 hidden md:table-cell font-mono text-sm">{post.date}</td>
                <td className="p-5 text-slate-600 dark:text-slate-400 hidden md:table-cell">{post.author}</td>
                <td className="p-5 text-right space-x-2">
                  <Link to={`/admin/edit/${post.id}`} className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/40 text-sm font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-12 text-center text-slate-500">
                        No posts found. Create your first entry!
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};