import React from 'react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import { Code, Database, Cloud, Brain, Shield, Wrench } from 'lucide-react';

const categoryIcons = {
  Languages: Code,
  Frontend: Code,
  Backend: Database,
  'AI/ML': Brain,
  Cloud: Cloud,
  Database: Database,
  DevOps: Wrench,
  Cybersecurity: Shield,
};

export default function Skills() {
  const { data: skillsData, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => backend.portfolio.getSkills(),
  });

  if (isLoading) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading skills...</div>
        </div>
      </section>
    );
  }

  const skillsByCategory = skillsData?.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData.skills>) || {};

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across various domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, skills]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
            
            return (
              <div
                key={category}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg mr-4">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>

                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-blue-400 text-sm">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 rounded-xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to continuous learning and staying 
              updated with the latest trends, frameworks, and best practices in software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
