import React from 'react';
import { PlayIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

interface WellnessVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  category: string;
}

const WellnessVideos: React.FC = () => {
  const wellnessVideos: WellnessVideo[] = [
    {
      id: '1',
      title: 'Breathing Exercises for Anxiety Relief',
      description: 'Simple breathing techniques to help calm your mind and reduce anxiety in just 5 minutes.',
      duration: '5:32',
      views: '2.3K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Anxiety Relief'
    },
    {
      id: '2',
      title: 'Guided Meditation for Stress',
      description: 'A calming meditation session to help you release stress and find inner peace.',
      duration: '10:15',
      views: '4.1K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Stress Management'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'Learn to relax your body and mind with this step-by-step muscle relaxation technique.',
      duration: '8:45',
      views: '1.8K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Relaxation'
    },
    {
      id: '4',
      title: 'Mindful Walking Technique',
      description: 'Transform your daily walk into a mindfulness practice for better mental health.',
      duration: '6:20',
      views: '3.2K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Mindfulness'
    },
    {
      id: '5',
      title: 'Sleep Better Tonight',
      description: 'Evidence-based tips and techniques to improve your sleep quality naturally.',
      duration: '12:30',
      views: '5.7K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Sleep Health'
    },
    {
      id: '6',
      title: 'Building Positive Thinking',
      description: 'Learn how to reframe negative thoughts and develop a more positive mindset.',
      duration: '9:10',
      views: '2.9K',
      thumbnail: '/api/placeholder/320/180',
      category: 'Positive Psychology'
    }
  ];

  const handleVideoClick = (video: WellnessVideo) => {
    // In a real app, this would open a video player or navigate to the video
    console.log('Playing video:', video.title);
    // For demo purposes, we'll just show an alert
    alert(`Playing: ${video.title}\n\nThis would open a video player in a real application.`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recommended Wellness Videos</h2>
          <p className="text-gray-600 mt-1">Personalized content based on your wellness score</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          For You
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wellnessVideos.map((video) => (
          <div 
            key={video.id}
            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <PlayIcon className="w-16 h-16 text-blue-600 opacity-80" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {video.category}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <EyeIcon className="w-3 h-3 mr-1" />
                  {video.views}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {video.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          View All Wellness Videos
        </button>
      </div>
    </div>
  );
};

export default WellnessVideos;
