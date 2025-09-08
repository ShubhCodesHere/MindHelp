import React, { useState } from 'react';
import { 
  PlusIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  ChatBubbleLeftIcon,
  TagIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import type { Post } from '../types';

const Community: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const tags = ['all', 'anxiety', 'stress', 'sleep', 'study-tips', 'motivation', 'depression', 'social'];

  const posts: Post[] = [
    {
      id: '1',
      authorId: 'user1',
      authorName: 'Anonymous Student',
      title: 'How do you deal with exam anxiety?',
      content: 'I have my finals coming up and I\'m feeling really overwhelmed. The anxiety is making it hard to focus on studying. Any tips that have worked for you?',
      tags: ['anxiety', 'study-tips'],
      upvotes: 23,
      downvotes: 2,
      comments: [
        {
          id: '1',
          authorId: 'user2',
          authorName: 'Helpful Peer',
          content: 'I use the 4-7-8 breathing technique before studying. It really helps calm my nerves!',
          upvotes: 8,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isAnonymous: false,
        },
        {
          id: '2',
          authorId: 'user3',
          authorName: 'Anonymous',
          content: 'Breaking study sessions into 25-minute chunks with breaks helped me a lot.',
          upvotes: 12,
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          isAnonymous: true,
        }
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isAnonymous: true,
    },
    {
      id: '2',
      authorId: 'user4',
      authorName: 'Study Buddy',
      title: 'Sharing my daily routine that helped with depression',
      content: 'After struggling for months, I found a routine that really helps. Thought I\'d share in case it helps someone else: morning walk, journaling, scheduled study times, and connecting with one person each day.',
      tags: ['depression', 'motivation'],
      upvotes: 45,
      downvotes: 1,
      comments: [],
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isAnonymous: false,
    },
    {
      id: '3',
      authorId: 'user5',
      authorName: 'Anonymous',
      title: 'Anyone else struggle with sleep before big tests?',
      content: 'I tend to stay up all night before exams, even when I\'m prepared. It\'s like my brain won\'t shut off. How do you force yourself to sleep?',
      tags: ['sleep', 'anxiety'],
      upvotes: 17,
      downvotes: 0,
      comments: [],
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      isAnonymous: true,
    },
  ];

  const filteredPosts = posts.filter(post => 
    selectedTag === 'all' || post.tags.includes(selectedTag)
  ).sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
            <p className="text-gray-600 mt-2">Connect, share, and support each other</p>
          </div>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            New Post
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by topic:</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag === 'all' ? 'All Topics' : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                className="input-field"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex space-x-4">
                {/* Voting */}
                <div className="flex flex-col items-center space-y-2">
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <ArrowUpIcon className="w-5 h-5" />
                  </button>
                  <span className="font-medium text-gray-900">
                    {post.upvotes - post.downvotes}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <ArrowDownIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="flex-1">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {post.authorName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{post.authorName}</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>{getTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Title and Content */}
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.content}</p>

                  {/* Tags */}
                  <div className="flex items-center space-x-2 mb-4">
                    <TagIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      <span>{post.comments.length} comments</span>
                    </button>
                    <button className="hover:text-primary-600 transition-colors">Share</button>
                    <button className="hover:text-primary-600 transition-colors">Save</button>
                  </div>

                  {/* Comments Preview */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Comments:</h4>
                      {post.comments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="mb-3 last:mb-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {comment.authorName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {getTimeAgo(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button className="text-xs text-gray-500 hover:text-green-600">
                              ↑ {comment.upvotes}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-primary-600">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                      {post.comments.length > 2 && (
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          View all {post.comments.length} comments
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Community Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be respectful and supportive of all community members</li>
            <li>• Keep discussions relevant to mental health and student well-being</li>
            <li>• No sharing of personal contact information</li>
            <li>• Report any concerning content to moderators immediately</li>
            <li>• Remember: This is peer support, not professional medical advice</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Community;
