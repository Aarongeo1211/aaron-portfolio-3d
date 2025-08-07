import React from 'react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function Experience() {
  const { data: experienceData, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => backend.portfolio.getExperiences(),
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading experience...</div>
        </div>
      </section>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            My professional journey in software development and AI/ML engineering
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {experienceData?.experiences.map((experience, index) => (
            <div key={experience.id} className="relative mb-12">
              <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 ml-8 md:ml-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {experience.position}
                        </h3>
                        <h4 className="text-lg text-blue-400 font-semibold mb-2">
                          {experience.company}
                        </h4>
                      </div>
                      {experience.company === 'CodezyeCyber' && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                        </span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 rounded-xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Leadership & Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Core Member, Build Club</h4>
                <p className="text-gray-400">
                  Led workshops for 50+ students, mentored 20+ in projects, boosting participation by 40%
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Awards & Recognition</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Cybersecurity Track Winners, Haccverse'25 HACC Hackathon</li>
                  <li>• First Place, Technovanza (2024)</li>
                  <li>• Top 6 Finalist, Intelligent Wheelchair Competition (2024)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
