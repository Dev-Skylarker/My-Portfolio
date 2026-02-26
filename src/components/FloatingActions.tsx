import { FileText, MessageCircle, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingActionsProps {
  onViewCV: () => void;
  phone: string;
  name: string;
}

export function FloatingActions({ onViewCV, phone, name }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${name.split(' ')[1]}, I found your portfolio and would like to discuss a potential opportunity.`
    );
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      <button
        onClick={handleWhatsApp}
        className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Contact via WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle size={22} />
      </button>

      <button
        onClick={onViewCV}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="View CV"
        title="View CV"
      >
        <FileText size={20} />
      </button>
    </div>
  );
}
