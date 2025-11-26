import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="group h-full block">
      <article className="h-full flex flex-col bg-white dark:bg-secondary/50 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-black/60 hover:-translate-y-1 transition-all duration-300 relative">
        {/* Image Container */}
        <div className="aspect-[16/9] overflow-hidden relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
          
          {/* Tag Overlay */}
          <div className="absolute top-4 left-4">
             <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                {post.tags[0] || 'Update'}
             </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10">
          <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-400">
             <span>{post.date}</span>
             <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
             <span>{post.author}</span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-primary font-bold text-sm mt-auto">
             <span className="group-hover:mr-2 transition-all duration-300">Read Article</span>
             <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </article>
    </Link>
  );
};