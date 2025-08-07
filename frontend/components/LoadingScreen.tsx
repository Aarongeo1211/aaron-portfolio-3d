import React from 'react';
import { Bot } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Aaron George Abraham
          </h2>
          <p className="text-gray-400 mt-1 animate-pulse">Initializing AI Assistant...</p>
        </div>
      </div>
    </div>
  );
}
