import { Mail, Phone, MapPin, FileText, MessageCircle, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  onViewCV: () => void;
}

export function Hero({ profile, onViewCV }: HeroProps) {
  const [displayedName, setDisplayedName] = useState('');
  const [nameComplete, setNameComplete] = useState(false);

  // Typewriter animation for the name
  useEffect(() => {
    const name = profile.name;
    let i = 0;
    const delay = 80;
    setDisplayedName('');
    setNameComplete(false);

    const interval = setInterval(() => {
      i++;
      setDisplayedName(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(interval);
        setNameComplete(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [profile.name]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${profile.name.split(' ')[1]}, I found your portfolio and would like to discuss a potential opportunity.`
    );
    window.open(`https://wa.me/${profile.phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="profile" className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-10">
          {/* Animated name */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                {displayedName}
              </span>
              {/* Blinking cursor while typing */}
              {!nameComplete && (
                <span className="inline-block ml-1 w-1 h-10 sm:h-12 lg:h-16 bg-blue-600 dark:bg-blue-400 align-middle animate-blink" />
              )}
            </span>
          </h1>

          {/* Animated title */}
          <p
            className={`text-xl sm:text-2xl font-semibold mb-3 transition-all duration-700 ${nameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-gray-700 dark:text-gray-200">{profile.title}</span>
          </p>

          {/* Tagline */}
          <p
            className={`text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 transition-all duration-700 delay-200 ${nameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Building digital solutions that make a difference
          </p>

          {/* Contact chips */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-8 text-sm transition-all duration-700 delay-300 ${nameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              <Mail size={14} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              <Phone size={14} />
              {profile.phone}
            </a>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 shadow-sm">
              <MapPin size={14} />
              {profile.location}
            </span>
            <a
              href="https://github.com/Dev-Skylarker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              <Github size={14} />
              Dev-Skylarker
            </a>
            <a
              href="https://www.linkedin.com/in/mainaericdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-500 ${nameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <button
              onClick={onViewCV}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95"
            >
              <FileText size={18} />
              View CV
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-7 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-95"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Professional Summary Card */}
        <div
          className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-700 delay-700 ${nameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
