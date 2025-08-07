import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, Github, Linkedin, Mail, Copy, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Full-stack Developer and AI/ML Engineer from Bengaluru, India. He specializes in building secure, high-performance, and user-centric applications. What would you like to know about him?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: (message: string) => backend.portfolio.chat({ message }),
    onSuccess: (response) => {
      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        content: response.response,
        isUser: false,
        timestamp: response.timestamp,
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputMessage);
    setInputMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Message copied to clipboard',
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Full-stack Developer and AI/ML Engineer from Bengaluru, India. He specializes in building secure, high-performance, and user-centric applications. What would you like to know about him?",
        isUser: false,
        timestamp: new Date(),
      }
    ]);
  };

  const quickQuestions = [
    "Tell me about Aaron's experience",
    "What are Aaron's technical skills?",
    "Show me Aaron's projects",
    "What awards has Aaron won?",
    "Tell me about MEDVISION-AI",
    "How can I contact Aaron?",
  ];

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      content: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(question);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AG</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Aaron George Abraham</h1>
                <p className="text-sm text-slate-600">AI Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Aarongeo1211"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aaron-george-abraham-19b952256/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:Aarongeo1211@gmail.com"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={clearChat}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Clear chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            {messages.length === 1 && (
              <div className="px-4 py-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">AG</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Aaron George Abraham</h2>
                  <p className="text-slate-600 mb-1">Full-stack Developer & AI/ML Engineer</p>
                  <p className="text-sm text-slate-500">CGPA: 8.23 | B.Tech CSE, Presidency University</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                      🏆 Cybersecurity Track Winner - Haccverse'25
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                      🥇 First Place - Technovanza 2024
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                      🎯 95%+ AI Accuracy in Banking KYC
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick questions to get started:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="p-4 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                      >
                        <span className="text-slate-700">{question}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-0">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`group ${message.isUser ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100`}
                >
                  <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser 
                            ? 'bg-slate-600' 
                            : 'bg-gradient-to-r from-slate-500 to-slate-700'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-slate-900">
                            {message.isUser ? 'You' : 'Aaron\'s AI Assistant'}
                          </span>
                          <span className="text-xs text-slate-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                        
                        {!message.isUser && (
                          <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors"
                              title="Copy message"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {chatMutation.isPending && (
                <div className="bg-slate-50 border-b border-slate-100">
                  <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-slate-900">Aaron's AI Assistant</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="relative">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about Aaron..."
                  className="min-h-[44px] max-h-[200px] resize-none border-slate-300 focus:border-slate-500 focus:ring-slate-500 pr-12"
                  disabled={chatMutation.isPending}
                  rows={1}
                />
                <Button
                  type="submit"
                  disabled={chatMutation.isPending || !inputMessage.trim()}
                  className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-slate-500">
              Aaron's AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
