import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { getPosts } from '../../services/storageService';
import { PostCard } from '../../components/PostCard';

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Abstract Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 md:pt-48 md:pb-52 overflow-hidden">
         {/* Background Image with advanced overlay */}
         <div className="absolute inset-0 z-0 select-none">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              alt="Background Tech" 
              className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105 animate-scale-in transition-transform duration-[20s]"
            />
            {/* Gradient Mask to fade into background color */}
            <div className="absolute inset-0 bg-gradient-to-b from-light/80 via-light/90 to-light dark:from-dark/80 dark:via-dark/90 dark:to-dark" />
         </div>

         <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="animate-fade-in-up">
                {/* Floating Badge */}
                <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-widest mb-10 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-default animate-float">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Engineering Log & Updates
                </div>
                
                {/* Main Heading */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-sm">
                  Building the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x bg-[length:200%_auto]">
                    Future
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                  Explore the technical challenges, architectural decisions, and breakthroughs defining our journey.
                </p>

                {/* Scroll Indicator */}
                <div className="animate-bounce">
                    <svg className="w-6 h-6 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </div>
         </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 pb-24 -mt-24">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
             <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Latest Entries</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Updates from the team</p>
             </div>
             <span className="hidden md:block text-sm font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-400">
                {posts.length} Posts
             </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-32 bg-white/50 dark:bg-secondary/20 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 animate-fade-in-up">
            <div className="text-7xl mb-6 opacity-50">⚡</div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">No transmissions yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-6">The feed is currently silent.</p>
            <p className="text-sm text-slate-400">Log in as admin to initialize the first entry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <PostCard post={post} />
                </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};