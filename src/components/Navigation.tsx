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

  const currentSectionLabel = sections.find(s => s.id === activeSection)?.label || '';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F9F5]/95 dark:bg-[#0D0F0C]/95 backdrop-blur-md border-b border-gray-300 dark:border-[#22261E] shadow-sm'
            : 'bg-[#F8F9F5]/80 dark:bg-[#0D0F0C]/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-[#22261E]/50 shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand / Home Link */}
            <button
              onClick={() => {
                scrollToSection('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative flex items-center gap-2 group py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#658B12] dark:focus-visible:ring-[#B7E33B] rounded cursor-pointer transition-transform active:scale-95"
              aria-label="Maina Eric - Home"
              title="Maina Eric - Home"
            >
              {/* Luminous aura behind text */}
              <span
                className="absolute -inset-x-2.5 -inset-y-1 rounded-lg bg-gradient-to-r from-transparent via-[#658B12]/15 dark:via-[#B7E33B]/25 to-transparent blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <span className="relative text-lg sm:text-xl font-bold font-['Space_Grotesk'] tracking-tight text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] brand-glowing-text transition-colors duration-200">
                Maina Eric
              </span>

              {currentSectionLabel && activeSection !== 'profile' && (
                <span className="md:hidden text-xs font-['IBM_Plex_Mono'] font-semibold text-[#658B12] dark:text-[#B7E33B] animate-fade-in pl-1">
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
                    className={`px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider font-['Space_Grotesk'] transition-all ${
                      isActive
                        ? 'bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] shadow-sm font-bold'
                        : 'text-gray-700 dark:text-[#8F9489] hover:bg-gray-200/60 dark:hover:bg-[#151713] hover:text-[#658B12] dark:hover:text-[#B7E33B]'
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {/* Theme toggle (Sun / Moon) */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] text-gray-800 dark:text-gray-200 hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] transition-all hover:scale-105 shadow-sm"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-5 h-5 overflow-hidden">
                  <Sun
                    size={18}
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'dark' ? 'opacity-100 rotate-0 text-[#B7E33B]' : 'opacity-0 rotate-90 text-amber-500'
                    }`}
                  />
                  <Moon
                    size={18}
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'light' ? 'opacity-100 rotate-0 text-[#658B12]' : 'opacity-0 -rotate-90 text-gray-400'
                    }`}
                  />
                </div>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] text-gray-800 dark:text-[#EDEDE8] hover:border-[#658B12] dark:hover:border-[#B7E33B] transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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
          className={`absolute top-16 left-0 right-0 bg-[#F8F9F5] dark:bg-[#0D0F0C] border-b border-gray-300 dark:border-[#22261E] shadow-2xl transition-all duration-300 ${
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
                  className={`px-4 py-3 rounded-[4px] text-left font-['Space_Grotesk'] text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C]'
                      : 'text-gray-800 dark:text-[#8F9489] hover:bg-gray-200/60 dark:hover:bg-[#151713] hover:text-[#658B12] dark:hover:text-[#EDEDE8]'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
