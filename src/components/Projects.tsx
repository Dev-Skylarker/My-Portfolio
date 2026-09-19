import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

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

const CATEGORIES = [
  { label: 'All', match: () => true },
  { label: 'Web Apps', match: (tools: string[]) => tools.some(t => ['React', 'TypeScript', 'Vite', 'Vercel', 'PWA'].includes(t)) },
  { label: 'Backend & APIs', match: (tools: string[]) => tools.some(t => ['Python', 'Flask', 'M-Pesa API', 'Render'].includes(t)) },
  { label: 'Frontend', match: (tools: string[]) => tools.some(t => ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'].includes(t)) },
  { label: 'Security', match: (tools: string[]) => tools.some(t => ['Burp Suite', 'Vulnerability Testing', 'Web Security Principles'].includes(t)) },
  { label: 'Design', match: (tools: string[]) => tools.some(t => ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'].includes(t)) },
];

export function Projects({ projects }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredProjects = projects.filter(p => CATEGORIES[activeCategory].match(p.tools));

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-['Space_Grotesk'] text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-700 dark:text-[#8F9489] max-w-xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              Real-world solutions — from gamified web apps and payment integrations to security audits and branding.
            </p>
          </div>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
            {CATEGORIES.map((cat, i) => {
              const count = projects.filter(p => cat.match(p.tools)).length;
              const isActive = activeCategory === i;

              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-[4px] text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-['Space_Grotesk'] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 shadow-sm hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] font-bold shadow-md'
                      : 'bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm text-gray-800 dark:text-[#8F9489] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-gray-950 dark:hover:text-[#EDEDE8]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {i !== 0 && (
                    <span
                      className={`text-[10px] sm:text-[11px] font-['IBM_Plex_Mono'] rounded-[4px] px-1.5 py-0.2 ${
                        isActive
                          ? 'bg-white/20 dark:bg-[#0D0F0C]/20 text-white dark:text-[#0D0F0C]'
                          : 'bg-gray-100 dark:bg-[#0D0F0C] text-gray-700 dark:text-[#8F9489]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === index;
            const isLive = project.status.toLowerCase().includes('live') || project.status.toLowerCase().includes('active');

            return (
              <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 400)}>
                <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                  {/* Accent hover line at top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#658B12] dark:group-hover:bg-[#B7E33B] transition-colors duration-300" />

                  <div className="p-4 xs:p-5 sm:p-7">
                    <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2.5 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                          <h3 className="font-['Space_Grotesk'] text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] break-words">
                            {project.title}
                          </h3>

                          {/* Status badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] sm:text-xs font-['IBM_Plex_Mono'] font-medium ${
                              isLive
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-[#B7E33B]/10 dark:text-[#B7E33B] dark:border-[#B7E33B]/30'
                                : 'bg-gray-100 text-gray-700 border border-gray-300 dark:bg-[#0D0F0C] dark:text-[#8F9489] dark:border-[#22261E]'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isLive ? 'bg-emerald-600 dark:bg-[#B7E33B] animate-pulse' : 'bg-gray-500'
                              }`}
                            />
                            {project.status}
                          </span>

                          {isLive && project.links.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[4px] text-[11px] sm:text-xs font-semibold font-['Space_Grotesk'] bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] transition-colors shadow-sm"
                            >
                              <Globe size={12} />
                              <span>View Live</span>
                            </a>
                          )}
                        </div>

                        <p className="font-['IBM_Plex_Mono'] text-xs font-medium text-[#658B12] dark:text-[#B7E33B]">
                          {project.role}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedProject(isExpanded ? null : index)}
                        className="flex-shrink-0 p-1.5 sm:p-2 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] text-gray-700 dark:text-[#8F9489] hover:text-gray-950 dark:hover:text-[#EDEDE8] transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>

                    <p className="text-gray-700 dark:text-[#8F9489] mb-4 sm:mb-5 text-xs xs:text-sm leading-relaxed">
                      {project.solution}
                    </p>

                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[4px] text-[11px] sm:text-xs font-medium font-['IBM_Plex_Mono'] bg-gray-100/90 dark:bg-[#0D0F0C] text-gray-800 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:scale-105 transition-all duration-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200 dark:border-[#22261E] space-y-3.5 sm:space-y-4 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-gray-50 dark:bg-[#0D0F0C] border border-gray-200 dark:border-[#22261E] rounded-xl p-3.5 sm:p-4">
                            <h4 className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8F9489] mb-1.5 sm:mb-2">
                              Problem
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-900 dark:text-[#EDEDE8] leading-relaxed">{project.problem}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-[#0D0F0C] border border-gray-200 dark:border-[#22261E] rounded-xl p-3.5 sm:p-4">
                            <h4 className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8F9489] mb-1.5 sm:mb-2">
                              Challenges
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-900 dark:text-[#EDEDE8] leading-relaxed">{project.challenges}</p>
                          </div>
                        </div>

                        <div className="bg-emerald-50/60 dark:bg-[#0D0F0C] border border-emerald-300 dark:border-[#B7E33B]/30 rounded-xl p-3.5 sm:p-4">
                          <h4 className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#658B12] dark:text-[#B7E33B] mb-1.5 sm:mb-2">
                            Impact
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-900 dark:text-[#EDEDE8] leading-relaxed">{project.impact}</p>
                        </div>

                        {(project.links.demo || project.links.repo || project.links.catalog) && (
                          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
                            {project.links.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full xs:w-auto justify-center flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] rounded-[4px] text-xs sm:text-sm font-semibold font-['Space_Grotesk'] transition-all shadow-sm"
                              >
                                <ExternalLink size={15} />
                                <span>Visit Live Site</span>
                              </a>
                            )}
                            {project.links.catalog && (
                              <a
                                href={project.links.catalog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full xs:w-auto justify-center flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] rounded-[4px] text-xs sm:text-sm font-semibold font-['Space_Grotesk'] transition-all shadow-sm"
                              >
                                <ExternalLink size={15} />
                                <span>View Brand Catalogue</span>
                              </a>
                            )}
                            {project.links.repo && (
                              <a
                                href={project.links.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full xs:w-auto justify-center flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#0D0F0C] dark:hover:bg-[#1c2019] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] rounded-[4px] text-xs sm:text-sm font-semibold font-['Space_Grotesk'] transition-all shadow-sm"
                              >
                                <Github size={15} />
                                <span>Repository</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-[#8F9489] font-medium font-['IBM_Plex_Mono'] text-sm">
              // No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
