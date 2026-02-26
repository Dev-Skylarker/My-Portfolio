import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Tool {
  name: string;
  category: string;
  icon: string;
}

interface SkillsProps {
  technicalSkills: SkillCategory[];
  competencies: Array<{ category: string; skills: string[] }>;
  tools: Tool[];
}

const TOOL_CATEGORIES = ['All', 'Development', 'Frontend', 'Backend', 'Security', 'Design', 'Productivity'];

const categoryColors: Record<string, string> = {
  Development: 'from-blue-500 to-indigo-500',
  Frontend: 'from-cyan-500 to-blue-500',
  Backend: 'from-violet-500 to-purple-500',
  Security: 'from-red-500 to-rose-500',
  Design: 'from-pink-500 to-fuchsia-500',
  Productivity: 'from-green-500 to-emerald-500',
};

const categoryBg: Record<string, string> = {
  Development: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500',
  Frontend: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400',
  Backend: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 hover:border-violet-400',
  Security: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-400',
  Design: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 hover:border-pink-400',
  Productivity: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400',
};

function SkillBar({ name, level }: { name: string; level: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getBarColor = (level: number) => {
    if (level >= 85) return 'from-blue-500 to-indigo-500';
    if (level >= 70) return 'from-indigo-500 to-violet-500';
    return 'from-violet-500 to-purple-500';
  };

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getBarColor(level)} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const gradientClass = categoryColors[tool.category] || 'from-gray-500 to-gray-600';
  const bgClass = categoryBg[tool.category] || 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';

  return (
    <div
      className={`group relative flex-shrink-0 w-28 cursor-pointer select-none`}
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`relative h-28 rounded-2xl border-2 transition-all duration-300 ${bgClass} hover:scale-105 hover:shadow-lg overflow-hidden`}>
        {/* Front */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 transition-all duration-300 ${flipped ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <span className="text-3xl">{tool.icon}</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight">{tool.name}</span>
        </div>
        {/* Back — category badge */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2 bg-gradient-to-br ${gradientClass} transition-all duration-300 ${flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <span className="text-2xl">{tool.icon}</span>
          <span className="text-xs font-bold text-white text-center leading-tight">{tool.category}</span>
          <div className="w-8 h-0.5 bg-white/40 rounded-full" />
          <span className="text-[10px] text-white/80 text-center">{tool.name}</span>
        </div>
      </div>
    </div>
  );
}

export function Skills({ technicalSkills, competencies, tools }: SkillsProps) {
  const [activeToolCategory, setActiveToolCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filteredTools = activeToolCategory === 'All'
    ? tools
    : tools.filter(t => t.category === activeToolCategory);

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const stopDrag = () => setIsDragging(false);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Competencies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            A blend of technical proficiency and soft skills developed through real-world projects and continuous learning.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm">⚡</span>
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {technicalSkills.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <SkillBar key={i} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === TOOLS SECTION — Interactive drag-scroll carousel === */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-sm">🔧</span>
            Tools & Technologies
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 ml-11">
            Click a card to flip it · drag to scroll →
          </p>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TOOL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveToolCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${activeToolCategory === cat
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-violet-400'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Drag-scrollable tool card track */}
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

            <div
              ref={scrollRef}
              className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} />
              ))}
            </div>
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center mt-2">
            {filteredTools.length} tools · tap to reveal category
          </p>
        </div>

        {/* Core Competencies */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-sm">🎯</span>
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {competencies.map((competency, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                  {competency.category}
                </h4>
                <ul className="space-y-2.5">
                  {competency.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
