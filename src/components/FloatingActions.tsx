import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingActionsProps {
  phone: string;
  name: string;
}

export function FloatingActions({ phone, name }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 240);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new Event('triggerNameAnimation'));
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('projects');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${name.split(' ')[1]}, I found your portfolio and would like to discuss a potential opportunity.`
    );
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2 sm:gap-2.5">
      {/* Scroll Down / Scroll Up Toggle Button */}
      {!showScrollTop ? (
        <button
          onClick={scrollToNext}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#151713] text-gray-900 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center animate-bounce cursor-pointer group"
          aria-label="Scroll down to reveal next page"
          title="Scroll to next page"
        >
          <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      ) : (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#151713] text-gray-900 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center animate-fade-in cursor-pointer group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      <button
        onClick={handleWhatsApp}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] hover:border-[#25D366] dark:hover:border-[#25D366] hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/15 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center group cursor-pointer"
        aria-label="Contact via WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
