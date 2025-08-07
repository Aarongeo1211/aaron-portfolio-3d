import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Software Developer',
    'AI/ML Engineer',
    'Full Stack Developer',
    'Cybersecurity Expert',
    'Tech Innovator'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center z-10">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold">
                AG
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Aaron George Abraham
          </span>
        </h1>

        <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 h-12">
          <span className="text-blue-400">{text}</span>
          <span className="animate-pulse">|</span>
        </div>

        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          Passionate Software Developer and AI/ML Engineer with expertise in computer vision, 
          web development, and cybersecurity. Building production-ready systems that improve 
          efficiency and drive innovation.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400">
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

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com/aarongeo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <Github className="w-6 h-6 group-hover:text-blue-400" />
          </a>
          <a
            href="https://linkedin.com/in/aarongeo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <Linkedin className="w-6 h-6 group-hover:text-blue-400" />
          </a>
          <a
            href="mailto:aarongeo1211@gmail.com"
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <Mail className="w-6 h-6 group-hover:text-blue-400" />
          </a>
        </div>

        <button
          onClick={scrollToAbout}
          className="animate-bounce p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300"
        >
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
