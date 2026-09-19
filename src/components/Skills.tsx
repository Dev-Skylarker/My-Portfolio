import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

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
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        } else {
          setAnimated(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={ref} className="group/bar">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold font-['Space_Grotesk'] text-gray-950 dark:text-[#EDEDE8] group-hover/bar:text-[#658B12] dark:group-hover/bar:text-[#B7E33B] transition-colors">{name}</span>
        <span className="text-sm font-bold font-['Space_Grotesk'] text-[#658B12] dark:text-[#B7E33B] tracking-tight">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 via-[#658B12] to-[#84ab1b] dark:from-emerald-600 dark:via-emerald-500 dark:to-[#B7E33B] rounded-full transition-all duration-1000 ease-out group-hover/bar:brightness-110"
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
    'Generative AI', 'Prompt Engineering', 'Foundation Models', 'Burp Suite',
    'Cyber Threat Intelligence', 'Incident Response', 'Cryptography', 'SDLC',
    'M-Pesa API', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva',
    'REST APIs', 'Linux', 'Networking', 'Web Security'
  ];

  const displayTools = [...tools, ...tools, ...tools];

  return (
    <div className="mb-12 sm:mb-20 overflow-hidden relative py-2 sm:py-4">
      {/* Gradient edge masks */}
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#F8F9F5] dark:from-[#0D0F0C] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#F8F9F5] dark:from-[#0D0F0C] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
        {displayTools.map((tool, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-1.5 sm:mx-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] text-gray-900 dark:text-[#EDEDE8] font-['IBM_Plex_Mono'] font-medium text-[11px] sm:text-xs hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] transition-all cursor-default select-none shadow-sm"
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
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-['Space_Grotesk'] text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
              Skills, Tools &amp; Competencies
            </h2>
            <p className="text-gray-700 dark:text-[#8F9489] max-w-xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              A blend of technical proficiency and soft skills developed through real-world projects and continuous learning.
            </p>
          </div>
        </ScrollReveal>

        {/* Marquee */}
        <ScrollReveal direction="up" delay={100}>
          <InteractiveTools />
        </ScrollReveal>

        {/* Technical Skills */}
        <div className="mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={150}>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-white/95 dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] text-xs sm:text-sm shadow-sm">
                ⚡
              </span>
              Technical Skills
            </h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {technicalSkills.map((category, index) => (
              <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#658B12] dark:group-hover:bg-[#B7E33B] transition-colors duration-300" />
                  <h4 className="text-[11px] sm:text-xs font-semibold font-['IBM_Plex_Mono'] text-[#658B12] dark:text-[#B7E33B] uppercase tracking-wider mb-4 sm:mb-5">
                    {category.category}
                  </h4>
                  <div className="space-y-3.5 sm:space-y-4">
                    {category.skills.map((skill, i) => (
                      <SkillBar key={i} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div>
          <ScrollReveal direction="up" delay={150}>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-white/95 dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] text-xs sm:text-sm shadow-sm">
                🎯
              </span>
              Core Competencies
            </h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {competencies.map((competency, index) => (
              <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#658B12] dark:group-hover:bg-[#B7E33B] transition-colors duration-300" />
                  <h4 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4 group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors">
                    {competency.category}
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {competency.skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-[#8F9489]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#658B12] dark:bg-[#B7E33B] flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
