import React, { useState } from 'react';
import { PlayIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { WellnessContent } from '../types';

const WellnessHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const categories = [
    { id: 'all', name: 'All Content', color: 'bg-gray-500' },
    { id: 'breathing', name: 'Breathing', color: 'bg-blue-500' },
    { id: 'meditation', name: 'Meditation', color: 'bg-purple-500' },
    { id: 'stress', name: 'Stress Relief', color: 'bg-green-500' },
    { id: 'sleep', name: 'Sleep', color: 'bg-indigo-500' },
    { id: 'motivation', name: 'Motivation', color: 'bg-yellow-500' },
  ];

  const wellnessContent: WellnessContent[] = [
    {
      id: '1',
      title: '5-Minute Breathing Exercise',
      description: 'Quick breathing technique to reduce anxiety and stress',
      type: 'audio',
      url: '#',
      duration: 300,
      tags: ['anxiety', 'stress', 'quick'],
      category: 'breathing',
      language: 'en',
    },
    {
      id: '2',
      title: 'Guided Sleep Meditation',
      description: 'Peaceful meditation to help you fall asleep naturally',
      type: 'audio',
      url: '#',
      duration: 1200,
      tags: ['sleep', 'relaxation', 'night'],
      category: 'sleep',
      language: 'en',
    },
    {
      id: '3',
      title: 'Study Stress Relief',
      description: 'Techniques to manage exam anxiety and study pressure',
      type: 'video',
      url: '#',
      duration: 480,
      tags: ['study', 'exam', 'stress'],
      category: 'stress',
      language: 'en',
    },
    {
      id: '4',
      title: 'Morning Motivation',
      description: 'Start your day with positive energy and motivation',
      type: 'video',
      url: '#',
      duration: 360,
      tags: ['morning', 'energy', 'positivity'],
      category: 'motivation',
      language: 'en',
    },
    {
      id: '5',
      title: 'Mindful Meditation for Beginners',
      description: 'Learn the basics of mindfulness meditation',
      type: 'video',
      url: '#',
      duration: 600,
      tags: ['mindfulness', 'beginner', 'meditation'],
      category: 'meditation',
      language: 'en',
    },
  ];

  const filteredContent = wellnessContent.filter(content => {
    const categoryMatch = selectedCategory === 'all' || content.category === selectedCategory;
    const languageMatch = content.language === selectedLanguage;
    return categoryMatch && languageMatch;
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wellness Hub</h1>
          <p className="text-gray-600 mt-2">Guided meditations, breathing exercises, and wellness content</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <div key={content.id} className="card hover:shadow-lg transition-shadow duration-200">
              {/* Thumbnail */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      content.type === 'video' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {content.type === 'video' ? (
                        <PlayIcon className="w-8 h-8 text-white" />
                      ) : (
                        <HeartIcon className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <span className="text-xs text-gray-600 capitalize">{content.type}</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {formatDuration(content.duration || 0)}
                </div>
              </div>

              {/* Content Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{content.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{content.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {content.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full btn-primary">
                  <PlayIcon className="w-4 h-4 inline mr-2" />
                  {content.type === 'video' ? 'Watch Now' : 'Listen Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Featured</h2>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">Daily Mindfulness Challenge</h3>
              <p className="text-purple-100 mb-6">
                Join thousands of students in our 7-day mindfulness challenge. Just 10 minutes a day 
                can significantly reduce stress and improve focus.
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Join Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Emergency Calm</h3>
            <p className="text-sm text-gray-600 mt-1">Quick 2-minute breathing exercise</p>
          </button>

          <button className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Sleep Stories</h3>
            <p className="text-sm text-gray-600 mt-1">Peaceful stories for better sleep</p>
          </button>

          <button className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Focus Boost</h3>
            <p className="text-sm text-gray-600 mt-1">Concentration enhancement techniques</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessHub;
