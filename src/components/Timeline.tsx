import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  GraduationCap, 
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface TimelineItem {
  period: string;
  role?: string;
  degree?: string;
  company?: string;
  institution?: string;
  focus?: string;
  responsibilities?: string[];
  coreAreas?: string[];
  type: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  description: string;
  badge?: string;
  details?: string;
  link?: string;
  level?: string;
  category?: 'earned' | 'ongoing' | string;
  status?: 'earned' | 'ongoing' | string;
  skills?: string[];
}

interface TimelineProps {
  experience: TimelineItem[];
  education: TimelineItem[];
  certifications: CertificationItem[];
}

export function Timeline({ experience, education, certifications }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const [revealedDetails, setRevealedDetails] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const toggleDetails = (index: number) => {
    const newRevealed = new Set(revealedDetails);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedDetails(newRevealed);
  };

  const getIcon = (type: string) => {
    if (type === 'work' || type === 'internship' || type === 'attachment') return Briefcase;
    if (type === 'degree' || type === 'certificate' || type === 'secondary' || type === 'primary') return GraduationCap;
    return Award;
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      work: 'Full-time / Freelance',
      internship: 'Internship',
      attachment: 'Industrial Attachment',
      degree: 'University',
      certificate: 'Certificate',
      secondary: 'High School',
      primary: 'Primary',
    };
    return map[type] || type;
  };

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
              Experience &amp; Education
            </h2>
            <p className="text-gray-700 dark:text-[#8F9489] max-w-xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              My professional journey, academic background, and certifications that shaped my expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Experience */}
        <div className="mb-10 sm:mb-14">
          <ScrollReveal direction="up" delay={100}>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] text-xs sm:text-sm shadow-sm">
                <Briefcase size={16} />
              </span>
              Professional Experience
            </h3>
          </ScrollReveal>

          <div className="space-y-3.5 sm:space-y-4">
            {experience.map((item, index) => {
              const Icon = getIcon(item.type);
              const isExpanded = expandedItems.has(index);

              return (
                <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                  <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="p-4 xs:p-5 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B]">
                            <Icon size={20} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                                <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-gray-950 dark:text-[#EDEDE8] break-words">
                                  {item.role}
                                </h4>
                                <span className="px-2 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-['IBM_Plex_Mono'] font-medium bg-gray-100 text-[#658B12] border border-gray-300 dark:bg-[#0D0F0C] dark:border-[#22261E] dark:text-[#B7E33B]">
                                  {getTypeLabel(item.type)}
                                </span>
                              </div>
                              <p className="font-['Space_Grotesk'] font-semibold text-xs sm:text-sm text-[#658B12] dark:text-[#EDEDE8]">
                                {item.company}
                              </p>
                              <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489] mt-0.5">{item.period}</p>
                            </div>
                            {item.responsibilities && (
                              <button
                                onClick={() => toggleItem(index)}
                                className="flex-shrink-0 p-1.5 sm:p-2 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] text-gray-700 dark:text-[#8F9489] hover:text-gray-950 dark:hover:text-[#EDEDE8] transition-colors"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                              >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            )}
                          </div>

                          {isExpanded && item.responsibilities && (
                            <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-gray-200 dark:border-[#22261E]">
                              <ul className="space-y-2">
                                {item.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-[#8F9489]">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#658B12] dark:bg-[#B7E33B] flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                              {item.coreAreas && item.coreAreas.length > 0 && (
                                <div className="mt-3.5 sm:mt-4 pt-3 border-t border-gray-200 dark:border-[#22261E]">
                                  <p className="font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8F9489] mb-1.5 sm:mb-2">
                                    Core Areas:
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.coreAreas.map((area, aIdx) => (
                                      <span
                                        key={aIdx}
                                        className="px-2 sm:px-2.5 py-0.5 rounded-[4px] text-[11px] sm:text-xs font-['IBM_Plex_Mono'] font-medium bg-gray-100 dark:bg-[#0D0F0C] text-gray-800 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E]"
                                      >
                                        {area}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mb-10 sm:mb-14">
          <ScrollReveal direction="up" delay={100}>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] text-xs sm:text-sm shadow-sm">
                <GraduationCap size={16} />
              </span>
              Education
            </h3>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300 dark:bg-[#22261E] hidden sm:block" />

            <div className="space-y-3.5 sm:space-y-4">
              {education.map((item, index) => {
                const Icon = getIcon(item.type);

                return (
                  <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                    <div className="sm:pl-16 relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-6 w-12 h-12 rounded-xl bg-white dark:bg-[#151713] border-2 border-gray-300 dark:border-[#22261E] hidden sm:flex items-center justify-center z-10 text-[#658B12] dark:text-[#B7E33B] shadow-sm">
                        <Icon size={20} />
                      </div>

                      <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 p-4 xs:p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5">
                        <div className="flex items-start gap-3 sm:gap-0">
                          <div className="sm:hidden w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center flex-shrink-0 text-[#658B12] dark:text-[#B7E33B]">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-gray-950 dark:text-[#EDEDE8] mb-0.5 break-words">
                                  {item.degree}
                                </h4>
                                <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-[#658B12] dark:text-[#B7E33B]">
                                  {item.institution}
                                </p>
                              </div>
                              <div className="text-left xs:text-right flex-shrink-0">
                                <span className="px-2 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-['IBM_Plex_Mono'] font-medium bg-gray-100 text-[#658B12] border border-gray-300 dark:bg-[#0D0F0C] dark:border-[#22261E] dark:text-[#B7E33B]">
                                  {getTypeLabel(item.type)}
                                </span>
                                <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489] mt-1">{item.period}</p>
                              </div>
                            </div>
                            {item.focus && (
                              <p className="text-xs sm:text-sm text-gray-700 dark:text-[#8F9489] mt-2 leading-relaxed">{item.focus}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <ScrollReveal direction="up" delay={100}>
              <div className="mb-5 sm:mb-7">
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] flex items-center gap-2.5 sm:gap-3">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-white dark:bg-[#151713] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] text-xs sm:text-sm shadow-sm">
                    <Award size={16} />
                  </span>
                  Certifications &amp; Credentials
                </h3>
              </div>
            </ScrollReveal>

            <div className="space-y-3.5 sm:space-y-4">
              {certifications.map((cert, index) => {
                const isOngoing = cert.category === 'ongoing' || cert.status === 'ongoing';
                return (
                  <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                    <div className="group bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12]/60 dark:hover:border-[#B7E33B]/60 shadow-sm hover:shadow-xl hover:shadow-[#658B12]/5 dark:hover:shadow-[#B7E33B]/5 hover:-translate-y-1 transition-all duration-300 p-4 xs:p-5 sm:p-6 relative overflow-hidden">
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#658B12] dark:group-hover:bg-[#B7E33B] transition-colors duration-300" />

                      <div className="flex flex-col sm:flex-row items-start gap-3.5 sm:gap-4">
                        {/* Badge Graphic or Icon */}
                        <div className="flex-shrink-0">
                          {cert.badge ? (
                            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] p-1.5 sm:p-2 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
                              <img
                                src={cert.badge}
                                alt={cert.name}
                                className="w-full h-full object-contain filter drop-shadow-sm"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center border border-gray-300 dark:border-[#22261E] bg-gray-50 dark:bg-[#0D0F0C] text-[#658B12] dark:text-[#B7E33B]">
                              {isOngoing ? <Clock size={22} /> : <Award size={22} />}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-gray-950 dark:text-[#EDEDE8] group-hover:text-[#658B12] dark:group-hover:text-[#B7E33B] transition-colors break-words">
                                {cert.name}
                              </h4>
                              {isOngoing ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-['IBM_Plex_Mono'] font-medium bg-gray-100 text-gray-700 border border-gray-300 dark:bg-[#0D0F0C] dark:text-[#8F9489] dark:border-[#22261E]">
                                  <Clock size={11} /> Ongoing Track
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-['IBM_Plex_Mono'] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-[#B7E33B]/10 dark:text-[#B7E33B] dark:border-[#B7E33B]/30">
                                  <CheckCircle2 size={11} /> Verified Credential
                                </span>
                              )}
                            </div>

                            <span className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">
                              {cert.date}
                            </span>
                          </div>

                          <p className="font-['IBM_Plex_Mono'] text-xs font-medium text-[#658B12] dark:text-[#B7E33B] mb-2">
                            {cert.issuer} {cert.level && <span className="text-gray-500 dark:text-[#8F9489] font-normal">· {cert.level}</span>}
                          </p>

                          <p className="text-xs sm:text-sm text-gray-700 dark:text-[#8F9489] leading-relaxed mb-3">
                            {cert.description}
                          </p>

                          {/* Skills listed below each item */}
                          {cert.skills && cert.skills.length > 0 && (
                            <div className="mt-3 pt-2.5 sm:pt-3 border-t border-gray-200 dark:border-[#22261E]">
                              <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                                <Sparkles size={12} className="text-[#658B12] dark:text-[#B7E33B]" />
                                <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8F9489]">
                                  Skills &amp; Competencies Acquired
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {cert.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-['IBM_Plex_Mono'] font-medium rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] text-gray-800 dark:text-[#EDEDE8] border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] transition-colors"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Credly Verification Link or Details Action */}
                          {(cert.link || cert.details) && (
                            <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                              {cert.link && (
                                <a
                                  href={cert.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] bg-[#658B12] hover:bg-[#52720B] text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] text-xs font-semibold font-['Space_Grotesk'] shadow-sm transition-all group/btn"
                                >
                                  <Award size={13} />
                                  <span>Verify on Credly</span>
                                  <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </a>
                              )}
                              {cert.details && (
                                <button
                                  onClick={() => toggleDetails(index)}
                                  className="w-full xs:w-auto justify-center inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-[4px] bg-white hover:bg-gray-100 border border-gray-300 hover:border-[#658B12] text-gray-800 dark:bg-[#0D0F0C] dark:hover:bg-[#151713] dark:border-[#22261E] dark:hover:border-[#B7E33B] dark:text-[#EDEDE8] text-xs font-semibold font-['Space_Grotesk'] transition-all shadow-sm"
                                >
                                  {revealedDetails.has(index) ? 'Hide Info' : 'More Info'}
                                </button>
                              )}
                            </div>
                          )}

                          {cert.details && revealedDetails.has(index) && (
                            <div className="mt-2.5 p-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-[#0D0F0C] border border-gray-200 dark:border-[#22261E] text-xs text-gray-700 dark:text-[#8F9489] animate-in fade-in duration-200">
                              {cert.details}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
