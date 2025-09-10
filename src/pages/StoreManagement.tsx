import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { StoreItem } from '../types';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  CubeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const StoreManagement: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<StoreItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreItem | null>(null);
  const [selectedTab, setSelectedTab] = useState<'products' | 'analytics' | 'orders'>('products');

  // Load initial store items
  useEffect(() => {
    loadStoreItems();
  }, []);

  const loadStoreItems = () => {
    const storedItems = localStorage.getItem('storeItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      // Initialize with default items
      const defaultItems: StoreItem[] = [
        {
          id: '1',
          name: 'MindHelp Wellness T-Shirt',
          description: 'Comfortable cotton t-shirt with motivational wellness message',
          cost: 5000,
          category: 'merch',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '2',
          name: 'Daily Wellness Journal',
          description: 'Beautiful journal for tracking mood, gratitude, and daily reflections',
          cost: 3500,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '3',
          name: 'Meditation Cushion Set',
          description: 'Premium zabuton and zafu meditation cushion set for comfortable practice',
          cost: 8500,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '4',
          name: 'Aromatherapy Essential Oil Kit',
          description: 'Set of 6 calming essential oils: lavender, eucalyptus, peppermint, and more',
          cost: 4200,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '5',
          name: 'Stress Relief Coloring Book',
          description: 'Adult coloring book with intricate mandalas and relaxing patterns',
          cost: 1800,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '6',
          name: 'Mindfulness Card Deck',
          description: '50 cards with daily mindfulness exercises and affirmations',
          cost: 2800,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '7',
          name: 'Yoga Mat Premium',
          description: 'Non-slip, eco-friendly yoga mat with alignment guides',
          cost: 6200,
          category: 'fitness',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '8',
          name: 'Himalayan Salt Lamp',
          description: 'Natural pink salt lamp for air purification and ambient lighting',
          cost: 4800,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '9',
          name: 'Mental Health First Aid Guide',
          description: 'Comprehensive handbook for understanding and supporting mental health',
          cost: 3200,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '10',
          name: 'Weighted Blanket Therapy',
          description: '15lb weighted blanket for anxiety relief and better sleep quality',
          cost: 9500,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '11',
          name: 'MindHelp Water Bottle',
          description: 'Stainless steel water bottle with hydration reminders and wellness quotes',
          cost: 3800,
          category: 'merch',
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '12',
          name: 'Resistance Band Set',
          description: 'Complete set of 5 resistance bands for home workouts and physical therapy',
          cost: 4500,
          category: 'fitness',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '13',
          name: 'Sleep Sound Machine',
          description: 'White noise machine with 20 soothing sounds for better sleep',
          cost: 5500,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '14',
          name: 'Gratitude Planner 2025',
          description: 'Annual planner focused on gratitude practice and goal setting',
          cost: 4200,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '15',
          name: 'MindHelp Hoodie',
          description: 'Cozy fleece hoodie with embroidered mindfulness logo',
          cost: 7200,
          category: 'merch',
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '16',
          name: 'Meditation Timer Bell',
          description: 'Tibetan singing bowl with wooden striker for meditation practice',
          cost: 6800,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '17',
          name: 'Fitness Tracker Band',
          description: 'Smart fitness tracker with heart rate and stress monitoring',
          cost: 12500,
          category: 'fitness',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
          inStock: true,
          featured: true,
        },
        {
          id: '18',
          name: 'Herbal Tea Sampler',
          description: 'Collection of 12 calming herbal teas for relaxation and wellness',
          cost: 3600,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1594736797933-d0c4b6607047?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '19',
          name: 'Cognitive Behavioral Therapy Workbook',
          description: 'Practical workbook with CBT exercises and techniques',
          cost: 4800,
          category: 'books',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
        {
          id: '20',
          name: 'Desk Plant Zen Garden',
          description: 'Mini zen garden with succulent plant for desk mindfulness',
          cost: 2400,
          category: 'wellness',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
          inStock: true,
          featured: false,
        },
      ];
      setItems(defaultItems);
      localStorage.setItem('storeItems', JSON.stringify(defaultItems));
    }
  };

  const saveItems = (updatedItems: StoreItem[]) => {
    setItems(updatedItems);
    localStorage.setItem('storeItems', JSON.stringify(updatedItems));
  };

  const resetToDefaultItems = () => {
    if (confirm('Are you sure you want to reset the store to default items? This will remove all custom products.')) {
      // Clear localStorage and reload default items
      localStorage.removeItem('storeItems');
      loadStoreItems();
    }
  };

  const handleAddItem = (newItem: Omit<StoreItem, 'id'>) => {
    const item: StoreItem = {
      ...newItem,
      id: Date.now().toString(),
    };
    const updatedItems = [...items, item];
    saveItems(updatedItems);
    setShowAddModal(false);
  };

  const handleEditItem = (updatedItem: StoreItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    saveItems(updatedItems);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== itemId);
      saveItems(updatedItems);
    }
  };

  const toggleFeatured = (itemId: string) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, featured: !item.featured } : item
    );
    saveItems(updatedItems);
  };

  const toggleStock = (itemId: string) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, inStock: !item.inStock } : item
    );
    saveItems(updatedItems);
  };

  // Mock analytics data
  const getAnalytics = () => {
    return {
      totalProducts: items.length,
      inStockProducts: items.filter(item => item.inStock).length,
      featuredProducts: items.filter(item => item.featured).length,
      totalRevenue: 248750, // Updated with more realistic total
      totalOrders: 456, // Updated order count
      avgOrderValue: Math.round(248750 / 456),
    };
  };

  const analytics = getAnalytics();

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <CubeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Store management is only available for administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Management</h1>
          <p className="text-gray-600">Manage products, track inventory, and view analytics</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'products', name: 'Products', icon: CubeIcon },
              { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
              { id: 'orders', name: 'Orders', icon: ShoppingCartIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'products' | 'analytics' | 'orders')}
                  className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CubeIcon className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">In Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.inStockProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Featured</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.featuredProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Avg. Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(items.reduce((sum, item) => sum + item.cost, 0) / items.length || 0)} tokens
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Product
              </button>
              <button
                onClick={resetToDefaultItems}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <CubeIcon className="w-5 h-5 mr-2" />
                Reset to Default Store ({items.length} items)
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.cost.toLocaleString()} tokens
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          {item.featured && (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setShowEditModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleStock(item.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleFeatured(item.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            ⭐
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalRevenue.toLocaleString()} tokens</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ShoppingCartIcon className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ChartBarIcon className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.avgOrderValue} tokens</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
              <div className="space-y-4">
                {['merch', 'books', 'accessories', 'experiences', 'wellness', 'fitness'].map((category) => {
                  const categoryItems = items.filter(item => item.category === category);
                  const count = categoryItems.length;
                  const percentage = Math.round((count / items.length) * 100) || 0;
                  
                  return (
                    <div key={category} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600 capitalize">{category}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm text-gray-900">{count} items</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <p className="text-gray-600">Order tracking functionality would be implemented here with real backend integration.</p>
            
            {/* Mock orders table */}
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: '#1001', customer: 'John Doe', product: 'MindHelp Wellness T-Shirt', amount: 5000, status: 'Delivered', date: '2025-09-08' },
                    { id: '#1002', customer: 'Jane Smith', product: 'Daily Wellness Journal', amount: 3500, status: 'Processing', date: '2025-09-09' },
                    { id: '#1003', customer: 'Mike Johnson', product: 'Meditation Cushion Set', amount: 8500, status: 'Shipped', date: '2025-09-09' },
                    { id: '#1004', customer: 'Sarah Wilson', product: 'Aromatherapy Essential Oil Kit', amount: 4200, status: 'Delivered', date: '2025-09-07' },
                    { id: '#1005', customer: 'David Brown', product: 'Weighted Blanket Therapy', amount: 9500, status: 'Processing', date: '2025-09-10' },
                    { id: '#1006', customer: 'Emily Davis', product: 'Yoga Mat Premium', amount: 6200, status: 'Shipped', date: '2025-09-08' },
                    { id: '#1007', customer: 'Alex Thompson', product: 'Fitness Tracker Band', amount: 12500, status: 'Delivered', date: '2025-09-06' },
                    { id: '#1008', customer: 'Lisa Garcia', product: 'MindHelp Hoodie', amount: 7200, status: 'Processing', date: '2025-09-10' },
                    { id: '#1009', customer: 'Chris Lee', product: 'Sleep Sound Machine', amount: 5500, status: 'Shipped', date: '2025-09-09' },
                    { id: '#1010', customer: 'Maria Rodriguez', product: 'Herbal Tea Sampler', amount: 3600, status: 'Delivered', date: '2025-09-08' },
                  ].map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.amount.toLocaleString()} tokens
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modals */}
        {(showAddModal || showEditModal) && (
          <ProductModal
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setEditingItem(null);
            }}
            onSave={showAddModal ? handleAddItem : handleEditItem}
            item={editingItem}
            isEditing={showEditModal}
          />
        )}
      </div>
    </div>
  );
};

// Product Modal Component
const ProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: StoreItem) => void;
  item?: StoreItem | null;
  isEditing: boolean;
}> = ({ isOpen, onClose, onSave, item, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: 0,
    category: 'merch' as StoreItem['category'],
    image: '',
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    if (item && isEditing) {
      setFormData({
        name: item.name,
        description: item.description,
        cost: item.cost,
        category: item.category,
        image: item.image,
        inStock: item.inStock,
        featured: item.featured || false,
      });
    }
  }, [item, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && item) {
      onSave({ ...item, ...formData });
    } else {
      onSave({ id: Date.now().toString(), ...formData });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (tokens)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as StoreItem['category'] })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="merch">Merch</option>
              <option value="books">Books</option>
              <option value="accessories">Accessories</option>
              <option value="experiences">Experiences</option>
              <option value="wellness">Wellness</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="mr-2"
              />
              In Stock
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              Featured
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreManagement;
