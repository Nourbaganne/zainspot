'use client';

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '@/app/contexts/authContext';
import { redirect } from 'next/navigation';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

interface Message {
  id: number;
  conversationId: string;
  sender: string;
  senderType: 'user' | 'agent';
  content: string;
  isRead: boolean;
  createdAt: string;
}

const SupportDashboard = () => {
  const { user, isSupport } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [conversations, setConversations] = useState([]);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (content: string) => {
    if (!selectedConversationId) return;

    try {
      await axios.post(`${API_URL}/chat/messages`, {
        content,
        conversationId: selectedConversationId,
        sender: user?.user?.email || 'Support Agent',
        senderType: 'agent'
      });

      // Don't update messages here - wait for socket event
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!selectedConversationId) return;

    // Load messages for the selected conversation
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/messages/${selectedConversationId}`);
        setMessages(response.data.sort((a: Message, b: Message) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();

    // Connect to socket
    const socket = io('http://localhost:3001');
    
    socket.on('newMessage', (message: Message) => {
      console.log('Support Dashboard: Received new message:', message);
      // Only add message if it's for the selected conversation
      if (message.conversationId === selectedConversationId) {
        setMessages(prevMessages => {
          // Check if message already exists to prevent duplication
          const messageExists = prevMessages.some(m => m.id === message.id);
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, message].sort((a, b) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
      }
    });

    return () => {
      console.log('Support Dashboard: Disconnecting socket');
      socket.disconnect();
    };
  }, [selectedConversationId]);

  useEffect(() => {
    if (user && isSupport()) {
      // initializeAndFetch();
      loadConversations(); // Load conversations immediately
      
      // Set up periodic refresh
      const interval = setInterval(loadConversations, 30000); // Refresh every 30 seconds
      return () => {
        clearInterval(interval);
        socketRef.current?.disconnect();
      };
    }
  }, [user, isSupport]);

  // Add a function to fetch user data
  const fetchUserData = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      const userData = response.data;
      setUserNames(prev => ({
        ...prev,
        [userId]: userData.name || userData.email || 'Anonymous User'
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserNames(prev => ({
        ...prev,
        [userId]: 'Anonymous User'
      }));
    }
  };

  // Load all conversations
  const loadConversations = async () => {
    try {
      console.log('Support Dashboard: Loading conversations...');
      const response = await axiosInstance.get('/chat/pending-conversations');
      const conversations = response.data;
      console.log('Support Dashboard: Found conversations:', conversations);

      // Ensure we have valid conversation IDs
      const validConversations = conversations.filter(conv => conv.conversationId);
      setConversations(validConversations);

      // Load messages for the selected conversation or the first one
      if (validConversations.length > 0) {
        const targetConversationId = selectedConversationId || validConversations[0].conversationId;
        console.log('Support Dashboard: Loading messages for conversation:', targetConversationId);
        
        if (targetConversationId) {
          const messagesResponse = await axiosInstance.get(`/chat/messages/${targetConversationId}`);
          const messages = messagesResponse.data;
          
          // Fetch user data for each unique user
          const userIds = Array.from(new Set(messages
            .filter(msg => msg.senderType === 'user')
            .map(msg => msg.sender)
          ));
          
          await Promise.all(userIds.map(fetchUserData));
          
          setMessages(messages);
          
          if (!selectedConversationId) {
            setSelectedConversationId(targetConversationId);
          }
        }
      }
    } catch (error) {
      console.error('Support Dashboard: Error loading conversations:', error);
    }
  };

  // Handle conversation selection
  const handleConversationSelect = async (conversationId: string) => {
    try {
      console.log('Support Dashboard: Selecting conversation:', conversationId);
      setSelectedConversationId(conversationId);
      
      const response = await axiosInstance.get(`/chat/messages/${conversationId}`);
      const messages = response.data;
      console.log('Support Dashboard: Loaded messages:', messages);

      // Fetch user data for each unique user
      const userIds = Array.from(new Set(messages
        .filter(msg => msg.senderType === 'user')
        .map(msg => msg.sender)
      ));
      
      await Promise.all(userIds.map(fetchUserData));

      // Sort messages by creation time
      const sortedMessages = messages.sort((a: Message, b: Message) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Support Dashboard: Error selecting conversation:', error);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId || !user?.user.email) return;

    await sendMessage(newMessage);
  };

  // Render conversations list
  const renderConversations = () => {
    return conversations.map((conversation, index) => (
      <div 
        key={index}
        className={`p-4 hover:bg-gray-50 cursor-pointer ${
          selectedConversationId === conversation.conversationId ? 'bg-gray-50' : ''
        }`}
        onClick={() => handleConversationSelect(conversation.conversationId)}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium">
            {userNames[conversation.lastSender] || 'Anonymous User'}
          </h3>
          <span className="text-sm text-gray-500">
            {new Date(conversation.lastMessageTime).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {conversation.messageCount} messages
        </p>
      </div>
    ));
  };

  // Group messages by conversation
  const conversationsMap = messages.reduce((acc, message) => {
    const key = message.conversationId;
    
    if (!acc.has(key)) {
      acc.set(key, {
        messages: [],
        userId: message.senderType === 'user' ? message.sender : null,
        lastMessageTime: new Date(message.createdAt).getTime()
      });
    }
    
    const conversation = acc.get(key)!;
    
    // Only add message if it doesn't already exist
    if (!conversation.messages.some(m => m.id === message.id)) {
      conversation.messages.push(message);
      const messageTime = new Date(message.createdAt).getTime();
      if (messageTime > conversation.lastMessageTime) {
        conversation.lastMessageTime = messageTime;
      }
    }
    
    return acc;
  }, new Map<string, { messages: Message[], userId: string | null, lastMessageTime: number }>());

  // Sort conversations by latest message
  const sortedConversations = Array.from(conversationsMap.entries())
    .sort(([, a], [, b]) => b.lastMessageTime - a.lastMessageTime);

  type ConversationSummary = {
    message: Message;
    userId: string | null;
  };

  // Get latest message for each conversation
  const latestMessages = sortedConversations.reduce<Record<string, ConversationSummary>>((acc, [key, conversation]) => {
    if (conversation.messages.length === 0) {
      return acc;
    }
    
    const latestMsg = conversation.messages.reduce((latest, current) => 
      new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest,
      conversation.messages[0]
    );
    
    acc[key] = {
      message: latestMsg,
      userId: conversation.userId
    };
    return acc;
  }, {});

  // Get messages for selected conversation
  const selectedConversationMessages = selectedConversationId 
    ? (conversationsMap.get(selectedConversationId)?.messages || [])
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  // Check authentication
  useEffect(() => {
    if (!user || !isSupport()) {
      console.log('Unauthorized access to support dashboard, redirecting to login');
      redirect('/login');
      return;
    }
  }, [user, isSupport]);

  // Render messages for selected conversation
  const renderMessages = () => {
    const conversationMessages = messages.filter(
      (msg) => msg.conversationId === selectedConversationId
    );
    
    console.log('Support Dashboard: Rendering messages:', conversationMessages);
    
    return conversationMessages.map((message) => (
      <div
        key={message.id}
        className={`flex ${
          message.senderType === 'agent' ? 'justify-end' : 'justify-start'
        } mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            message.senderType === 'agent'
              ? 'bg-[#00927C] text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <div className="text-sm mb-1">
            {message.senderType === 'agent' ? (
              <span>Support Agent: {message.sender}</span>
            ) : (
              <span>User: {userNames[message.sender] || 'Anonymous User'}</span>
            )}
          </div>
          <p className="text-sm">{message.content}</p>
          <div className="text-xs mt-1 opacity-75">
            {new Date(message.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {renderConversations()}
        </div>
      </div>

      {/* Conversation Detail View */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedConversationId ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {(() => {
                  const conversation = conversationsMap.get(selectedConversationId);
                  if (conversation?.userId) {
                    const userName = userNames[conversation.userId];
                    return `Conversation with ${userName || `User ${conversation.userId}`}`;
                  }
                  return 'Conversation with Support Agent';
                })()}
              </h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {renderMessages()}
              <div ref={messagesEndRef} />
            </div>
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#00927C] resize-none h-[45px] min-h-[45px]"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-[#00927C] text-white rounded-lg hover:bg-[#007A68] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to view messages
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;
