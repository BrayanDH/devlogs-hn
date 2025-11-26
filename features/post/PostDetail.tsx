import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '../../types';
import { getPostById, getAdjacentPosts } from '../../services/storageService';

export const PostDetail: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [adjacent, setAdjacent] = useState<{ prev: BlogPost | null; next: BlogPost | null }>({ prev: null, next: null });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = getPostById(id);
      setPost(found || null);
      setAdjacent(getAdjacentPosts(id));
    }
  }, [id]);

  if (!post) return <div className="text-center py-32 text-slate-500">Post not found.</div>;

  return (
    <article className="min-h-screen pb-20">
      {/* Immersive Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 select-none">
            <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover animate-scale-in opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
        </div>
        
        {/* Navigation Back Button */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
            <div className="max-w-7xl mx-auto">
                <button 
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/10 w-fit"
                >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span className="text-sm font-medium">Back to Feed</span>
                </button>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
           <div className="max-w-4xl mx-auto animate-fade-in-up">
               <div className="flex flex-wrap gap-3 mb-6">
                  {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{tag}</span>
                  ))}
               </div>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight text-shadow-lg">
                 {post.title}
               </h1>
               
               <div className="flex items-center gap-6 text-white/80 text-sm md:text-base border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {post.author.charAt(0)}
                     </div>
                     <div>
                        <div className="font-bold text-white">{post.author}</div>
                        <div className="text-xs text-white/60">Author</div>
                     </div>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div>
                    <div className="font-mono text-white">{post.date}</div>
                    <div className="text-xs text-white/60">Published</div>
                  </div>
               </div>
           </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="relative z-20 -mt-10 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-secondary/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 md:p-16 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-light mb-12 border-l-4 border-primary pl-6 italic">
              {post.excerpt}
          </p>

          <div className="prose prose-lg md:prose-xl max-w-none prose-slate dark:prose-invert 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8
            prose-a:text-primary hover:prose-a:text-blue-500 prose-a:transition-colors no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12
            prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-blockquote:border-l-primary prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-black/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>

          {/* Social Share / Interaction Placeholder */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
             <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span className="text-sm font-medium">Like this post</span>
             </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PREVIOUS POST */}
            {adjacent.prev ? (
                <Link to={`/post/${adjacent.prev.id}`} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-secondary border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="relative z-10 flex flex-col items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Previous
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{adjacent.prev.title}</h4>
                    </div>
                </Link>
            ) : <div />}

            {/* NEXT POST */}
            {adjacent.next ? (
                <Link to={`/post/${adjacent.next.id}`} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-secondary border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all hover:shadow-lg text-right">
                    <div className="relative z-10 flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{adjacent.next.title}</h4>
                    </div>
                </Link>
            ) : <div />}
        </div>
      </div>
    </article>
  );
};