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

function InteractiveTools() {
  const tools = [
    'React', 'TypeScript', 'Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3',
    'Tailwind CSS', 'Vite', 'Git', 'GitHub', 'Vercel', 'Render',
    'Burp Suite', 'M-Pesa API', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva',
    'REST APIs', 'Linux', 'Networking', 'Web Security'
  ];

  // We duplicate the array to create a seamless infinite scroll loop
  const displayTools = [...tools, ...tools, ...tools];

  return (
    <div className="mb-20 overflow-hidden relative py-6">
      {/* Gradient masks for smooth fade on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
        {displayTools.map((tool, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-3 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default select-none"
          >
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills({ technicalSkills, competencies }: SkillsProps) {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills, Tools & Competencies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            A blend of technical proficiency and soft skills developed through real-world projects and continuous learning.
          </p>
        </div>

        {/* Gamified Marquee */}
        <InteractiveTools />

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
      </div>
    </section>
  );
}
