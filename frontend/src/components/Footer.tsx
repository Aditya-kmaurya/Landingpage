import { Bot, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-150 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-tight">
                Kidrove
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Kidrove is an educational platform dedicated to fostering computational thinking, artificial intelligence fundamentals, and hands-on robotics skills in kids.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#details"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
                >
                  Workshop Details
                </a>
              </li>
              <li>
                <a
                  href="#outcomes"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
                >
                  Enroll Today
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                <a href="mailto:hello@kidrove.com" className="hover:text-brand-secondary transition-colors">
                  hello@kidrove.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <span>
                  102, Cyber Heights, Hitech City,<br />
                  Hyderabad, TG - 500081, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & socials */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            &copy; {currentYear} Kidrove Educational Solutions Private Limited. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-600">
            <a href="#" className="hover:text-brand-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-brand-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-brand-primary transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
