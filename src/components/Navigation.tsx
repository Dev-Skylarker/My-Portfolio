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
            ? 'bg-[#F8F9F5]/95 dark:bg-[#0D0F0C]/95 backdrop-blur-md border-b border-gray-300 dark:border-[#22261E] shadow-sm'
            : 'bg-[#F8F9F5]/80 dark:bg-[#0D0F0C]/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-[#22261E]/50 shadow-none'
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
              <span className="text-lg sm:text-xl font-bold sm:font-extrabold font-sans tracking-tight text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors duration-200">
                Maina Eric
              </span>
              {currentSectionLabel && activeSection !== 'profile' && (
                <span className="hidden xs:inline-block md:hidden text-xs font-mono font-semibold text-[#658B12] dark:text-[#B7E33B] animate-fade-in pl-1">
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
                    className={`px-3.5 lg:px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans transition-all ${
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

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme toggle (Sun / Moon) - Clean borderless/no bg */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-full text-gray-700 dark:text-[#8F9489] hover:text-[#658B12] dark:hover:text-[#B7E33B] hover:bg-gray-200/50 dark:hover:bg-[#1F231A]/60 transition-all duration-200 hover:scale-105 cursor-pointer"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                  <Sun
                    size={19}
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'dark' ? 'opacity-100 rotate-0 text-[#B7E33B]' : 'opacity-0 rotate-90 text-amber-500'
                    }`}
                  />
                  <Moon
                    size={19}
                    className={`absolute inset-0 transition-all duration-300 ${
                      theme === 'light' ? 'opacity-100 rotate-0 text-[#658B12]' : 'opacity-0 -rotate-90 text-gray-400'
                    }`}
                  />
                </div>
              </button>

              {/* Hire Me CTA Button (icon removed, refined modern pill styling) */}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] dark:hover:bg-[#a6d132] font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm shadow-[#658B12]/20 dark:shadow-[#B7E33B]/20 cursor-pointer"
                aria-label="Hire Me"
              >
                Hire Me
              </button>

              {/* Mobile menu toggle (Sidebar menu) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-gray-800 dark:text-[#EDEDE8] hover:text-[#658B12] dark:hover:text-[#B7E33B] hover:bg-gray-200/50 dark:hover:bg-[#1F231A]/60 transition-all cursor-pointer"
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
                  className={`px-4 py-3 rounded-full text-left font-sans text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C]'
                      : 'text-gray-800 dark:text-[#8F9489] hover:bg-gray-200/60 dark:hover:bg-[#151713] hover:text-[#658B12] dark:hover:text-[#EDEDE8]'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 flex items-center justify-center px-4 py-3 rounded-full bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] font-sans text-sm font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
