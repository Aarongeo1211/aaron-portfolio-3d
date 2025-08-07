import React from 'react';
import { Award, Users, TrendingUp, Target } from 'lucide-react';

export default function About() {
  const achievements = [
    {
      icon: Award,
      title: 'Award Winner',
      description: 'Cybersecurity Track Winners at Haccverse\'25 HACC Hackathon',
    },
    {
      icon: Users,
      title: 'Team Leader',
      description: 'Led workshops for 50+ students, mentored 20+ in projects',
    },
    {
      icon: TrendingUp,
      title: 'Performance Boost',
      description: 'Improved system efficiency by 40% and reduced false positives by 30%',
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Built facial matching systems with 95%+ accuracy for banking clients',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Software Developer and AI/ML Engineer with a strong foundation in 
              computer science and a drive for innovation. Currently pursuing my B.Tech in Computer 
              Science Engineering at Presidency University, Bengaluru, with a CGPA of 8.23.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spans across multiple domains including artificial intelligence, machine 
              learning, cybersecurity, and full-stack web development. I've successfully delivered 
              production-ready systems that have significantly improved operational efficiency and 
              reduced processing times for various clients.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              As a Co-Founder of Fenox Digital Marketing and a freelance developer, I've gained 
              valuable experience in leading technical teams, architecting scalable solutions, 
              and delivering high-quality software products that meet real-world business needs.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-4 py-2 rounded-full border border-blue-500/30">
                <span className="text-blue-400 font-medium">CGPA: 8.23</span>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <span className="text-green-400 font-medium">95%+ AI Accuracy</span>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                <span className="text-purple-400 font-medium">40% Efficiency Boost</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg">
                    <achievement.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
