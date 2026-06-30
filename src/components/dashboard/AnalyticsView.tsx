import React from 'react';
import { BarChart2, TrendingUp, Users, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

export const AnalyticsView: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reports & Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-secondary-400">Dummy Data For now, Implemenation coming soon ....</p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Responses', value: '1,248', trend: '+12.5%', isUp: true, icon: Users },
          { label: 'Completion Rate', value: '68.2%', trend: '+4.1%', isUp: true, icon: TrendingUp },
          { label: 'Avg. Time', value: '2m 14s', trend: '-12s', isUp: false, icon: Clock },
          { label: 'Drop-off Rate', value: '31.8%', trend: '-4.1%', isUp: false, icon: BarChart2 }
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden" animate="show"
            className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-secondary-800 text-gray-500 dark:text-secondary-400 flex items-center justify-center">
                <stat.icon size={18} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full 
                ${stat.isUp ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-secondary-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts / Placeholder visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
          className="lg:col-span-2 bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-6 shadow-sm flex flex-col min-h-[300px]">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Response Volume (Last 30 Days)</h3>
          
          {/* Faux Chart Area */}
          <div className="flex-1 flex items-end justify-between gap-2 border-b border-gray-100 dark:border-secondary-800 pb-2 relative">
            {/* Y-axis lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
               <div className="border-t border-gray-100 dark:border-secondary-800/50 w-full opacity-50"></div>
               <div className="border-t border-gray-100 dark:border-secondary-800/50 w-full opacity-50"></div>
               <div className="border-t border-gray-100 dark:border-secondary-800/50 w-full opacity-50"></div>
               <div className="border-t border-gray-100 dark:border-secondary-800/50 w-full opacity-50"></div>
            </div>
            {/* Bars */}
            {[40, 20, 60, 80, 50, 70, 90, 40, 60, 100, 80, 50, 30, 70].map((h, i) => (
              <div key={i} className="w-full bg-red-100 dark:bg-red-900/40 hover:bg-red-500 dark:hover:bg-red-500 rounded-t-sm transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-secondary-800 text-white text-[10px] py-1 px-2 rounded transition-opacity">
                  {h * 12}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 dark:text-secondary-500 font-medium">
            <span>May 1</span>
            <span>May 15</span>
            <span>May 30</span>
          </div>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
          className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Device Breakdown</h3>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-sm text-gray-600 dark:text-secondary-400">Mobile</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">58%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80"></div>
                <span className="text-sm text-gray-600 dark:text-secondary-400">Desktop</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-200 dark:bg-red-900/60"></div>
                <span className="text-sm text-gray-600 dark:text-secondary-400">Tablet</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">7%</span>
            </div>

            {/* Faux Donut */}
            <div className="w-32 h-32 rounded-full border-[12px] border-gray-50 dark:border-secondary-800/50 mx-auto mt-4 relative">
               {/* Not a real SVG donut, just an illustrative circle */}
               <div className="absolute inset-0 rounded-full border-[12px] border-red-600 border-r-transparent border-b-transparent transform rotate-45"></div>
               <div className="absolute inset-0 rounded-full border-[12px] border-red-400 dark:border-red-500/80 border-l-transparent border-t-transparent border-b-transparent transform rotate-45"></div>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-xs text-gray-400 dark:text-secondary-500 font-medium">Total</span>
                 <span className="text-sm font-bold text-gray-900 dark:text-white">1.2k</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
