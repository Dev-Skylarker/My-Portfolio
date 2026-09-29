import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InteractiveBackground } from './components/InteractiveBackground';
import cvData from './data/cv-data.json';

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(sections.map(s => s.id));
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Maina Eric  CV.pdf';
    link.download = 'Maina_Eric_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-950 dark:text-[#EDEDE8] font-sans selection:bg-[#0085FF] selection:text-white dark:selection:bg-[#389BFF] dark:selection:text-[#0B0F17] transition-colors duration-300">
      {/* Scroll Progress Bar with Glowing Blue Accent */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#0085FF] dark:bg-[#389BFF] z-[60] transition-all duration-75 shadow-[0_0_10px_rgba(0,133,255,0.7)] dark:shadow-[0_0_12px_rgba(56,155,255,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Ambient Canvas Background System */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500">
        {/* Base Canvas Gradient */}
        <div className="absolute inset-0 bg-[#F8FAFC] dark:bg-[#0B0F17]" />

        {/* Architectural Dot Matrix Grid */}
        <div className="absolute inset-0 bg-dot-matrix opacity-70 dark:opacity-40" />

        {/* Atmospheric Floating Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#0085FF]/8 dark:bg-[#168FFF]/12 blur-[130px] animate-pulse-slow pointer-events-none" />
        <div className="absolute top-1/3 -right-28 w-[600px] h-[600px] rounded-full bg-sky-400/8 dark:bg-blue-600/10 blur-[150px] animate-float-slow pointer-events-none" />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/6 dark:bg-indigo-600/8 blur-[140px] pointer-events-none" />

        {/* Subtle Edge Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,250,252,0.6)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,15,23,0.7)_100%)]" />
      </div>

      {/* Interactive Mouse-Tracking & Autonomous Ambient Aura Effect */}
      <InteractiveBackground />

      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        sections={sections}
      />

      <main>
        <Hero profile={cvData.profile} onDownloadCV={handleDownloadCV} />
        <Projects projects={cvData.projects} />
        <Skills
          technicalSkills={cvData.technicalSkills}
          competencies={cvData.competencies}
        />
        <Timeline
          experience={cvData.experience}
          education={cvData.education}
          certifications={cvData.certifications}
        />
        <Contact profile={cvData.profile} />
      </main>

      <Footer githubUrl="https://github.com/Dev-Skylarker" />

      <FloatingActions
        phone={cvData.profile.phone}
        name={cvData.profile.name}
      />
    </div>
  );
}

export default App;
