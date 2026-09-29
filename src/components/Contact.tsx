import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2, MapPin, Github, Linkedin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    location?: string;
  };
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Falling back to mailto.');
      }

      const templateParams = {
        from_name: form.name,
        to_name: profile.name,
        reply_to: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });

      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${profile.name.split(' ')[1]}, I found your portfolio and would like to get in touch.`
    );
    window.open(`https://wa.me/${profile.phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const inputClass = `
    w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl
    bg-white dark:bg-[#0B0F17]
    border border-slate-200 dark:border-slate-800
    text-slate-900 dark:text-slate-100
    placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:border-[#0085FF] focus:ring-2 focus:ring-[#0085FF]/20
    dark:focus:border-[#389BFF] dark:focus:ring-[#389BFF]/20
    shadow-[0_2px_4px_rgba(0,0,0,0.02)]
    transition-all duration-200
    hover:border-slate-300 dark:hover:border-slate-700
    text-xs sm:text-sm
  `;

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
              Let's Work Together
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              Have a project in mind or want to discuss an opportunity? Send a message and I'll get back to you promptly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <ScrollReveal direction="left" delay={100}>
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-3px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] group-hover:bg-[#0085FF] group-hover:text-white dark:group-hover:bg-[#168FFF] dark:group-hover:text-white transition-colors flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Email</p>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{profile.email}</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={150}>
              <button
                onClick={handleWhatsApp}
                className="group w-full flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#25D366] dark:hover:border-[#25D366] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-3px_rgba(37,211,102,0.2)] hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 dark:group-hover:bg-[#25D366]/20 flex items-center justify-center transition-colors flex-shrink-0">
                  <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">WhatsApp</p>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{profile.phone}</p>
                </div>
              </button>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <a
                href={`tel:${profile.phone}`}
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-3px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] group-hover:bg-[#0085FF] group-hover:text-white dark:group-hover:bg-[#168FFF] dark:group-hover:text-white transition-colors flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{profile.phone}</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={250}>
              <a
                href="https://github.com/Dev-Skylarker"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-3px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-[#0085FF] group-hover:text-white dark:group-hover:bg-[#168FFF] dark:group-hover:text-white transition-colors flex-shrink-0">
                  <Github size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">Dev-Skylarker</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <a
                href="https://www.linkedin.com/in/mainaericdev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF] dark:hover:border-[#389BFF] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-3px_rgba(0,133,255,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] group-hover:bg-[#0085FF] group-hover:text-white dark:group-hover:bg-[#168FFF] dark:group-hover:text-white transition-colors flex-shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">mainaericdev</p>
                </div>
              </a>
            </ScrollReveal>

            {profile.location && (
              <ScrollReveal direction="left" delay={350}>
                <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0085FF] dark:text-[#389BFF] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{profile.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 xs:p-6 sm:p-8 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.04)] dark:shadow-2xl dark:shadow-black/70 hover:shadow-[0_16px_45px_-5px_rgba(0,133,255,0.12)] transition-all duration-300">
                <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                  Send a Message
                </h3>

                {submitStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center mb-4 text-[#0085FF] dark:text-[#389BFF]">
                      <CheckCircle size={28} />
                    </div>
                    <h4 className="font-sans text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
                      Thank you for reaching out. I'll get back to you promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="contact-name">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="contact-email">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="contact-subject">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="contact-message">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or inquiry..."
                        required
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-mono">
                        <AlertCircle size={16} />
                        Something went wrong. Please reach out directly via email.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0085FF] hover:bg-[#006ACC] disabled:opacity-70 disabled:cursor-not-allowed text-white dark:bg-[#168FFF] dark:hover:bg-[#389BFF] dark:text-white rounded-full font-bold uppercase tracking-wider font-sans text-xs sm:text-sm transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer whitespace-nowrap"
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Quick Stats - Arranged horizontally below contact and email form */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/50 dark:hover:border-[#389BFF]/50 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0085FF] dark:bg-[#389BFF] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Response Time</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Quick — within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/50 dark:hover:border-[#389BFF]/50 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0085FF] dark:bg-[#389BFF] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Project Success Rate</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">100% on delivered projects</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-white dark:bg-[#111827]/90 backdrop-blur-sm rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0085FF]/50 dark:hover:border-[#389BFF]/50 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0085FF] dark:bg-[#389BFF] animate-pulse flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Availability</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-[#0085FF] dark:text-[#389BFF] truncate">Remote &amp; On-Site</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
