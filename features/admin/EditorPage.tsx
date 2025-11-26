import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { getPostById, savePost } from '../../services/storageService';
import { generateEventSummary } from '../../services/geminiService';

export const EditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://picsum.photos/800/400',
    author: 'Admin',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (id) {
      const post = getPostById(id);
      if (post) setFormData(post);
    } else {
      setFormData(prev => ({ ...prev, id: Date.now().toString() }));
    }
  }, [id]);

  const handleAiGenerate = async () => {
    if (!formData.title) return alert("Please enter a title first.");
    setAiLoading(true);
    try {
      const context = formData.content || "A generic tech event update";
      const result = await generateEventSummary(formData.title, context);
      
      setFormData(prev => ({
        ...prev,
        excerpt: result.excerpt,
        content: result.content
      }));
    } catch (e) {
      alert("Failed to generate content. Check console/API key.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      savePost(formData);
      setLoading(false);
      navigate('/admin/dashboard');
    }, 500);
  };

  const addTag = () => {
      if(tagInput && !formData.tags.includes(tagInput)) {
          setFormData(prev => ({...prev, tags: [...prev.tags, tagInput]}));
          setTagInput('');
      }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{id ? 'Edit Entry' : 'New Entry'}</h1>
          <button 
                type="button" 
                onClick={handleAiGenerate}
                disabled={aiLoading}
                className={`hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/25 items-center gap-2 ${aiLoading ? 'opacity-75 cursor-wait' : ''}`}
            >
                {aiLoading ? (
                    <span className="flex items-center gap-2">Generating...</span>
                ) : (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    AI Draft
                    </>
                )}
            </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Title</label>
                <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-colors"
                placeholder="Event Title"
                />
            </div>
             <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                <input 
                type="date" 
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-colors"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
            <div className="flex gap-2">
                <input 
                type="url" 
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="flex-1 bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-colors"
                />
                <button type="button" onClick={() => setFormData({...formData, imageUrl: `https://picsum.photos/800/400?random=${Date.now()}`})} className="bg-slate-200 dark:bg-slate-700 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-sm font-medium transition-colors">Random</button>
            </div>
            {formData.imageUrl && (
                <div className="mt-4 rounded-lg overflow-hidden h-40 w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}
        </div>

        {/* Mobile AI Button */}
        <button 
            type="button" 
            onClick={handleAiGenerate}
            disabled={aiLoading}
            className="md:hidden w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-bold"
        >
            {aiLoading ? 'Generating...' : '✨ Auto-Generate with AI'}
        </button>

        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Excerpt (Summary)</label>
            <textarea 
                rows={3}
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-colors"
                placeholder="A short summary for the card view..."
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Content (Markdown supported)</label>
            <textarea 
                rows={12}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none font-mono text-sm leading-relaxed"
                placeholder="# Event Details..."
            />
        </div>

        <div className="bg-slate-50 dark:bg-secondary/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tags</label>
             <div className="flex gap-2 mb-3 flex-wrap min-h-[30px]">
                 {formData.tags.length === 0 && <span className="text-xs text-slate-400 italic py-1">No tags added yet.</span>}
                 {formData.tags.map(t => (
                     <span key={t} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-slate-700 dark:text-slate-200">
                         {t} 
                         <button type="button" className="text-slate-400 hover:text-red-500" onClick={() => setFormData(p => ({...p, tags: p.tags.filter(tag => tag !== t)}))}>&times;</button>
                     </span>
                 ))}
             </div>
             <div className="flex gap-2">
                <input 
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-white dark:bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="Type a tag and press Enter"
                />
                <button type="button" onClick={addTag} className="text-sm bg-slate-200 dark:bg-slate-700 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 font-medium text-slate-700 dark:text-white transition-colors">Add</button>
             </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-200 dark:border-slate-800">
            <Link to="/admin/dashboard" className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Cancel</Link>
            <button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
            >
                {loading ? 'Saving...' : 'Publish Entry'}
            </button>
        </div>
      </form>
    </div>
  );
};