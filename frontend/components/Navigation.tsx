import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
            >
              Aaron George Abraham
            </button>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="flex items-center text-slate-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">Ask me anything about Aaron</span>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-b border-slate-200">
            <div className="flex items-center text-slate-600 px-3 py-2">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Ask me anything about Aaron</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
