import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Theme } from '../hooks/useTheme';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
  activeSection: string;
  sections: Array<{ id: string; label: string }>;
}

export function Navigation({ theme, toggleTheme, activeSection, sections }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleHomeClick = () => {
    scrollToSection('profile');
    window.dispatchEvent(new Event('triggerNameAnimation'));
  };

  const currentSectionLabel = sections.find(s => s.id === activeSection)?.label || '';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 shadow-md shadow-slate-200/70 dark:shadow-black/50'
            : 'bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand / Home link */}
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
              aria-label="Maina Eric - Home"
            >
              <span className="text-lg sm:text-xl font-bold sm:font-extrabold font-sans tracking-tight text-slate-950 dark:text-[#EDEDE8] group-hover:text-[#0085FF] dark:group-hover:text-[#389BFF] transition-colors duration-200">
                Maina Eric
              </span>
              {currentSectionLabel && activeSection !== 'profile' && (
                <span className="hidden xs:inline-block md:hidden text-xs font-mono font-semibold text-[#0085FF] dark:text-[#389BFF] animate-fade-in pl-1">
                  · {currentSectionLabel}
                </span>
              )}
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map(section => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3.5 lg:px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#0085FF] text-white dark:bg-[#168FFF] dark:text-white shadow-md shadow-[#0085FF]/25 font-bold'
                        : 'text-slate-700 dark:text-[#A3CDFF] hover:bg-slate-100 dark:hover:bg-[#131B2E] hover:text-[#0085FF] dark:hover:text-white'
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Standalone Borderless Theme Toggle (Sun / Moon) */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#131B2E] dark:hover:bg-[#1A2640] border-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 shadow-sm shadow-slate-200/90 dark:shadow-none transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <Sun
                    size={18}
                    className={`absolute transition-all duration-300 ${
                      theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100 text-[#389BFF]'
                        : 'opacity-0 rotate-90 scale-50 text-amber-500'
                    }`}
                  />
                  <Moon
                    size={18}
                    className={`absolute transition-all duration-300 ${
                      theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100 text-slate-800'
                        : 'opacity-0 -rotate-90 scale-50 text-slate-400'
                    }`}
                  />
                </div>
              </button>

              {/* Hire Me CTA Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#0085FF] hover:bg-[#006ACC] text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#0085FF]/25 dark:shadow-[#168FFF]/30 cursor-pointer whitespace-nowrap shrink-0"
                aria-label="Hire Me"
              >
                Hire Me
              </button>

              {/* Mobile menu toggle (Sidebar menu) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-slate-800 dark:text-[#EDEDE8] hover:text-[#0085FF] dark:hover:text-[#389BFF] hover:bg-slate-100 dark:hover:bg-[#131B2E] transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (Sidebar menu drawer) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Menu panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-400/40 dark:shadow-black/70 transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex flex-col p-3 gap-1">
            {sections.map(section => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-3 rounded-full text-left font-sans text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#0085FF] text-white dark:bg-[#168FFF] dark:text-white shadow-md shadow-[#0085FF]/25 font-bold'
                      : 'text-slate-800 dark:text-[#A3CDFF] hover:bg-slate-100 dark:hover:bg-[#131B2E] hover:text-[#0085FF] dark:hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 flex items-center justify-center px-4 py-3 rounded-full bg-[#0085FF] text-white dark:bg-[#168FFF] dark:text-white font-sans text-sm font-bold uppercase tracking-wider shadow-md shadow-[#0085FF]/25 transition-all"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
