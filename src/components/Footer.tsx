import { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, X, Download, FileText, ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  githubUrl?: string;
}

interface DownloadDoc {
  id: string;
  title: string;
  format: string;
  url: string;
  downloadName?: string;
  subtitle?: string;
  size?: string;
}

const DOWNLOAD_FILES: DownloadDoc[] = [
  {
    id: 'cv',
    title: 'My CV',
    format: 'PDF',
    url: '/Maina Eric  CV.pdf',
    downloadName: 'Maina_Eric_CV.pdf',
  },
];

export function Footer({ githubUrl }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showImage, setShowImage] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const downloadsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadsDropdownRef.current &&
        !downloadsDropdownRef.current.contains(event.target as Node)
      ) {
        setDownloadsOpen(false);
      }
    };

    if (downloadsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [downloadsOpen]);



  return (
    <footer className="bg-transparent text-slate-900 dark:text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="max-w-md">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0085FF] dark:bg-[#168FFF] flex items-center justify-center text-white font-bold text-xs font-mono shadow-sm">
                  ME
                </div>
                <div 
                  className="cursor-pointer group"
                  onClick={() => setShowImage(true)}
                >
                  <p className="font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-[#0085FF] dark:group-hover:text-[#389BFF] transition-colors">
                    Maina Eric Kariuki
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    ICT Professional &amp; Web Developer
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Open to internships, full-time roles, and freelance projects in web development and ICT.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
              <a
                href="#contact"
                className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#0085FF] hover:bg-[#006ACC] text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              >
                <Mail size={14} />
                <span>Hire Me</span>
              </a>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0085FF] text-slate-800 dark:bg-[#111827] dark:hover:bg-[#1F2937] dark:border-slate-800 dark:hover:border-[#389BFF] dark:text-slate-100 text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href="https://www.linkedin.com/in/mainaericdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0085FF] text-slate-800 dark:bg-[#111827] dark:hover:bg-[#1F2937] dark:border-slate-800 dark:hover:border-[#389BFF] dark:text-slate-100 text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>

              {/* Downloads Dropdown Trigger */}
              <div className="relative w-full xs:w-auto" ref={downloadsDropdownRef}>
                <button
                  onClick={() => setDownloadsOpen(!downloadsOpen)}
                  className={`w-full xs:w-auto justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                    downloadsOpen
                      ? 'bg-[#0085FF] text-white dark:bg-[#168FFF] dark:text-white border border-transparent shadow-[0_0_15px_rgba(0,133,255,0.35)]'
                      : 'bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0085FF] text-slate-800 dark:bg-[#111827] dark:hover:bg-[#1F2937] dark:border-slate-800 dark:hover:border-[#389BFF] dark:text-slate-100 shadow-sm hover:shadow-md'
                  }`}
                  aria-expanded={downloadsOpen}
                  aria-label="Available Downloads"
                >
                  <Download size={14} />
                  <span>Downloads</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${downloadsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {downloadsOpen && (
                  <div
                    className={`absolute bottom-full mb-2 left-0 sm:left-auto sm:right-0 w-48 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-fade-in text-left ${
                      DOWNLOAD_FILES.length >= 2
                        ? 'max-h-[100px] overflow-y-auto pr-1'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      {DOWNLOAD_FILES.map((file) => (
                        <a
                          key={file.id}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDownloadsOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-[#0085FF]/30 dark:hover:border-[#389BFF]/30 transition-all group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0085FF] dark:text-[#389BFF] flex items-center justify-center shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="flex items-center gap-1.5 min-w-0">
                            <p className="font-sans text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0085FF] dark:group-hover:text-[#389BFF] transition-colors truncate">
                              {file.title}
                            </p>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-semibold">
                              {file.format}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 sm:pt-8">
            <p className="text-center text-slate-500 dark:text-slate-400 font-mono text-[11px] sm:text-xs">
              &copy; {currentYear} Maina Eric Kariuki. All rights reserved.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Image Modal Popup */}
      {showImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" 
          onClick={() => setShowImage(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowImage(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#389BFF] transition-all bg-slate-900 rounded-full border border-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <img
                src="/phh.jpg"
                alt="Professional Background"
                className="w-full max-h-[85vh] object-contain bg-gray-950"
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
