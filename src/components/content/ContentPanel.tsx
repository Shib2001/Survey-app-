import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { IntroductionPage } from './IntroductionPage';
import { QuestionPageEditor } from './QuestionPageEditor';
import { ThankYouPageEditor } from './ThankYouPageEditor';
import { motion } from 'framer-motion';

export const ContentPanel: React.FC = () => {
  const questions = useAppSelector((state) => state.content.present.questions);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.div variants={item}>
        <IntroductionPage />
      </motion.div>
      
      <motion.div variants={item}>
        <h3 className="text-sm font-semibold text-content-secondary dark:text-secondary-400 uppercase tracking-wider mb-3 px-1 transition-colors duration-300">Question Pages</h3>
        <div className="flex flex-col">
          {questions.map((q, index) => (
            <motion.div key={q.id} variants={item}>
              <QuestionPageEditor questionId={q.id} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <ThankYouPageEditor />
      </motion.div>
    </motion.div>
  );
};
