import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-4 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-zinc-900 dark:text-zinc-100 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors duration-200 cursor-pointer focus:outline-none"
      >
        <span className="text-base sm:text-lg pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is prior coding experience required?',
      answer: 'No prior coding experience is required! This workshop is designed from scratch specifically for absolute beginners. We introduce concepts step-by-step using graphical blocks first, before transitioning to simple programming statements. Our mentors ensure every child learns at their own pace.',
    },
    {
      question: 'Are workshop recordings provided?',
      answer: 'Yes, absolutely. We understand kids have busy summer schedules. High-definition recordings of every live session are uploaded to the student portal within 2 hours of class completion. Students get lifetime access to these recordings for revision.',
    },
    {
      question: 'What software or tools are needed?',
      answer: 'You only need a computer (Windows, Mac, or Chromebook) with a working webcam, micro-microphone, and a stable internet connection. All programming tools and simulators are free, web-based, and will be set up together in class during the first day. No physical hardware kits need to be purchased separately.',
    },
    {
      question: 'How are classes conducted and what is the batch size?',
      answer: 'Classes are held live on our interactive video platform, featuring dual-screen code sharing, virtual robot arenas, and interactive polls. To ensure high-quality individual attention, we cap our batch sizes at 15 students per batch.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-zinc-50 dark:bg-zinc-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Got questions? We have answers. If you need further help, feel free to contact us.
          </p>
        </div>

        {/* FAQ Accordion container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-md">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
