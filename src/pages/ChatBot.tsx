import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import type { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'bot',
      content: `Hello ${user?.name}! I'm MindBot, your AI mental health assistant. I'm here to listen and provide support. How are you feeling today?`,
      timestamp: new Date(),
      type: 'text',
      isBot: true,
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { text: "I'm feeling anxious", category: 'anxiety' },
    { text: "I can't sleep", category: 'sleep' },
    { text: "I'm stressed about exams", category: 'stress' },
    { text: "I feel overwhelmed", category: 'overwhelm' },
    { text: "I need breathing exercises", category: 'breathing' },
    { text: "Help me focus", category: 'focus' },
  ];

  const botResponses = {
    anxiety: [
      "I understand you're feeling anxious. Let's try a grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      "Anxiety is tough, but you're not alone. Try taking slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 6. Would you like me to guide you through this?",
    ],
    stress: [
      "Exam stress is completely normal. Remember, you've prepared and you're capable. Let's break down what's worrying you most.",
      "Stress can feel overwhelming, but we can manage it together. Have you tried the Pomodoro technique for studying? It can really help reduce stress.",
    ],
    sleep: [
      "Sleep troubles can affect everything. Let's work on some sleep hygiene. Are you using screens close to bedtime?",
      "Good sleep is crucial for mental health. Try creating a bedtime routine: dim lights, no caffeine after 2 PM, and maybe some calming music.",
    ],
    breathing: [
      "Let's do a breathing exercise together! Follow my lead: Breathe in slowly for 4 seconds... hold for 4... now breathe out for 6. Let's repeat this 5 times.",
      "Breathing exercises are powerful! Try the 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8. This activates your parasympathetic nervous system.",
    ],
    focus: [
      "Difficulty focusing is common, especially when stressed. Try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.",
      "Let's improve your focus! Start with 15-minute focused work sessions with 5-minute breaks. Gradually increase the work time as you build your attention span.",
    ],
    overwhelm: [
      "Feeling overwhelmed is a sign that you're taking on a lot. Let's break things down into smaller, manageable tasks. What's the most pressing thing right now?",
      "When overwhelmed, it helps to write everything down. Make a list and prioritize. Remember: you don't have to do everything at once.",
    ],
    default: [
      "I hear you. It's important that you're reaching out. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. Your feelings are valid. What would help you feel a bit better right now?",
      "I'm here to support you. Would you like to talk more about this, or would you prefer some coping strategies?",
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      return botResponses.anxiety[Math.floor(Math.random() * botResponses.anxiety.length)];
    }
    if (message.includes('stress') || message.includes('exam') || message.includes('pressure')) {
      return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
    }
    if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return botResponses.sleep[Math.floor(Math.random() * botResponses.sleep.length)];
    }
    if (message.includes('breathing') || message.includes('breathe')) {
      return botResponses.breathing[Math.floor(Math.random() * botResponses.breathing.length)];
    }
    if (message.includes('focus') || message.includes('concentrate') || message.includes('attention')) {
      return botResponses.focus[Math.floor(Math.random() * botResponses.focus.length)];
    }
    if (message.includes('overwhelm') || message.includes('too much') || message.includes('burden')) {
      return botResponses.overwhelm[Math.floor(Math.random() * botResponses.overwhelm.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || newMessage.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || 'user',
      content: textToSend,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'bot',
        content: getBotResponse(textToSend),
        timestamp: new Date(),
        type: 'text',
        isBot: true,
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Follow up with suggestions after certain responses
      if (textToSend.toLowerCase().includes('help') || textToSend.toLowerCase().includes('support')) {
        setTimeout(() => {
          const followUp: ChatMessage = {
            id: (Date.now() + 2).toString(),
            senderId: 'bot',
            content: "Would you like me to connect you with a peer helper or schedule a session with a mental health professional? I can also recommend some wellness content that might help.",
            timestamp: new Date(),
            type: 'text',
            isBot: true,
          };
          setMessages(prev => [...prev, followUp]);
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <SparklesIcon className="w-6 h-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Mental Health Assistant</h1>
          </div>
          <p className="text-gray-600">Safe, confidential, and available 24/7</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500' : 'text-primary-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.text)}
                    className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 input-field"
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!newMessage.trim() || isTyping}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This AI assistant provides support and information but is not a replacement for professional mental health care.
            If you're in crisis, please contact emergency services or a mental health professional immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
