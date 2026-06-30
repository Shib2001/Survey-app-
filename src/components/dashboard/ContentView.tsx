import React from 'react';
import { BookOpen, HelpCircle, FileText, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

export const ContentView: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Content & Guides</h2>
        <p className="text-sm text-gray-500 dark:text-secondary-400">Everything you need to know about building effective surveys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { icon: FileText, title: 'Getting Started', desc: 'Learn the basics of creating your first campaign.' },
          { icon: BookOpen, title: 'Advanced Logic', desc: 'Using conditional routing and advanced blocks.' },
          { icon: MessageCircle, title: 'Collecting Feedback', desc: 'Best practices for getting higher completion rates.' }
        ].map((item, i) => (
          <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" animate="show"
            className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
              <item.icon size={20} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-secondary-400 leading-relaxed mb-4">{item.desc}</p>
            <div className="flex items-center text-xs font-semibold text-red-600 dark:text-red-400">
              Read guide <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HelpCircle size={20} className="text-gray-400 dark:text-secondary-500" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {[
            { q: 'How do I share a survey?', a: 'Click the share icon on any survey card to copy the public link. You can distribute this link via email, social media, or embed it on your website.' },
            { q: 'Can I export my data?', a: 'Yes, you can export your entire survey configuration as a JSON file, ensuring your designs are immortal.' },
            { q: 'Are responses tracked in real-time?', a: 'Absolutely. As soon as a user hits submit on your public survey, the data is instantly available in your analytics dashboard.' }
          ].map((faq, i) => (
            <motion.div key={i} custom={i + 3} variants={fadeUp} initial="hidden" animate="show"
              className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-500 dark:text-secondary-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
