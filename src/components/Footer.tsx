import { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, X, Download, FileText, ChevronDown, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  githubUrl?: string;
}

interface DownloadDoc {
  id: string;
  title: string;
  subtitle: string;
  format: string;
  size: string;
  url: string;
  downloadName: string;
}

const DOWNLOAD_FILES: DownloadDoc[] = [
  {
    id: 'cv',
    title: 'Maina Eric — CV',
    subtitle: 'Official Resume (ATS-Optimized)',
    format: 'PDF',
    size: '~104 KB',
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
    <footer className="bg-transparent text-gray-900 dark:text-[#EDEDE8] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="max-w-md">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#658B12] dark:bg-[#B7E33B] flex items-center justify-center text-white dark:text-[#0D0F0C] font-bold text-xs font-mono shadow-sm">
                  ME
                </div>
                <div 
                  className="cursor-pointer group"
                  onClick={() => setShowImage(true)}
                >
                  <p className="font-sans font-bold text-sm sm:text-base text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors">
                    Maina Eric Kariuki
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489] group-hover:text-gray-950 dark:group-hover:text-[#EDEDE8] transition-colors">
                    ICT Professional &amp; Web Developer
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-[#8F9489] leading-relaxed">
                Open to internships, full-time roles, and freelance projects in web development and ICT.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
              <a
                href="#contact"
                className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              >
                <Mail size={14} />
                <span>Hire Me</span>
              </a>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href="https://www.linkedin.com/in/mainaericdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>

              {/* Downloads Dropdown Trigger */}
              <div className="relative w-full xs:w-auto" ref={downloadsDropdownRef}>
                <button
                  onClick={() => setDownloadsOpen(!downloadsOpen)}
                  className={`w-full xs:w-auto justify-center inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${
                    downloadsOpen
                      ? 'bg-[#658B12] text-white dark:bg-[#B7E33B] dark:text-[#0D0F0C] border border-transparent shadow-[0_0_12px_rgba(101,139,18,0.3)] dark:shadow-[0_0_12px_rgba(183,227,59,0.3)]'
                      : 'bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8]'
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
                  <div className="absolute bottom-full mb-2 left-0 sm:left-auto sm:right-0 w-72 max-w-[calc(100vw-2rem)] rounded-xl bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] shadow-2xl p-1.5 z-50 animate-fade-in text-left">
                    {DOWNLOAD_FILES.map((file) => (
                      <a
                        key={file.id}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDownloadsOpen(false)}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1A1D16] border border-transparent hover:border-[#658B12]/30 dark:hover:border-[#B7E33B]/30 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#658B12]/10 dark:bg-[#B7E33B]/10 text-[#658B12] dark:text-[#B7E33B] flex items-center justify-center shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-sans text-xs font-bold text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors truncate">
                                {file.title}
                              </p>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-[#252820] text-gray-700 dark:text-gray-300 uppercase font-semibold">
                                {file.format}
                              </span>
                            </div>
                            <p className="font-mono text-[10px] text-gray-500 dark:text-[#8F9489] truncate">
                              {file.subtitle} · {file.size}
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-gray-400 group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-300 dark:border-[#22261E] pt-6 sm:pt-8">
            <p className="text-center text-gray-600 dark:text-[#8F9489] font-mono text-[11px] sm:text-xs">
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
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#B7E33B] transition-all bg-gray-900 rounded-full border border-gray-700 hover:scale-105 active:scale-95 cursor-pointer"
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
