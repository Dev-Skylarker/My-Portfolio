import { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Layers, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export interface Project {
  title: string;
  image?: string | null;
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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  // Close on Escape key and prevent background body scroll
  useEffect(() => {
    if (!project) return;

    setImageError(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isLive = project.status.toLowerCase().includes('live') || project.status.toLowerCase().includes('active');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in cursor-pointer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-sm transition-opacity pointer-events-none"
      />

      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="cursor-default relative w-full max-w-2xl lg:max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/30 overflow-hidden z-10 animate-fade-in-up"
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 dark:bg-[#1E293B]/90 hover:bg-slate-100 dark:hover:bg-[#334155] text-slate-700 dark:text-[#A3CDFF] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Project Header Image or Tech Banner */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-72 overflow-hidden bg-slate-100 dark:bg-[#0B0F17]">
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0085FF]/15 via-transparent to-sky-500/10 dark:from-[#168FFF]/15 dark:to-blue-500/5 p-6">
                <div className="w-14 h-14 rounded-2xl bg-[#0085FF]/10 dark:bg-[#168FFF]/15 border border-[#0085FF]/20 dark:border-[#168FFF]/25 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] mb-2 shadow-sm">
                  <Layers size={28} />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#0085FF] dark:text-[#389BFF] font-semibold">
                  {project.role}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0F172A] via-transparent to-black/25 pointer-events-none" />

            {/* Status Pill on Image Header */}
            <div className="absolute bottom-3 left-4 sm:left-6 flex items-center gap-2 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold shadow-sm backdrop-blur-md ${
                  isLive
                    ? 'bg-[#0085FF] text-white dark:bg-[#389BFF] dark:text-[#0B0F17]'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-700'
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

          {/* Modal Body */}
          <div className="p-5 sm:p-7 md:p-8 space-y-6">
            {/* Title & Role */}
            <div>
              <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0085FF] dark:text-[#389BFF] mb-1">
                {project.role}
              </p>
              <h3
                id="modal-project-title"
                className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-[#EDEDE8] leading-tight"
              >
                {project.title}
              </h3>
            </div>

            {/* Overview / Solution */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-[#7A8074] mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#0085FF] dark:text-[#389BFF]" />
                <span>Overview & Solution</span>
              </h4>
              <p className="text-sm sm:text-base text-slate-800 dark:text-[#C5CBC0] leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Problem & Challenges Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="bg-slate-50 dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm shadow-slate-100">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#8F9489] mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" />
                  <span>Problem</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-[#EDEDE8] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm shadow-slate-100">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#8F9489] mb-2 flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-500" />
                  <span>Key Challenges</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-[#EDEDE8] leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-blue-50/70 dark:bg-[#111827] border border-blue-200 dark:border-[#389BFF]/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm shadow-blue-100/50">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0085FF] dark:text-[#389BFF] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#0085FF] dark:text-[#389BFF]" />
                <span>Results & Impact</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-900 dark:text-[#EDEDE8] leading-relaxed">
                {project.impact}
              </p>
            </div>

            {/* Key Technologies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-[#7A8074] mb-2.5">
                Key Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-[#111827] text-slate-800 dark:text-[#EDEDE8] border border-slate-200 dark:border-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions / Links Footer */}
            {(project.links.demo || project.links.catalog || project.links.repo) && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[#0085FF] hover:bg-[#006ACC] text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white rounded-full text-xs font-bold uppercase tracking-wider font-sans transition-all duration-200 shadow-md shadow-[#0085FF]/25 dark:shadow-[#168FFF]/30 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <ExternalLink size={14} />
                    <span>Visit Live Site</span>
                  </a>
                )}
                {project.links.catalog && (
                  <a
                    href={project.links.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[#0085FF] hover:bg-[#006ACC] text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white rounded-full text-xs font-bold uppercase tracking-wider font-sans transition-all duration-200 shadow-md shadow-[#0085FF]/25 dark:shadow-[#168FFF]/30 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <ExternalLink size={14} />
                    <span>View Brand Catalogue</span>
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0085FF] text-slate-900 dark:bg-[#111827] dark:hover:bg-[#1E293B] dark:border-slate-800 dark:hover:border-[#389BFF] dark:text-[#EDEDE8] rounded-full text-xs font-bold uppercase tracking-wider font-sans transition-all duration-200 shadow-sm shadow-slate-200 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <Github size={14} />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
