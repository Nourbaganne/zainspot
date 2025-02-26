'use client';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext';
import getUserData from '../lib/getUserData';
import { v4 as uuidv4 } from 'uuid';

interface Tab {
  id: string;
  icon: JSX.Element;
  label: string;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  senderType: 'user' | 'agent';
  conversationId: string;
  createdAt: string;
  isRead: boolean;
}

interface ConversationGroup {
  agentEmail: string;
  messages: Message[];
}

const API_URL = 'http://localhost:3001';

const Chatbot: React.FC = () => {
  // State management
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationGroups, setConversationGroups] = useState<ConversationGroup[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { data: userData } = useQuery({
    queryKey: ['users', user?.user.userId],
    queryFn: () => getUserData(user?.user.userId, user?.access_token),
    enabled: !!user?.user.userId && !!user?.access_token,
  });

  useEffect(() => {
    if (userData) {
      const fullName = `${userData.name || ''} ${userData.middlename || ''} ${userData.lastName || ''}`.trim();
      console.log('User Full Name:', fullName);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.id) {
      const storedConversationId = localStorage.getItem('conversationId');
      if (storedConversationId) {
        setConversationId(storedConversationId);
      } else {
        // Generate new conversation ID if none exists
        const newConversationId = uuidv4();
        localStorage.setItem('conversationId', newConversationId);
        setConversationId(newConversationId);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (!conversationId) return;

    const socket = io('http://localhost:3001');
    
    socket.on('newMessage', (message: Message) => {
      console.log('Chatbot: Received new message:', message);
      if (message.conversationId === conversationId) {
        setMessages(prevMessages => {
          // Check if message already exists
          const messageExists = prevMessages.some(m => m.id === message.id);
          if (messageExists) {
            return prevMessages;
          }
          const newMessages = [...prevMessages, message];
          return newMessages.sort((a, b) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        scrollToBottom();
      }
    });

    // Load existing messages
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/messages/${conversationId}`);
        setMessages(response.data.sort((a: Message, b: Message) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ));
        scrollToBottom();
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();

    return () => {
      console.log('Chatbot: Disconnecting socket');
      socket.disconnect();
    };
  }, [conversationId]);

  const groupMessagesByAgent = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(msg => {
      if (msg.senderType === 'agent') {
        if (!groups[msg.sender]) {
          groups[msg.sender] = [];
        }
        groups[msg.sender].push(msg);
      }
    });

    return Object.entries(groups).map(([agentEmail, messages]) => ({
      agentEmail,
      messages: messages.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    }));
  };

  useEffect(() => {
    const groups = groupMessagesByAgent(messages);
    setConversationGroups(groups);
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!conversationId) return;

    try {
      const response = await axios.post(`${API_URL}/chat/messages`, {
        content,
        conversationId,
        sender: 'User',
        senderType: 'user'
      });

      // Add the message to the state immediately for better UX
      setMessages(prevMessages => [...prevMessages, response.data]);
      setMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'messages' && !conversationId) {
      const newConversationId = uuidv4();
      localStorage.setItem('conversationId', newConversationId);
      setConversationId(newConversationId);
    }
  };

  const handleMessageClick = (conversationId: string) => {
    setSelectedQuestion(conversationId);
    setActiveTab('messages');
    setIsChatOpen(true);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !socketRef.current?.connected) {
      console.log('Chatbot: Cannot send - message empty or socket not connected');
      return;
    }

    console.log('Chatbot: Preparing to send message');
    const messageContent = message.trim();
    setMessage(''); // Clear input immediately
    
    const messageData = {
      content: messageContent,
      sender: user?.user.userId || 'anonymous',
      senderType: 'user',
      conversationId: conversationId || ''
    };
    
    console.log('Chatbot: Sending message data:', messageData);
    
    socketRef.current.emit('sendMessage', messageData, (response: any) => {
      console.log('Chatbot: Message send response:', response);
      if (response.success) {
        // Save conversation ID if this is a new conversation
        if (!conversationId && response.message.conversationId) {
          const newConversationId = response.message.conversationId;
          console.log('Chatbot: Setting new conversation ID:', newConversationId);
          localStorage.setItem('conversationId', newConversationId);
          setConversationId(newConversationId);
        }
      } else {
        console.error('Chatbot: Failed to send message:', response.error);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        sendMessage(message.trim());
      }
    }
  };

  const tabs: Tab[] = [
    {
      id: 'home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path
            d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: 'Home',
    },
    {
      id: 'messages',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" fill="none" className="w-6 h-6">
          <path
            stroke="currentColor"
            strokeWidth="12"
            d="M18.5 46v-6a6 6 0 0 0-4.243 10.243L18.5 46ZM42 52h104V40H42v12Zm118 14v60h12V66h-12Zm-14 74H62v12h84v-12ZM42 40H18.5v12H42V40Zm6 86V76.127H36V126h12ZM14.257 50.243l18.814 18.813 8.485-8.485-18.813-18.814-8.486 8.486ZM48 76.127a22 22 0 0 0-6.444-15.556l-8.485 8.485A10 10 0 0 1 36 76.127h12ZM62 140c-7.732 0-14-6.268-14-14H36c0 14.359 11.64 26 26 26v-12Zm98-14c0 7.732-6.268 14-14 14v12c14.359 0 26-11.641 26-26h-12Zm-14-74c7.732 0 14 6.268 14 14h12c0-14.36-11.641-26-26-26v12Z"
          />
          <path
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M66 84h76m-76 24h44"
          />
        </svg>
      ),
      label: 'Messages',
    },
    {
      id: 'help',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M12 17h.01M9.09 9a3 3 0 1 1 3.91 3.43c-.75.35-1 1.07-1 1.57v.5"
          />
        </svg>
      ),
      label: 'Help',
    },
  ];

  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.flex-1.overflow-y-auto.p-4.space-y-4');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        className={`fixed bottom-5 right-5 ${
          isOpen
            ? 'bg-white shadow-[2px_5px_32px_0px_#003A2F66]'
            : 'bg-[#00927C] hover:bg-[#007A68] hover:scale-110 transform'
        } text-white p-4 rounded-full focus:outline-none z-[100] flex items-center justify-center w-14 h-14 transition-all duration-200`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#666666]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <path fillRule="evenodd" clipRule="evenodd" d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z" fill="white"/>
          </svg>
        )}
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-12 shadow-lg rounded-xl bg-white ${
            selectedQuestion ? 'w-[90vw] md:w-[700px]' : 'w-[90vw] md:w-[450px]'
          } h-[70vh] max-h-[600px] z-[50] overflow-hidden border border-[#E8E8E8] font-sans`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow p-4 overflow-y-auto">
              {selectedQuestion ? (
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-white border-b border-gray-200">
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow p-4">
                    <h3 className="text-lg font-medium mb-4">Help with: {selectedQuestion}</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          While we work on this section, here are some quick options:
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedQuestion(null);
                          setIsChatOpen(true);
                        }}
                        className="w-full p-3 text-left bg-white border border-[#00927C] rounded-lg hover:bg-[#00927C]/10 transition-colors"
                      >
                        <span className="text-[#00927C] font-medium">Chat with support</span>
                        <p className="text-sm text-gray-500 mt-1">
                          Get immediate assistance from our team
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!isChatOpen && activeTab === 'home' && (
                    <div className="flex flex-col h-full space-y-6 pb-6">
                      {/* Welcome Section */}
                      <div className="mx-6 mt-6 p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 bg-[#00927C]/10 rounded-full flex items-center justify-center">
                            <span className="text-3xl">👋</span>
                          </div>
                          <h3 className="text-lg font-medium text-[#131313] tracking-tight">
                            Welcome{userData?.name ? `, ${userData.name}` : ''}
                          </h3>
                          <p className="text-center text-gray-500 text-xs max-w-xs tracking-tight leading-5">
                            How can we help you today? Choose an option below to get started.
                          </p>
                        </div>
                      </div>

                      {/* Send Message Section */}
                      <div className="mx-auto w-[99%] p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
                        <div className="flex flex-col items-center space-y-4">
                          <button
                            onClick={() => setIsChatOpen(true)}
                            className="w-full py-3 px-6 bg-[#00927C] text-white rounded-xl hover:bg-[#007A68] hover:scale-110 transform transition-all duration-200 text-sm hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                              />
                            </svg>
                            <span>Send us a message</span>
                          </button>
                        </div>
                      </div>

                      {/* Search for Help Section */}
                      <div className="mx-auto w-[99%] p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <button
                              onClick={() => setActiveTab('help')}
                              className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-black hover:bg-[#00927C]/10 hover:text-[#00927C] transition-colors duration-200"
                            >
                              <span>Search for help</span>
                              <svg
                                className="w-5 h-5 text-[#00927C]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-4.35-4.35M16.65 16.65a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Common Questions */}
                          <div className="space-y-3">
                            <ul className="space-y-2">
                              {['Payment issues', 'Account settings', 'Troubleshooting', 'FAQ'].map(
                                (question) => (
                                  <li
                                    key={question}
                                    className="flex justify-between items-center py-2 px-3 rounded-lg transition-colors duration-200 text-black hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setSelectedQuestion(question)}
                                  >
                                    <span className="mr-auto flex-1 text-sm leading-[21px] text-gray-600 transition-colors hover:text-[#00927C]">
                                      {question}
                                    </span>
                                    <svg
                                      className="h-4 w-4 text-gray-400 transition-colors duration-200"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages View */}
                  {!isChatOpen && activeTab === "messages" && (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleTabClick("home")}
                          className="mr-2 text-[#00927C] hover:text-[#007A68]"
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
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                        <h2 className="text-lg font-medium">Messages</h2>
                      </div>
                      <div className="flex-grow overflow-y-auto p-4">
                        {conversationGroups.length > 0 ? (
                          <div className="space-y-2">
                            {conversationGroups.map((group, index) => {
                              const lastMessage = group.messages[group.messages.length - 1];
                              return (
                                <div 
                                  key={index} 
                                  className="flex justify-between items-center py-2 px-3 rounded-lg transition-colors duration-200 text-black hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    const agentConversationIds = group.messages.map(msg => msg.conversationId);
                                    const conversationMessages = messages.filter(msg => 
                                      (msg.senderType === 'agent' && msg.sender === group.agentEmail) ||
                                      (msg.senderType === 'user' && agentConversationIds.includes(msg.conversationId))
                                    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                                    setMessages(conversationMessages);
                                    setIsChatOpen(true);
                                  }}
                                >
                                  <div className="flex flex-col flex-1">
                                    <span className="text-sm font-medium text-[#00927C]">{group.agentEmail}</span>
                                    <span className="text-sm text-gray-600 truncate">{lastMessage.content}</span>
                                  </div>
                                  <svg
                                    className="h-4 w-4 text-gray-400 transition-colors duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 mt-4">
                            No messages yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Help View */}
                  {!isChatOpen && activeTab === "help" && (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleTabClick("home")}
                          className="mr-2 text-[#00927C] hover:text-[#007A68]"
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
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                        <h2 className="text-lg font-medium">Help</h2>
                      </div>
                 
                        <div className="mt-3 relative">
                          <input
                            type="text"
                            placeholder="Search for help"
                            className="w-full pl-3 pr-10 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00927C] transition-colors duration-200"
                          />
                          <svg
                            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00927C]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-4.35-4.35M16.65 16.65a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
                            />
                          </svg>
                        </div>
                
                    </div>
                  )}

                  {/* Chat Interface */}
                  {isChatOpen && (
                    <div className="flex flex-col h-full">
                      <div className="p-3 bg-white">
                        <button
                          onClick={() => setIsChatOpen(false)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                msg.senderType === 'user'
                                  ? 'bg-[#00927C] text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#00927C] text-sm transition-colors duration-200"
                          />
                          <button
                            onClick={() => sendMessage(message)}
                            disabled={!message.trim()}
                            className="p-2 bg-[#00927C] text-white rounded-xl hover:bg-[#007A68] transition-colors disabled:opacity-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
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
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Navigation */}
            {!isChatOpen && activeTab === "home" && (
              <div className="flex justify-around p-3 border-t border-gray-200 bg-white">
                {tabs.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                      activeTab === id
                        ? "text-[#00927C] bg-[#00927C]/10"
                        : "text-[#666666] hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick(id)}
                  >
                    <span className="p-1.5">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
