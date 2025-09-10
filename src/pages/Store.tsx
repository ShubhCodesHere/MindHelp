import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { StoreItem } from '../types';
import { 
  ShoppingBagIcon, 
  StarIcon, 
  HeartIcon,
  BookOpenIcon,
  CameraIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Store: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBagIcon },
    { id: 'merch', name: 'Wellness Merch', icon: HeartIcon },
    { id: 'books', name: 'Books & Journals', icon: BookOpenIcon },
    { id: 'accessories', name: 'Accessories', icon: StarIcon },
    { id: 'experiences', name: 'Experiences', icon: CameraIcon },
    { id: 'wellness', name: 'Wellness Products', icon: SparklesIcon },
    { id: 'fitness', name: 'Fitness & Health', icon: CheckCircleIcon },
  ];

  const storeItems: StoreItem[] = React.useMemo(() => {
    // Get items from admin-managed store
    const storedItems = localStorage.getItem('storeItems');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      console.log('Store: Loading from localStorage, found', items.length, 'items');
      return items;
    }
    
    console.log('Store: No localStorage found, using fallback with 12 default items');
    // Fallback to default items if admin hasn't set up store yet
    return [
    // Wellness Merch
    {
      id: '1',
      name: 'MindHelp Wellness T-Shirt',
      description: 'Comfortable cotton t-shirt with motivational wellness message',
      cost: 5000,
      category: 'merch',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center',
      inStock: true,
      featured: true,
    },
    {
      id: '2',
      name: 'Stress Relief Hoodie',
      description: 'Cozy hoodie perfect for meditation and relaxation',
      cost: 8000,
      category: 'merch',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: '3',
      name: 'Mindfulness Mug',
      description: 'Start your day with positive affirmations on this ceramic mug',
      cost: 2500,
      category: 'merch',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    
    // Books & Journals
    {
      id: '4',
      name: 'Daily Wellness Journal',
      description: 'Beautiful journal for tracking mood, gratitude, and daily reflections',
      cost: 3500,
      category: 'books',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop&crop=center',
      inStock: true,
      featured: true,
    },
    {
      id: '5',
      name: '"Mindful Living" Book',
      description: 'Expert-written guide to mindfulness and mental wellness',
      cost: 4000,
      category: 'books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: '6',
      name: 'Anxiety Relief Workbook',
      description: 'Practical exercises and techniques for managing anxiety',
      cost: 3000,
      category: 'books',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },

    // Accessories
    {
      id: '7',
      name: 'Meditation Cushion',
      description: 'Comfortable cushion for meditation and mindfulness practice',
      cost: 6000,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: '8',
      name: 'Essential Oil Diffuser',
      description: 'Create a calming atmosphere with this sleek diffuser',
      cost: 7500,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: '9',
      name: 'Wellness Planner',
      description: 'Plan your wellness journey with this comprehensive planner',
      cost: 2000,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },

    // Experiences
    {
      id: '10',
      name: 'Virtual Meditation Session',
      description: 'One-on-one guided meditation session with certified instructor',
      cost: 10000,
      category: 'experiences',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center',
      inStock: true,
      featured: true,
    },
    {
      id: '11',
      name: 'Online Wellness Workshop',
      description: 'Join interactive workshop on stress management techniques',
      cost: 7000,
      category: 'experiences',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: '12',
      name: 'Personal Wellness Consultation',
      description: '30-minute consultation with wellness expert',
      cost: 12000,
      category: 'experiences',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=center',
      inStock: true,
    },
    ];
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: StoreItem) => {
    if (user && user.tokens >= item.cost && !purchasedItems.includes(item.id)) {
      // Here you would typically make an API call to process the purchase
      setPurchasedItems([...purchasedItems, item.id]);
      // Update user tokens (in a real app, this would be handled by the backend)
      user.tokens -= item.cost;
      alert(`Successfully purchased ${item.name}! Delivery information will be sent to your email.`);
    } else if (user && user.tokens < item.cost) {
      alert('Insufficient tokens for this purchase. Complete more activities to earn tokens!');
    } else if (purchasedItems.includes(item.id)) {
      alert('You have already purchased this item!');
    }
  };

  if (!user || (user.role !== 'student' && user.role !== 'helper')) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Access Restricted</h2>
          <p className="text-gray-600">The token store is only available for students and peer helpers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Store</h1>
          <p className="text-lg text-gray-600 mb-6">
            Redeem your tokens for wellness merchandise, books, and experiences
          </p>
          <div className="inline-flex items-center bg-yellow-100 rounded-lg px-6 py-3">
            <SparklesIcon className="w-6 h-6 text-yellow-600 mr-2" />
            <span className="text-yellow-800 font-semibold">
              Your Tokens: {user.tokens.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Featured Items Banner */}
        {selectedCategory === 'all' && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Featured Items</h2>
            <p className="text-indigo-100">Our most popular wellness items, chosen by the community!</p>
          </div>
        )}

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                item.featured ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {item.featured && (
                <div className="bg-yellow-400 text-yellow-900 text-center py-1 text-sm font-semibold">
                  ⭐ Featured
                </div>
              )}
              
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {item.cost.toLocaleString()} tokens
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="text-gray-500 text-sm capitalize">{item.category}</span>
                </div>

                <div className="space-y-2">
                  {purchasedItems.includes(item.id) ? (
                    <div className="flex items-center justify-center bg-green-100 text-green-800 py-2 rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Purchased
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={!item.inStock || user.tokens < item.cost}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                        !item.inStock || user.tokens < item.cost
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {user.tokens < item.cost ? 'Insufficient Tokens' : 'Purchase Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        )}

        {/* How to Earn Tokens */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Earn More Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Complete Wellness Activities</h3>
              <p className="text-gray-600 text-sm">Participate in meditation, journaling, and wellness exercises</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Help Others</h3>
              <p className="text-gray-600 text-sm">Support fellow students and contribute to the community</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Achieve Milestones</h3>
              <p className="text-gray-600 text-sm">Unlock achievements and reach wellness goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
