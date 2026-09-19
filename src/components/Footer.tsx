import { useState } from 'react';
import { Mail, Github, Linkedin, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  softSkills: string[];
  githubUrl?: string;
}

export function Footer({ softSkills, githubUrl }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showImage, setShowImage] = useState(false);

  return (
    <footer className="bg-transparent text-gray-900 dark:text-[#EDEDE8] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          {/* Top row */}
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand + hire me */}
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[4px] bg-[#658B12] dark:bg-[#B7E33B] flex items-center justify-center text-white dark:text-[#0D0F0C] font-bold text-xs font-['IBM_Plex_Mono'] shadow-sm">
                  ME
                </div>
                <div 
                  className="cursor-pointer group"
                  onClick={() => setShowImage(true)}
                >
                  <p className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors">
                    Maina Eric Kariuki
                  </p>
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489] group-hover:text-gray-950 dark:group-hover:text-[#EDEDE8] transition-colors">
                    ICT Professional &amp; Web Developer
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-[#8F9489] leading-relaxed max-w-xs mb-5 sm:mb-6">
                Open to internships, full-time roles, and freelance projects in web development and ICT.
              </p>
              {/* Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                <a
                  href="#contact"
                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] text-[11px] sm:text-xs font-semibold font-['Space_Grotesk'] uppercase tracking-wider rounded-[4px] transition-all shadow-sm active:scale-95"
                >
                  <Mail size={14} />
                  <span>Hire Me</span>
                </a>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] text-[11px] sm:text-xs font-semibold font-['Space_Grotesk'] uppercase tracking-wider rounded-[4px] transition-all shadow-sm active:scale-95"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                )}
                <a
                  href="https://www.linkedin.com/in/mainaericdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] text-[11px] sm:text-xs font-semibold font-['Space_Grotesk'] uppercase tracking-wider rounded-[4px] transition-all shadow-sm active:scale-95"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Soft skills */}
            <div>
              <h3 className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8F9489] mb-3 sm:mb-4">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] text-gray-800 dark:text-[#EDEDE8] rounded-[4px] text-[11px] sm:text-xs font-medium font-['IBM_Plex_Mono'] hover:border-[#658B12] dark:hover:border-[#B7E33B] transition-colors cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-300 dark:border-[#22261E] pt-6 sm:pt-8">
            <p className="text-center text-gray-600 dark:text-[#8F9489] font-['IBM_Plex_Mono'] text-[11px] sm:text-xs">
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
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#B7E33B] transition-colors bg-gray-900 rounded-[4px] border border-gray-700"
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
