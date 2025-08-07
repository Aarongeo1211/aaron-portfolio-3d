import React from 'react';
import { Bot } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-slate-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-slate-600 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center animate-pulse">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Aaron George Abraham
          </h2>
          <p className="text-slate-600 mt-2 animate-pulse">Initializing AI Assistant...</p>
        </div>
      </div>
    </div>
  );
}
