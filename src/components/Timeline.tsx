import { useState } from 'react';
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineItem {
  period: string;
  role?: string;
  degree?: string;
  company?: string;
  institution?: string;
  focus?: string;
  responsibilities?: string[];
  type: string;
}

interface TimelineProps {
  experience: TimelineItem[];
  education: TimelineItem[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
    badge?: string;
    details?: string;
    link?: string;
  }>;
}

export function Timeline({ experience, education, certifications }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // First item expanded by default

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
    if (type === 'work' || type === 'internship') return Briefcase;
    if (type === 'degree' || type === 'certificate' || type === 'secondary' || type === 'primary') return GraduationCap;
    return Award;
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      work: 'Full-time',
      internship: 'Internship',
      degree: 'University',
      certificate: 'Certificate',
      secondary: 'High School',
      primary: 'Primary',
    };
    return map[type] || type;
  };

  const getTypeBadgeColor = (type: string) => {
    const map: Record<string, string> = {
      work: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      internship: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
      degree: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
      certificate: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      secondary: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      primary: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    };
    return map[type] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
            Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            My professional journey, academic background, and certifications that shaped my expertise.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-7 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </span>
            Professional Experience
          </h3>
          <div className="space-y-4">
            {experience.map((item, index) => {
              const Icon = getIcon(item.type);
              const isExpanded = expandedItems.has(index);

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                          <Icon className="text-blue-600 dark:text-blue-400" size={22} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {item.role}
                              </h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeBadgeColor(item.type)}`}>
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              {item.company}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.period}</p>
                          </div>
                          {item.responsibilities && (
                            <button
                              onClick={() => toggleItem(index)}
                              className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                            >
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          )}
                        </div>

                        {isExpanded && item.responsibilities && (
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <ul className="space-y-2">
                              {item.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-7 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </span>
            Education
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-violet-400 to-purple-600 dark:from-violet-600 dark:to-purple-800 hidden sm:block" />

            <div className="space-y-4">
              {education.map((item, index) => {
                const Icon = getIcon(item.type);

                return (
                  <div
                    key={index}
                    className="sm:pl-16 relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-6 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center hidden sm:flex border-2 border-white dark:border-gray-900 shadow-md z-10">
                      <Icon className="text-violet-600 dark:text-violet-400" size={20} />
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md p-5 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start gap-3 sm:gap-0">
                        {/* Mobile icon */}
                        <div className="sm:hidden w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-violet-600 dark:text-violet-400" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
                                {item.degree}
                              </h4>
                              <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm">
                                {item.institution}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeBadgeColor(item.type)}`}>
                                {getTypeLabel(item.type)}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.period}</p>
                            </div>
                          </div>
                          {item.focus && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.focus}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-7 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Award size={16} className="text-white" />
              </span>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden border border-amber-200 dark:border-amber-900/50 shadow-sm">
                      <Award className="text-amber-600 dark:text-amber-400" size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{cert.name}</h4>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm mb-2">
                        {cert.issuer} · {cert.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {cert.description}
                      </p>
                      {(cert.details || cert.link) && (
                        <div className="mt-3">
                          {cert.link ? (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium transition-all shadow-md group"
                            >
                              {cert.badge ? (
                                <img src={cert.badge} alt="" className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" />
                              ) : (
                                <Award size={14} />
                              )}
                              {cert.name.includes('Python') ? 'Python Essentials 1 Certification' : 'Verify Certification'}
                              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                            </a>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleDetails(index)}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium transition-all shadow-md"
                              >
                                {cert.badge ? (
                                  <img src={cert.badge} alt="" className="w-4 h-4 object-contain" />
                                ) : (
                                  <Award size={14} />
                                )}
                                {revealedDetails.has(index) ? 'Hide Details' : 'View Badge Verification'}
                              </button>
                              {revealedDetails.has(index) && (
                                <div className="mt-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20 text-xs text-blue-800 dark:text-blue-300 animate-in fade-in slide-in-from-top-1 duration-300">
                                  {cert.details}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
