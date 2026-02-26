import { Mail, Phone, MessageCircle, Send, CheckCircle, AlertCircle, Loader2, MapPin, Github, Linkedin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

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
      // Setup your EmailJS service in the .env file
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
      // Fallback: open email client with pre-filled content
      const subject = encodeURIComponent(`Portfolio Contact: ${form.subject}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSubmitStatus('error');
      // Reset from error state
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${profile.name.split(' ')[1]}, I found your portfolio and would like to get in touch.`
    );
    window.open(`https://wa.me/${profile.phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-gray-50 dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200
    hover:border-gray-300 dark:hover:border-gray-600
  `;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a project in mind or want to discuss an opportunity? Send a message and I'll get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <Mail className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{profile.email}</p>
              </div>
            </a>

            <button
              onClick={handleWhatsApp}
              className="group w-full flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-600 transition-all duration-200 text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-600 transition-colors flex-shrink-0">
                <MessageCircle className="text-green-600 dark:text-green-400 group-hover:text-white transition-colors" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">WhatsApp</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.phone}</p>
              </div>
            </button>

            <a
              href={`tel:${profile.phone}`}
              className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-600 transition-colors flex-shrink-0">
                <Phone className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.phone}</p>
              </div>
            </a>

            <a
              href="https://github.com/Dev-Skylarker"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-900 dark:hover:border-white transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white transition-colors flex-shrink-0">
                <Github className="text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">GitHub</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Dev-Skylarker</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/mainaericdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <Linkedin className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">LinkedIn</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">mainaericdev</p>
              </div>
            </a>

            {profile.location && (
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gray-600 dark:text-gray-400" size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.location}</p>
                </div>
              </div>
            )}

            {/* Availability note */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Available for Opportunities</p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Open to internships, part-time roles, freelance projects, and collaborations in web development and ICT.
              </p>
            </div>

            {/* Effectiveness Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 truncate">Response Time</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">&lt; 24 Hours</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 truncate">Project Success</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">100% Rate</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 truncate">Messages</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">20+ Received</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center border-b-2 border-b-green-500 dark:border-b-green-500">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 truncate">Remote Collab</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">Available</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>

              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-name">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-email">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-subject">
                      Subject *
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select a topic...</option>
                      <option value="Web Development Project">Web Development Project</option>
                      <option value="IT Support Services">IT Support Services</option>
                      <option value="Internship / Job Opportunity">Internship / Job Opportunity</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-message">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or how I can help..."
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} />
                      Something went wrong. Please try emailing directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {submitStatus === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                    Or reach me directly at{' '}
                    <a href={`mailto:${profile.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {profile.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
