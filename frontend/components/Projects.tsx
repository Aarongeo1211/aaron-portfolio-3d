import React from 'react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import { Github, ExternalLink, Star, Code, Brain, Shield } from 'lucide-react';

const categoryIcons = {
  'AI/ML': Brain,
  'Cybersecurity': Shield,
  'Web Development': Code,
  'Blockchain': Code,
};

export default function Projects() {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => backend.portfolio.getProjects(),
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </section>
    );
  }

  const featuredProjects = projectsData?.projects.filter(project => project.featured) || [];
  const otherProjects = projectsData?.projects.filter(project => !project.featured) || [];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A showcase of my most impactful projects across AI/ML, cybersecurity, and web development
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => {
            const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons] || Code;
            
            return (
              <div
                key={project.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg mr-4">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm text-blue-400 font-medium">{project.category}</span>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 text-gray-300 hover:text-white"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Other Notable Projects</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => {
                const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons] || Code;
                
                return (
                  <div
                    key={project.id}
                    className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg mr-3">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                        <span className="text-xs text-blue-400">{project.category}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-gray-500 text-xs px-2 py-1">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-all duration-300"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 rounded-xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Innovation & Impact</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Each project represents a solution to real-world problems, combining cutting-edge 
              technology with practical applications. From AI-powered systems to cybersecurity 
              tools, my work focuses on creating meaningful impact through technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
