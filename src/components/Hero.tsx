import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { InteractiveBadge } from './InteractiveBadge';

export interface PhaseConfig {
  primaryTitle: string; // The big headline (Inter font-sans)
  accentWord?: string;  // Word in the headline styled in #B7E33B / #658B12
  subPrefix: string;    // "A " or "↳ "
  subItems: string[];   // Items that cycle completely before primary changes
}

export const HERO_PHASES: PhaseConfig[] = [
  {
    primaryTitle: 'HELLO,\nI AM\nMAINA ERIC.',
    accentWord: 'ERIC.',
    subPrefix: 'A ',
    subItems: [
      'Systems & ICT Specialist',
      'Software Developer',
      'Brand & Visual Designer',
      'Web Security Practitioner',
    ],
  },
  {
    primaryTitle: 'I BUILD\nDIGITAL\nEXPERIENCES.',
    accentWord: 'DIGITAL',
    subPrefix: '↳ ',
    subItems: [
      'Progressive Web Apps & Offline Systems',
      'Automated M-Pesa STK Push Payment Gateways',
      'Interactive Event Programs & Eulogies',
      'Vulnerability-Tested Web Architectures',
      'Editorial Brand Identities & Design Systems',
    ],
  },
];

interface HeroProps {
  profile: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  onDownloadCV: () => void;
}

