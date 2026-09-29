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
  const [expandedCerts, setExpandedCerts] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const toggleCert = (index: number) => {
    const newExpanded = new Set(expandedCerts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCerts(newExpanded);
  };

  const getIcon = (type: string) => {
    if (type === 'work' || type === 'internship' || type === 'attachment') return Briefcase;
    if (type === 'degree' || type === 'certificate' || type === 'secondary' || type === 'primary') return GraduationCap;
    return Award;
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
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
            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
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
            <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-[#EDEDE8] mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] text-xs sm:text-sm shadow-sm shadow-slate-200">
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
                  <div className="group bg-white dark:bg-[#111827]/90 rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/60 dark:hover:border-[#389BFF]/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-4px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="p-4 xs:p-5 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] shadow-sm">
                            <Icon size={20} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-sans text-base sm:text-lg font-bold text-slate-950 dark:text-[#EDEDE8] break-words mb-1">
                                {item.role}
                              </h4>
                              <p className="font-sans font-semibold text-xs sm:text-sm text-[#0085FF] dark:text-[#389BFF]">
                                {item.company}
                              </p>
                              <p className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-[#94A3B8] mt-0.5">{item.period}</p>
                            </div>
                            {item.responsibilities && (
                              <button
                                onClick={() => toggleItem(index)}
                                className="flex-shrink-0 p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] text-slate-700 dark:text-[#94A3B8] hover:text-[#0085FF] dark:hover:text-[#389BFF] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm shadow-slate-200"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                              >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            )}
                          </div>

                          {isExpanded && item.responsibilities && (
                            <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-slate-200 dark:border-slate-800">
                              <ul className="space-y-2">
                                {item.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8]">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0085FF] dark:bg-[#389BFF] flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                              {item.coreAreas && item.coreAreas.length > 0 && (
                                <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                                  <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] mb-1.5 sm:mb-2">
                                    Core Areas:
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.coreAreas.map((area, aIdx) => (
                                      <span
                                        key={aIdx}
                                        className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-slate-100 dark:bg-[#0B0F17] text-slate-800 dark:text-[#EDEDE8] border border-slate-200 dark:border-slate-800"
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
            <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-[#EDEDE8] mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] text-xs sm:text-sm shadow-sm shadow-slate-200">
                <GraduationCap size={16} />
              </span>
              Education
            </h3>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-300 dark:bg-slate-800 hidden sm:block" />

            <div className="space-y-3.5 sm:space-y-4">
              {education.map((item, index) => {
                const Icon = getIcon(item.type);

                return (
                  <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                    <div className="sm:pl-16 relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-6 w-12 h-12 rounded-xl bg-white dark:bg-[#111827] border-2 border-slate-200 dark:border-slate-800 hidden sm:flex items-center justify-center z-10 text-[#0085FF] dark:text-[#389BFF] shadow-sm shadow-slate-200">
                        <Icon size={20} />
                      </div>

                      <div className="group bg-white dark:bg-[#111827]/90 rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/60 dark:hover:border-[#389BFF]/60 p-4 xs:p-5 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-4px_rgba(0,133,255,0.15)]">
                        <div className="flex items-start gap-3 sm:gap-0">
                          <div className="sm:hidden w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0 text-[#0085FF] dark:text-[#389BFF]">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <h4 className="font-sans text-sm sm:text-base font-bold text-slate-950 dark:text-[#EDEDE8] mb-0.5 break-words">
                                  {item.degree}
                                </h4>
                                <p className="font-sans text-xs sm:text-sm font-semibold text-[#0085FF] dark:text-[#389BFF]">
                                  {item.institution}
                                </p>
                              </div>
                              <div className="text-left xs:text-right flex-shrink-0">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium bg-blue-50/70 text-[#0085FF] border border-blue-200/60 dark:bg-[#0B0F17] dark:border-slate-800 dark:text-[#389BFF]">
                                  {getTypeLabel(item.type)}
                                </span>
                                <p className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-[#94A3B8] mt-1">{item.period}</p>
                              </div>
                            </div>
                            {item.focus && (
                              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8] mt-2 leading-relaxed">{item.focus}</p>
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
                <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-[#EDEDE8] flex items-center gap-2.5 sm:gap-3">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] text-xs sm:text-sm shadow-sm shadow-slate-200">
                    <Award size={16} />
                  </span>
                  Certifications &amp; Credentials
                </h3>
              </div>
            </ScrollReveal>

            <div className="space-y-3.5 sm:space-y-4">
              {certifications.map((cert, index) => {
                const isOngoing = cert.category === 'ongoing' || cert.status === 'ongoing';
                const isExpanded = expandedCerts.has(index);

                return (
                  <ScrollReveal key={index} direction="up" delay={Math.min(index * 100, 300)}>
                    <div className="group bg-white dark:bg-[#111827]/90 rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/60 dark:hover:border-[#389BFF]/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-4px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300 p-4 xs:p-5 sm:p-6 relative overflow-hidden">
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#0085FF] dark:group-hover:bg-[#389BFF] transition-colors duration-300" />

                      <div className="flex flex-col sm:flex-row items-start gap-3.5 sm:gap-4">
                        {/* Badge Graphic or Icon */}
                        <div className="flex-shrink-0">
                          {cert.badge ? (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 p-1.5 sm:p-2 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm shadow-slate-200/70">
                              <img
                                src={cert.badge}
                                alt={cert.name}
                                className="w-full h-full object-contain filter drop-shadow-sm"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] text-[#0085FF] dark:text-[#389BFF]">
                              {isOngoing ? <Clock size={22} /> : <Award size={22} />}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                                <h4 className="font-sans text-base sm:text-lg font-bold text-slate-950 dark:text-[#EDEDE8] group-hover:text-[#0085FF] dark:group-hover:text-[#389BFF] transition-colors break-words">
                                  {cert.name}
                                </h4>
                                {isOngoing ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-300 dark:bg-[#0B0F17] dark:text-[#94A3B8] dark:border-slate-800">
                                    <Clock size={11} /> Ongoing Track
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-[#389BFF]/10 dark:text-[#389BFF] dark:border-[#389BFF]/30">
                                    <CheckCircle2 size={11} /> Verified Credential
                                  </span>
                                )}
                              </div>

                              <p className="font-mono text-xs font-medium text-[#0085FF] dark:text-[#389BFF] mb-0.5">
                                {cert.issuer} {cert.level && <span className="text-slate-500 dark:text-[#94A3B8] font-normal">· {cert.level}</span>}
                              </p>
                              <p className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-[#94A3B8]">
                                {cert.date}
                              </p>
                            </div>

                            {/* Read More / Show Less Toggle Button */}
                            <button
                              onClick={() => toggleCert(index)}
                              className="flex-shrink-0 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] text-slate-700 dark:text-[#94A3B8] hover:text-[#0085FF] dark:hover:text-[#389BFF] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-sm shadow-slate-200/80"
                              aria-label={isExpanded ? 'Collapse certification details' : 'Expand certification details'}
                            >
                              <span className="text-[11px] sm:text-xs font-sans font-semibold">
                                {isExpanded ? 'Show less' : 'Read more'}
                              </span>
                              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </button>
                          </div>

                          {/* Expandable Section - Revealed on Read More */}
                          {isExpanded && (
                            <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-300">
                              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#94A3B8] leading-relaxed mb-3.5">
                                {cert.description}
                              </p>

                              {/* Skills listed below each item */}
                              {cert.skills && cert.skills.length > 0 && (
                                <div className="mb-3.5">
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <Sparkles size={12} className="text-[#0085FF] dark:text-[#389BFF]" />
                                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">
                                      Skills &amp; Competencies Acquired
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {cert.skills.map((skill, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className="px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono font-medium rounded-full bg-slate-100 dark:bg-[#0B0F17] text-slate-800 dark:text-[#EDEDE8] border border-slate-200 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] transition-colors"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {cert.details && (
                                <div className="mb-3.5 p-3 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-[#94A3B8]">
                                  {cert.details}
                                </div>
                              )}

                              {/* Credly Verification Link */}
                              {cert.link && (
                                <div className="pt-1">
                                  <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full xs:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0085FF] hover:bg-[#006ACC] text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white text-xs font-bold uppercase tracking-wider font-sans shadow-md shadow-[#0085FF]/25 dark:shadow-[#168FFF]/30 transition-all duration-200 hover:scale-105 active:scale-95 group/btn cursor-pointer whitespace-nowrap shrink-0"
                                  >
                                    <Award size={14} />
                                    <span>Verify on Credly</span>
                                    <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                  </a>
                                </div>
                              )}
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
