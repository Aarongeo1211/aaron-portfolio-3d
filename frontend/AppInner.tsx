import React, { useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import FloatingAILogos from './components/FloatingAILogos';

export default function AppInner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <ParticleBackground />
      <FloatingAILogos />
      <div className="relative z-10 h-full">
        <ChatInterface />
      </div>
    </div>
  );
}