export function Hero({ profile, onDownloadCV }: HeroProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [subItemIndex, setSubItemIndex] = useState(0);

  // Text states
  const [displayedPrimary, setDisplayedPrimary] = useState('');
  const [displayedSub, setDisplayedSub] = useState('');

  // Control flags
  const [isTypingPrimary, setIsTypingPrimary] = useState(true);
  const [isDeletingPrimary, setIsDeletingPrimary] = useState(false);
  const [isTypingSub, setIsTypingSub] = useState(false);
  const [isDeletingSub, setIsDeletingSub] = useState(false);

  const currentPhase = HERO_PHASES[phaseIndex];
  const targetPrimary = currentPhase.primaryTitle;
  const targetSub = `${currentPhase.subPrefix}${currentPhase.subItems[subItemIndex]}`;

  // STEP 1: Type or Erase Primary Title
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTypingPrimary) {
      if (displayedPrimary.length < targetPrimary.length) {
        timeout = setTimeout(() => {
          setDisplayedPrimary(targetPrimary.slice(0, displayedPrimary.length + 1));
        }, 55);
      } else {
        timeout = setTimeout(() => {
          setIsTypingPrimary(false);
          setIsTypingSub(true);
        }, 350);
      }
    } else if (isDeletingPrimary) {
      if (displayedPrimary.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedPrimary(displayedPrimary.slice(0, -1));
        }, 30);
      } else {
        setIsDeletingPrimary(false);
        setPhaseIndex((prev) => (prev + 1) % HERO_PHASES.length);
        setSubItemIndex(0);
        setIsTypingPrimary(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedPrimary, isTypingPrimary, isDeletingPrimary, targetPrimary]);

  // STEP 2: Type, Hold, and Erase Sub-Items
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTypingSub) {
      if (displayedSub.length < targetSub.length) {
        timeout = setTimeout(() => {
          setDisplayedSub(targetSub.slice(0, displayedSub.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsTypingSub(false);
          setIsDeletingSub(true);
        }, 1600);
      }
    } else if (isDeletingSub) {
      if (displayedSub.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedSub(displayedSub.slice(0, -1));
        }, 25);
      } else {
        setIsDeletingSub(false);
        if (subItemIndex < currentPhase.subItems.length - 1) {
          setSubItemIndex((prev) => prev + 1);
          setIsTypingSub(true);
        } else {
          setIsDeletingPrimary(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedSub, isTypingSub, isDeletingSub, targetSub, subItemIndex, currentPhase.subItems.length]);

  const targetLines = currentPhase.primaryTitle.split('\n');
  const displayedLines = displayedPrimary.split('\n');
  const activeLineIdx = Math.min(displayedLines.length - 1, targetLines.length - 1);

  const renderLine = (lineText: string, lineIndex: number, isActiveLine: boolean) => {
    const accent = currentPhase.accentWord;
    let content: React.ReactNode = lineText;

    if (!lineText) {
      content = <span className="invisible select-none">{'\u00A0'}</span>;
    } else if (accent && lineText.includes(accent)) {
      const parts = lineText.split(accent);
      content = (
        <>
          {parts[0]}
          <span className="text-[#658B12] dark:text-[#B7E33B]">{accent}</span>
          {parts[1]}
        </>
      );
    } else if (
      currentPhase.primaryTitle.split('\n')[lineIndex] === accent &&
      accent.startsWith(lineText) &&
      lineText.length > 0
    ) {
      content = <span className="text-[#658B12] dark:text-[#B7E33B]">{lineText}</span>;
    } else if (lineText.toLowerCase().startsWith('maina ') && lineText.length > 6) {
      const prefix = lineText.slice(0, 6);
      const partialAccent = lineText.slice(6);
      content = (
        <>
          {prefix}
          <span className="text-[#658B12] dark:text-[#B7E33B]">{partialAccent}</span>
        </>
      );
    }

    return (
      <span key={lineIndex} className="block min-h-[1.12em] whitespace-nowrap">
        {content}
        {isActiveLine && (isTypingPrimary || isDeletingPrimary) && (
          <span className="inline-block w-2 sm:w-2.5 md:w-3.5 h-[0.82em] bg-[#658B12] dark:bg-[#B7E33B] ml-1 sm:ml-1.5 md:ml-2 animate-pulse align-middle" />
        )}
      </span>
    );
  };

  return (
    <section
      id="profile"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#658B12]/5 dark:bg-[#B7E33B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Full-section 3D Canvas layer: Spans the ENTIRE section width (not constrained by max-w-7xl)
          so the badge has full room to swing without clipping at container edges */}
      <InteractiveBadge />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Hero Split: Left text & CTAs, Right hanging badge */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          {/* Left Column (Text & CTAs) - centered on mobile, left-aligned on desktop */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left items-center lg:items-start relative z-20">
            {/* 1. Main Display Headline & Role Sub-Item (Top Block) */}
            <ScrollReveal direction="up" duration={600} className="w-full">
              <h1 className="font-sans text-[2.1rem] xs:text-[2.5rem] sm:text-[3.1rem] md:text-[3.6rem] lg:text-[3.75rem] xl:text-[4.35rem] 2xl:text-[4.9rem] font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] leading-[1.04] min-h-[3.15em] flex flex-col justify-start uppercase items-center lg:items-start">
                {targetLines.map((_, idx) => {
                  const lineText = idx < displayedLines.length ? displayedLines[idx] : '';
                  const isActiveLine = idx === activeLineIdx;
                  return renderLine(lineText, idx, isActiveLine);
                })}
              </h1>

              {/* Sub-Item Area */}
              <div className="min-h-[1.9rem] sm:min-h-[2.3rem] lg:min-h-[2.7rem] mt-1 sm:mt-1.5 flex items-center justify-center lg:justify-start">
                <p className="font-mono text-xs xs:text-sm sm:text-base md:text-lg lg:text-[1.28rem] text-[#4E6D0B] dark:text-[#B7E33B] font-semibold tracking-wide break-words leading-snug">
                  {displayedSub}
                  {(isTypingSub || isDeletingSub) && (
                    <span className="inline-block w-2 h-3.5 sm:w-2.5 sm:h-4 md:w-3 md:h-5 lg:h-6 bg-[#4E6D0B] dark:bg-[#B7E33B] ml-1.5 animate-pulse align-middle" />
                  )}
                </p>
              </div>
            </ScrollReveal>

            {/* 2. About Me */}
            <ScrollReveal direction="up" duration={600} delay={100} className="w-full mt-4">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#658B12] dark:text-[#B7E33B] mb-2 font-mono flex items-center gap-2 justify-center lg:justify-start">
                  <span>ABOUT ME</span>
                </h2>
                <p className="text-gray-700 dark:text-[#9EA398] text-sm sm:text-base md:text-[0.96rem] lg:text-[1rem] leading-relaxed font-sans">
                  {profile.summary}
                </p>
              </div>
            </ScrollReveal>

            {/* 3. Action CTAs */}
            <ScrollReveal direction="up" duration={600} delay={200} className="w-full mt-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#experience"
                  className="justify-center px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] font-bold font-sans text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                >
                  <span>See Experience</span>
                  <span className="text-xs">↓</span>
                </a>
                <a
                  href="#projects"
                  className="justify-center px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 border border-gray-300 dark:border-[#22261E] bg-white hover:bg-gray-100 text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:text-[#EDEDE8] font-bold font-sans text-xs uppercase tracking-wider rounded-full hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <span className="text-xs">↗</span>
                </a>
                <button
                  onClick={onDownloadCV}
                  className="justify-center px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 border border-gray-300 dark:border-[#22261E] bg-white hover:bg-gray-100 text-gray-900 dark:bg-[#151713] dark:hover:bg-[#0D0F0C] dark:text-[#EDEDE8] font-bold font-sans text-xs uppercase tracking-wider rounded-full hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Download CV</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Responsive layout spacer for the hanging badge - hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex lg:w-5/12 items-center justify-center relative pointer-events-none min-h-[460px] lg:min-h-[500px]" />
        </div>
      </div>
    </section>
  );
}
