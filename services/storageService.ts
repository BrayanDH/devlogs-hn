import { BlogPost } from '../types';

const STORAGE_KEY = 'devlog_posts';

const MOCK_DATA: BlogPost[] = [
  {
    id: '1',
    title: 'Deploying our first Kubernetes Cluster',
    excerpt: 'A deep dive into the challenges and triumphs of moving our monolithic app to k8s.',
    content: 'We started the morning with high hopes. By noon, the pods were crashing loops. But after tweaking the readiness probes...',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    author: 'Alex Dev',
    tags: ['DevOps', 'Kubernetes']
  },
  {
    id: '2',
    title: 'React 19 Features Review',
    excerpt: 'Checking out the compiler and new hook optimizations.',
    content: 'React 19 brings some massive changes to how we think about memoization. The new compiler is a game changer...',
    date: '2023-11-02',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    author: 'Sarah Code',
    tags: ['React', 'Frontend']
  }
];

// Initialize mock data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
}

export const getPosts = (): BlogPost[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPostById = (id: string): BlogPost | undefined => {
  const posts = getPosts();
  return posts.find((p) => p.id === id);
};

export const getAdjacentPosts = (id: string): { prev: BlogPost | null; next: BlogPost | null } => {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  
  if (index === -1) return { prev: null, next: null };

  // posts are typically ordered Newest (0) to Oldest (N)
  // "Next" (Newer in list) -> index - 1
  // "Prev" (Older in list) -> index + 1
  
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return { next: newer, prev: older };
};

export const savePost = (post: BlogPost): void => {
  const posts = getPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deletePost = (id: string): void => {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};