import { Mail, Phone, MessageCircle, Send, CheckCircle, AlertCircle, Loader2, MapPin, Github, Linkedin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ScrollReveal } from './ScrollReveal';

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
    w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-[4px]
    bg-white dark:bg-[#0D0F0C]
    border border-gray-300 dark:border-[#22261E]
    text-gray-950 dark:text-[#EDEDE8]
    placeholder-gray-400 dark:placeholder-gray-600
    focus:outline-none focus:border-[#658B12] focus:ring-1 focus:ring-[#658B12]
    dark:focus:border-[#B7E33B] dark:focus:ring-[#B7E33B]
    transition-all duration-200
    hover:border-gray-400 dark:hover:border-[#30362B]
    text-xs sm:text-sm
  `;

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 dark:text-[#EDEDE8] mb-3 sm:mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-700 dark:text-[#8F9489] max-w-xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
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
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] group-hover:bg-[#658B12] group-hover:text-white dark:group-hover:bg-[#B7E33B] dark:group-hover:text-[#0D0F0C] transition-colors flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Email</p>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8] truncate">{profile.email}</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={150}>
              <button
                onClick={handleWhatsApp}
                className="group w-full flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] group-hover:bg-[#658B12] group-hover:text-white dark:group-hover:bg-[#B7E33B] dark:group-hover:text-[#0D0F0C] transition-colors flex-shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">WhatsApp</p>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8]">{profile.phone}</p>
                </div>
              </button>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <a
                href={`tel:${profile.phone}`}
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] group-hover:bg-[#658B12] group-hover:text-white dark:group-hover:bg-[#B7E33B] dark:group-hover:text-[#0D0F0C] transition-colors flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Phone</p>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8]">{profile.phone}</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={250}>
              <a
                href="https://github.com/Dev-Skylarker"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] group-hover:bg-[#658B12] group-hover:text-white dark:group-hover:bg-[#B7E33B] dark:group-hover:text-[#0D0F0C] transition-colors flex-shrink-0">
                  <Github size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">GitHub</p>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8]">Dev-Skylarker</p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <a
                href="https://www.linkedin.com/in/mainaericdev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] hover:border-[#658B12] dark:hover:border-[#B7E33B] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] group-hover:bg-[#658B12] group-hover:text-white dark:group-hover:bg-[#B7E33B] dark:group-hover:text-[#0D0F0C] transition-colors flex-shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">LinkedIn</p>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8]">mainaericdev</p>
                </div>
              </a>
            </ScrollReveal>

            {profile.location && (
              <ScrollReveal direction="left" delay={350}>
                <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-gray-100 dark:bg-[#0D0F0C] border border-gray-300 dark:border-[#22261E] flex items-center justify-center text-[#658B12] dark:text-[#B7E33B] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Location</p>
                    <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-gray-950 dark:text-[#EDEDE8]">{profile.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Quick Stats */}
            <ScrollReveal direction="left" delay={400}>
              <div className="grid grid-cols-1 gap-2 sm:gap-2.5 pt-1.5 sm:pt-2">
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-[#658B12] dark:bg-[#B7E33B] flex-shrink-0" />
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Response Time</p>
                    <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-gray-950 dark:text-[#EDEDE8]">Quick — within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-[#658B12] dark:bg-[#B7E33B] flex-shrink-0" />
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Project Success Rate</p>
                    <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-gray-950 dark:text-[#EDEDE8]">100% on delivered projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-[#22261E] shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-[#658B12] dark:bg-[#B7E33B] animate-pulse flex-shrink-0" />
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-600 dark:text-[#8F9489]">Availability</p>
                    <p className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#658B12] dark:text-[#B7E33B]">Remote &amp; On-Site</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-white/95 dark:bg-[#151713]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-300 dark:border-[#22261E] p-4 xs:p-6 sm:p-8 shadow-md dark:shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-4 sm:mb-6">
                  Send a Message
                </h3>

                {submitStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#0D0F0C] border border-emerald-400 dark:border-[#B7E33B]/40 flex items-center justify-center mb-4 text-[#658B12] dark:text-[#B7E33B]">
                      <CheckCircle size={28} />
                    </div>
                    <h4 className="font-['Space_Grotesk'] text-xl font-bold text-gray-950 dark:text-[#EDEDE8] mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-700 dark:text-[#8F9489] text-sm max-w-xs">
                      Thank you for reaching out. I'll get back to you promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#8F9489] mb-1.5" htmlFor="contact-name">
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
                        <label className="block font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#8F9489] mb-1.5" htmlFor="contact-email">
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
                      <label className="block font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#8F9489] mb-1.5" htmlFor="contact-subject">
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
                      <label className="block font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#8F9489] mb-1.5" htmlFor="contact-message">
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
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-['IBM_Plex_Mono']">
                        <AlertCircle size={16} />
                        Something went wrong. Please reach out directly via email.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#658B12] hover:bg-[#52720B] disabled:opacity-70 disabled:cursor-not-allowed text-white dark:bg-[#B7E33B] dark:hover:bg-[#a6d132] dark:text-[#0D0F0C] rounded-[4px] font-semibold font-['Space_Grotesk'] text-sm tracking-wide transition-all shadow-sm active:scale-[0.99]"
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
