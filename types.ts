export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  tags: string[];
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}
