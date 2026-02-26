import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Globe } from 'lucide-react';

interface Project {
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  role: string;
  challenges: string;
  impact: string;
  status: string;
  links: {
    demo: string | null;
    repo: string | null;
    catalog?: string | null;
  };
}

interface ProjectsProps {
  projects: Project[];
}

// Employer-friendly categories — maps readable labels to matching tool keywords
const CATEGORIES = [
  { label: 'All', match: () => true },
  { label: 'Web Apps', match: (tools: string[]) => tools.some(t => ['React', 'TypeScript', 'Vite', 'Vercel'].includes(t)) },
  { label: 'Backend & APIs', match: (tools: string[]) => tools.some(t => ['Python', 'Flask', 'M-Pesa API', 'Render'].includes(t)) },
  { label: 'Frontend', match: (tools: string[]) => tools.some(t => ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'].includes(t)) },
  { label: 'Security', match: (tools: string[]) => tools.some(t => ['Burp Suite', 'Vulnerability Testing', 'Web Security Principles'].includes(t)) },
  { label: 'Design', match: (tools: string[]) => tools.some(t => ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'].includes(t)) },
];

const statusConfig: Record<string, { color: string; dot: string }> = {
  Live: {
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
    dot: 'bg-green-500',
  },
  Completed: {
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
};

export function Projects({ projects }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredProjects = projects.filter(p => CATEGORIES[activeCategory].match(p.tools));

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Real-world solutions — from gamified web apps and payment integrations to security audits and branding.
          </p>
        </div>

        {/* Category tabs — employer-friendly, no tech jargon overload */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${activeCategory === i
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
              {cat.label}
              {/* badge count */}
              {i !== 0 && (
                <span className={`ml-2 text-xs rounded-full px-1.5 py-0.5 ${activeCategory === i ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                  {projects.filter(p => cat.match(p.tools)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid gap-6">
          {filteredProjects.map((project, index) => {
            const cfg = statusConfig[project.status] || statusConfig['Completed'];
            const isExpanded = expandedProject === index;

            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${project.status === 'Live' ? 'animate-pulse' : ''}`} />
                          {project.status}
                        </span>
                        {project.status === 'Live' && project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:scale-105"
                          >
                            <Globe size={11} />
                            View Live
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {project.role}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : index)}
                      className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.solution}
                  </p>

                  {/* Tool badges — compact */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4 animate-fade-in">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Problem</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.problem}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Challenges</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.challenges}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Impact</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.impact}</p>
                      </div>
                      {(project.links.demo || project.links.repo || project.links.catalog) && (
                        <div className="flex gap-3 pt-2">
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-600/20 hover:scale-105"
                            >
                              <ExternalLink size={15} />
                              Visit Live Site
                            </a>
                          )}
                          {project.links.catalog && (
                            <a
                              href={project.links.catalog}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-600/20 hover:scale-105"
                            >
                              <ExternalLink size={15} />
                              View Brand Catalogue
                            </a>
                          )}
                          {project.links.repo && (
                            <a
                              href={project.links.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all hover:scale-105"
                            >
                              <Github size={15} />
                              Repository
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 font-medium">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
