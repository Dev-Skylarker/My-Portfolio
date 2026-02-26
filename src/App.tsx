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
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 animate-gradient" />

      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        sections={sections}
      />

      <main>
        <Hero profile={cvData.profile} onViewCV={handleViewCV} />
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

      <Footer softSkills={cvData.softSkills} email={cvData.profile.email} githubUrl="https://github.com/Dev-Skylarker" />

      <FloatingActions
        onDownloadCV={handleDownloadCV}
        phone={cvData.profile.phone}
        name={cvData.profile.name}
      />
    </div>
  );
}

export default App;
