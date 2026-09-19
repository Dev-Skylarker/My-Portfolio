import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { InteractiveBadge } from './InteractiveBadge';

export interface PhaseConfig {
  primaryTitle: string; // The big headline (Space Grotesk)
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
    <section id="profile" className="relative pt-20 xs:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#658B12]/5 dark:bg-[#B7E33B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative">
        {/* Full-width 3D Canvas layer: Spans the full hero container at z-30 without clipping boundaries */}
        <InteractiveBadge />

        {/* Main Hero Split: Left text & CTAs, Right hanging badge */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-stretch relative z-0">
          {/* Left Column (Text & CTAs) - order-2 on mobile, order-1 on desktop */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between pt-1 sm:pt-2 lg:pt-3 pb-4 sm:pb-6 lg:pb-12 min-h-fit lg:min-h-[660px] relative z-10 order-2 lg:order-1">
            {/* 1. Main Display Headline & Role Sub-Item (Top Block) */}
            <ScrollReveal direction="up" duration={700}>
              <h1 className="font-['Space_Grotesk'] text-[2.35rem] xs:text-[2.85rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.75rem] xl:text-[5.25rem] 2xl:text-[5.75rem] font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] leading-[1.03] min-h-[3.2em] flex flex-col justify-start uppercase">
                {targetLines.map((_, idx) => {
                  const lineText = idx < displayedLines.length ? displayedLines[idx] : '';
                  const isActiveLine = idx === activeLineIdx;
                  return renderLine(lineText, idx, isActiveLine);
                })}
              </h1>

              {/* Sub-Item Area (as plain text with no bg) */}
              <div className="min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] mt-3 sm:mt-4 flex items-center">
                <p className="font-['IBM_Plex_Mono'] text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[1.5rem] text-[#4E6D0B] dark:text-[#B7E33B] font-semibold tracking-wide break-words leading-snug">
                  {displayedSub}
                  {(isTypingSub || isDeletingSub) && (
                    <span className="inline-block w-2 h-4 sm:w-2.5 sm:h-5 md:w-3 md:h-6 lg:h-7 bg-[#4E6D0B] dark:bg-[#B7E33B] ml-1.5 animate-pulse align-middle" />
                  )}
                </p>
              </div>
            </ScrollReveal>

            {/* 2. About Me (Plain text with no bg) - Centered in middle space to cover the gap */}
            <ScrollReveal direction="up" duration={700} delay={100} className="my-auto py-4 sm:py-6 lg:py-8">
              <div className="max-w-2xl">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#658B12] dark:text-[#B7E33B] mb-2.5 font-['IBM_Plex_Mono'] flex items-center gap-2">
                  <span>ABOUT ME</span>
                </h2>
                <p className="text-gray-700 dark:text-[#9EA398] text-sm sm:text-base md:text-[1.05rem] leading-relaxed sm:leading-[1.75] font-sans">
                  {profile.summary}
                </p>
              </div>
            </ScrollReveal>

            {/* 3. Action CTAs aligned with bottom of the 2D card */}
            <ScrollReveal direction="up" duration={700} delay={200}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href="#experience"
                  className="w-full xs:w-auto justify-center px-4 sm:px-6 py-3 sm:py-3.5 bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] font-semibold font-['Space_Grotesk'] text-xs sm:text-sm tracking-wide rounded-[4px] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <span>See Experience</span>
                  <span className="text-xs">↓</span>
                </a>
                <a
                  href="#projects"
                  className="w-full xs:w-auto justify-center px-4 sm:px-6 py-3 sm:py-3.5 border border-gray-300 dark:border-[#22261E] bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm text-gray-900 dark:text-[#EDEDE8] font-semibold font-['Space_Grotesk'] text-xs sm:text-sm tracking-wide rounded-[4px] hover:border-[#658B12] dark:hover:border-[#B7E33B] hover:text-[#658B12] dark:hover:text-[#B7E33B] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <span className="text-xs">↗</span>
                </a>
                <button
                  onClick={onDownloadCV}
                  className="w-full xs:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-300 dark:border-[#22261E] bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm text-gray-800 dark:text-gray-300 font-semibold font-['Space_Grotesk'] text-xs sm:text-sm tracking-wide rounded-[4px] hover:border-[#658B12] hover:text-[#658B12] dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>Download CV</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Responsive layout spacer for the hanging badge - order-1 on mobile, order-2 on desktop */}
          <div className="lg:col-span-5 xl:col-span-5 relative pointer-events-none w-full min-h-[380px] xs:min-h-[440px] sm:min-h-[500px] lg:min-h-[660px] order-1 lg:order-2" />
        </div>
      </div>
    </section>
  );
}
