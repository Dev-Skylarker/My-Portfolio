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

  const handleViewCV = () => {
    window.open('/Maina Eric  CV.pdf', '_blank');
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Maina Eric  CV.pdf';
    link.download = 'Maina_Eric_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8F9F5] dark:bg-[#0D0F0C] text-gray-950 dark:text-[#EDEDE8] font-sans selection:bg-[#B7E33B] selection:text-[#0D0F0C] transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#658B12] dark:bg-[#B7E33B] z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Ambient Canvas Background System */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500">
        {/* Base Canvas Gradient */}
        <div className="absolute inset-0 bg-[#F8F9F5] dark:bg-[#0D0F0C]" />

        {/* Architectural Dot Matrix Grid */}
        <div className="absolute inset-0 bg-dot-matrix opacity-70 dark:opacity-40" />

        {/* Atmospheric Floating Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#658B12]/8 dark:bg-[#B7E33B]/10 blur-[130px] animate-pulse-slow pointer-events-none" />
        <div className="absolute top-1/3 -right-28 w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-600/8 blur-[150px] animate-float-slow pointer-events-none" />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/6 dark:bg-emerald-500/8 blur-[140px] pointer-events-none" />

        {/* Subtle Edge Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,249,245,0.6)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,15,12,0.7)_100%)]" />
      </div>

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

      <Footer softSkills={cvData.softSkills} githubUrl="https://github.com/Dev-Skylarker" />

      <FloatingActions
        onViewCV={handleViewCV}
        phone={cvData.profile.phone}
        name={cvData.profile.name}
      />
    </div>
  );
}

export default App;
