import { motion } from 'framer-motion';
import { Cpu, Code, Target, Sparkles, Terminal } from 'lucide-react';

export const Outcomes = () => {
  const outcomes = [
    {
      icon: <Cpu className="w-6 h-6 text-brand-primary" />,
      title: 'Introduction to Artificial Intelligence',
      tagline: 'Understand the Brains',
      description: 'Discover how computers see, hear, and make decisions. Learn the concepts behind machine learning in a fun, visual way.',
      project: 'Project: Train a custom image classifier to play Rock-Paper-Scissors!',
    },
    {
      icon: <Target className="w-6 h-6 text-brand-secondary" />,
      title: 'Robotics Fundamentals',
      tagline: 'Connect the Hardware',
      description: 'Explore sensors, actuators, and microcontrollers. Understand how robots perceive their environment and move physically.',
      project: 'Project: Program an autonomous obstacle-avoidance virtual rover.',
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-500" />,
      title: 'Basic Programming Concepts',
      tagline: 'Speak the Language',
      description: 'Master variables, loops, conditional statements, and functions using blocks and introductory syntax.',
      project: 'Project: Create a smart automated home simulator.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Building Simple AI Projects',
      tagline: 'Deploy the Magic',
      description: 'Combine code, sensors, and machine learning to build responsive applications that interact with the physical world.',
      project: 'Project: Develop a custom voice-controlled virtual AI assistant.',
    },
    {
      icon: <Terminal className="w-6 h-6 text-rose-500" />,
      title: 'Problem Solving & Logical Thinking',
      tagline: 'Think Like an Engineer',
      description: 'Learn how to break down complex issues, debug code, and analyze performance. Develop cognitive structures that apply everywhere.',
      project: 'Project: Capstone presentation and debugging challenge.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="outcomes" className="py-20 relative overflow-hidden">
      {/* Decorative Glow elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
            Curriculum Breakdown
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            What Your Child Will Learn & Build
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Our curriculum focuses on hands-on creation, teaching kids not just to use technology, but to build it.
          </p>
        </div>

        {/* Outcomes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {outcomes.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className={`p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-300 flex flex-col justify-between ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-secondary tracking-wide uppercase font-mono">
                      {item.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60">
                <p className="text-xs font-semibold text-brand-primary dark:text-cyan-400 font-sans">
                  {item.project}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
