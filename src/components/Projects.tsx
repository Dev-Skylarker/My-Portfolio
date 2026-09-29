import { useState } from 'react';
import { Maximize2, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ProjectModal, type Project } from './ProjectModal';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const filteredProjects = projects.filter(p => CATEGORIES[activeCategory].match(p.tools));

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
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
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans transition-all duration-200 flex items-center gap-1.5 sm:gap-2 shadow-sm hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0085FF] text-white dark:bg-[#168FFF] dark:text-white shadow-md shadow-[#0085FF]/25'
                      : 'bg-white dark:bg-[#111827] text-slate-800 dark:text-[#A3CDFF] border border-slate-200 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] hover:text-[#0085FF] dark:hover:text-[#389BFF] shadow-sm shadow-slate-200/90 dark:shadow-none'
                  }`}
                >
                  <span>{cat.label}</span>
                  {i !== 0 && (
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono rounded-full px-2 py-0.5 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-[#0B0F17] text-slate-700 dark:text-[#94A3B8]'
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

        {/* Projects Grid: 3 columns on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredProjects.map((project, index) => {
            const isLive = project.status.toLowerCase().includes('live') || project.status.toLowerCase().includes('active');
            const hasImageError = failedImages.has(project.title);

            return (
              <ScrollReveal key={index} direction="up" delay={Math.min(index * 60, 360)}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white dark:bg-[#111827]/95 rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/70 dark:hover:border-[#389BFF]/70 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-4px_rgba(0,133,255,0.18)] dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(22,143,255,0.15)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer select-none"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#0085FF] dark:group-hover:bg-[#389BFF] transition-colors duration-300 z-20" />

                  {/* 1. Preview Image or Tech Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#0B0F17] border-b border-slate-200/80 dark:border-slate-800">
                    {project.image && !hasImageError ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={() => setFailedImages(prev => new Set(prev).add(project.title))}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0085FF]/10 via-transparent to-sky-500/10 dark:from-[#168FFF]/15 dark:to-blue-500/5 p-6">
                        <div className="w-10 h-10 rounded-xl bg-[#0085FF]/10 dark:bg-[#168FFF]/15 border border-[#0085FF]/20 dark:border-[#168FFF]/25 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Layers size={20} />
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay for visual polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                    {/* Floating Status Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-mono font-semibold shadow-md backdrop-blur-md ${
                          isLive
                            ? 'bg-[#0085FF] text-white dark:bg-[#389BFF] dark:text-[#0B0F17]'
                            : 'bg-slate-900/85 text-slate-200 border border-slate-700/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isLive ? 'bg-white dark:bg-[#0B0F17] animate-pulse' : 'bg-slate-400'
                          }`}
                        />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* 2. Card Content */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans text-sm sm:text-base font-bold tracking-tight text-slate-950 dark:text-[#EDEDE8] group-hover:text-[#0085FF] dark:group-hover:text-[#389BFF] transition-colors line-clamp-1 mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-slate-700 dark:text-[#94A3B8] text-xs leading-relaxed line-clamp-2">
                        {project.solution}
                      </p>
                    </div>

                    {/* Bottom Footer: Skills on the left, Expand icon opposite on the right */}
                    <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        {project.tools.slice(0, 3).map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium font-mono bg-slate-100 dark:bg-[#0B0F17] text-slate-800 dark:text-[#E2E8F0] border border-slate-200 dark:border-slate-800 truncate max-w-[120px]"
                          >
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-mono text-slate-500 dark:text-[#94A3B8] shrink-0">
                            +{project.tools.length - 3}
                          </span>
                        )}
                      </div>

                      <span
                        className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1A2234] group-hover:bg-[#0085FF] dark:group-hover:bg-[#168FFF] text-slate-600 dark:text-[#A3CDFF] group-hover:text-white dark:group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm shadow-slate-200/90 group-hover:shadow-md group-hover:shadow-[#0085FF]/30 shrink-0"
                        title="View details"
                        aria-label="View details"
                      >
                        <Maximize2 size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-[#8F9489] font-medium font-mono text-sm">
              // No projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Scrollable Popup Modal for Project Details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

