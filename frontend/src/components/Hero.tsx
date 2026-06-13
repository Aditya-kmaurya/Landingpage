import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles, ShieldCheck } from 'lucide-react';

export const Hero = () => {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      const offset = 80;
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
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 flex items-center min-h-[90vh]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full radial-glow dark:block hidden pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-96 h-96 rounded-full radial-glow dark:block hidden pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full radial-glow-light dark:hidden block pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-bg-light dark:grid-bg-dark opacity-100 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary-hover dark:text-cyan-400 font-semibold text-sm border border-brand-primary/20"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Limited Summer Slots Available!</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-white"
              >
                Empower Your Child to Build the{' '}
                <span className="bg-gradient-to-r from-brand-primary via-violet-400 to-brand-secondary bg-clip-text text-transparent">
                  Future with AI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl"
              >
                An interactive, hands-on **AI & Robotics Summer Workshop** designed specifically for children aged **8 to 14**. Give your kid the ultimate STEM head start this summer!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={scrollToRegister}
                className="px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-hover hover:to-brand-secondary-hover text-white text-lg flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all hover:-translate-y-1 cursor-pointer"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const detailsEl = document.getElementById('details');
                  detailsEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 text-lg transition-all hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Learn More
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Certified Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-brand-secondary" />
                <span>100% Practical Projects</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Right */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Background glowing rings */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 blur-2xl z-0" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-full"
            >
              {/* Micro-floating animation */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative cursor-pointer"
              >
                <img
                  src="/robot_hero.png"
                  alt="Kidrove robot teacher illustration"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(139,92,246,0.3)] filter hover:brightness-105 transition-all duration-300"
                />
                
                {/* floating badge */}
                <div className="absolute -top-4 -right-4 bg-zinc-900/90 dark:bg-zinc-800/95 text-white p-3 rounded-2xl border border-zinc-700 shadow-xl flex items-center gap-2.5 backdrop-blur-sm animate-bounce-slow">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                  <span className="text-xs font-bold font-mono">LIVE MENTORING</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
