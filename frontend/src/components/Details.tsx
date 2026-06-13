import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, IndianRupee, Users } from 'lucide-react';

export const Details = () => {
  const details = [
    {
      icon: <Users className="w-6 h-6 text-brand-primary" />,
      label: 'Age Group',
      value: '8–14 Years',
      description: 'Specially designed curriculum for young creative minds.',
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-secondary" />,
      label: 'Duration',
      value: '4 Weeks',
      description: 'Structured interactive sessions, twice a week.',
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      label: 'Mode',
      value: 'Online',
      description: 'Live interactive classes with hands-on labs from home.',
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-amber-500" />,
      label: 'Workshop Fee',
      value: '₹2,999',
      description: 'One-time fee covering all projects, soft kits and certificate.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-rose-500" />,
      label: 'Start Date',
      value: '15 July 2026',
      description: 'Batch registrations close on 12 July 2026.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 12 },
    },
  };

  return (
    <section id="details" className="py-20 bg-zinc-50 dark:bg-zinc-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Workshop Quick Facts
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Everything you need to know about the upcoming summer batch at a glance.
          </p>
        </div>

        {/* Details Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {details.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-md shadow-zinc-100 dark:shadow-none hover:shadow-xl hover:border-brand-primary/40 dark:hover:border-brand-secondary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {item.label}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                    {item.value}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
