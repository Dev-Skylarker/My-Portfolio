import { Mail, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  softSkills: string[];
  email: string;
  githubUrl?: string;
}

export function Footer({ softSkills, email, githubUrl }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 dark:bg-gray-950 text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 gap-10 mb-10">
          {/* Brand + hire me */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                ME
              </div>
              <div>
                <p className="font-bold text-white">Maina Eric Kariuki</p>
                <p className="text-xs text-gray-400">ICT Professional & Web Developer</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
              Open to internships, full-time roles, and freelance projects in web development and ICT.
            </p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}?subject=Job%20Opportunity%20%E2%80%94%20Let%27s%20Work%20Together`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
              >
                <Mail size={15} />
                Hire Me
              </a>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  <Github size={15} />
                  GitHub
                </a>
              )}
              <a
                href="https://www.linkedin.com/in/mainaericdev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Soft skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} Maina Eric Kariuki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
