import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

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
      content: "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Software Developer and AI/ML Engineer from Bengaluru, India. What would you like to know about him?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  };

  const quickQuestions = [
    "Tell me about Aaron's experience",
    "What are Aaron's technical skills?",
    "Show me Aaron's projects",
    "What awards has Aaron won?",
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
    <div className="min-h-screen pt-16 relative z-10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">AG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Aaron George Abraham</h1>
                <p className="text-slate-600">Software Developer & AI/ML Engineer</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 9972038886</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>aarongeo1211@gmail.com</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://github.com/Aarongeo1211"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 text-slate-700" />
              </a>
              <a
                href="https://linkedin.com/in/aaron-george-abraham-19b952256/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-slate-700" />
              </a>
              <a
                href="mailto:aarongeo1211@gmail.com"
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5 text-slate-700" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Questions */}
        <div className="mb-6">
          <p className="text-sm text-slate-600 mb-3">Quick questions you can ask:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-all duration-300 hover:scale-105"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.isUser ? 'ml-3' : 'mr-3'}`}>
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
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-slate-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="mr-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about Aaron..."
            className="flex-1 bg-white border-slate-300 focus:border-slate-500 focus:ring-slate-500"
            disabled={chatMutation.isPending}
          />
          <Button
            type="submit"
            disabled={chatMutation.isPending || !inputMessage.trim()}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 Aaron George Abraham. Built with React, TypeScript, and Encore.ts
          </p>
        </div>
      </div>
    </div>
  );
}
