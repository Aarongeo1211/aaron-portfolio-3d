import React, { useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import FloatingAILogos from './components/FloatingAILogos';

export default function AppInner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <ParticleBackground />
      <FloatingAILogos />
      <Navigation />
      <main>
        <ChatInterface />
      </main>
    </div>
  );
}
