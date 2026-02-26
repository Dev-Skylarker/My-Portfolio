import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsProps {
  technicalSkills: SkillCategory[];
  competencies: Array<{
    category: string;
    skills: string[];
  }>;
  tools?: string[];
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
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

export function Skills({ technicalSkills, competencies, tools }: SkillsProps) {
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
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {technicalSkills.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
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
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

        {/* Tools Marquee */}
        {tools && tools.length > 0 && (
          <div className="mt-20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm">🛠️</span>
              Technologies & Tools
            </h3>
            <div className="relative flex overflow-hidden group py-4 -my-4">
              {/* Fade gradients */}
              <div className="absolute pt-4 left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50/80 via-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute pt-4 right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

              <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused] gap-4">
                {/* Triple the array for smooth ultra-wide screens continuous loop */}
                {[...tools, ...tools, ...tools].map((tool, i) => (
                  <div
                    key={i}
                    className="whitespace-nowrap px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition-all hover:scale-110 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:text-blue-600 dark:hover:text-blue-400 cursor-default"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
