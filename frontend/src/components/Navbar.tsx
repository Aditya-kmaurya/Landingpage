import { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-primary/20">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-tight font-sans">
              Kidrove
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('details')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-brand-primary dark:hover:text-brand-secondary font-medium transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => scrollToSection('outcomes')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-brand-primary dark:hover:text-brand-secondary font-medium transition-colors cursor-pointer"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-brand-primary dark:hover:text-brand-secondary font-medium transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </div>

          {/* Desktop CTA & Theme */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => scrollToSection('register')}
              className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-hover hover:to-brand-secondary-hover text-white shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <button
                onClick={() => scrollToSection('details')}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-primary transition-colors cursor-pointer font-medium"
              >
                Details
              </button>
              <button
                onClick={() => scrollToSection('outcomes')}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-primary transition-colors cursor-pointer font-medium"
              >
                Curriculum
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-primary transition-colors cursor-pointer font-medium"
              >
                FAQs
              </button>
              <div className="pt-2 px-4">
                <button
                  onClick={() => scrollToSection('register')}
                  className="w-full py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-brand-primary to-brand-secondary text-white block shadow-md shadow-brand-primary/10 cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
