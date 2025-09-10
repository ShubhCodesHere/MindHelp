export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'helper' | 'psychiatrist' | 'admin' | 'guest';
  avatar?: string;
  tokens: number;
  rating?: number;
  isOnline?: boolean;
  specialization?: string; // for psychiatrists
  helpCount?: number; // for helpers
  isGuest?: boolean; // for guest users
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  isBot?: boolean;
}

export interface Session {
  id: string;
  studentId: string;
  helperId?: string;
  psychiatristId?: string;
  type: 'chat' | 'video' | 'voice';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledTime?: Date;
  duration?: number;
  rating?: number;
  notes?: string;
  phqScore?: number;
  gadScore?: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  timestamp: Date;
  isAnonymous: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  upvotes: number;
  timestamp: Date;
  isAnonymous: boolean;
}

export interface WellnessContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article';
  url: string;
  thumbnail?: string;
  duration?: number;
  tags: string[];
  category: 'stress' | 'sleep' | 'motivation' | 'burnout' | 'breathing' | 'meditation';
  language: 'en' | 'hi' | 'es' | 'fr';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'session' | 'message' | 'achievement' | 'system';
  isRead: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tokensReward: number;
  requirement: string;
}

export interface Analytics {
  totalUsers: number;
  activeSessions: number;
  completedSessions: number;
  averageRating: number;
  stressLevels: { label: string; value: number }[];
  helpRequests: { date: string; count: number }[];
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'merch' | 'books' | 'accessories' | 'experiences' | 'wellness' | 'fitness';
  image: string;
  inStock: boolean;
  featured?: boolean;
}
