import { FileText, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingActionsProps {
  onViewCV: () => void;
  phone: string;
  name: string;
}

export function FloatingActions({ onViewCV, phone, name }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 260);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new Event('triggerNameAnimation'));
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${name.split(' ')[1]}, I found your portfolio and would like to discuss a potential opportunity.`
    );
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2 sm:gap-2.5">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-white dark:bg-[#151713] text-gray-900 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      <button
        onClick={handleWhatsApp}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] hover:border-[#25D366] dark:hover:border-[#25D366] hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/15 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
        aria-label="Contact via WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={onViewCV}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] dark:hover:bg-[#a6d132] shadow-md shadow-[#658B12]/25 dark:shadow-[#B7E33B]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center font-bold"
        aria-label="View CV"
        title="View CV"
      >
        <FileText size={18} />
      </button>
    </div>
  );
}
