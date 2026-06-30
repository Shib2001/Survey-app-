import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Share2, FileText, LayoutTemplate, BarChart2, Zap, Users, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SurveyRecord } from '../../supabase/database';

interface Props {
  user: { id: string; email: string } | null;
  surveys: SurveyRecord[];
  loading: boolean;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onSignIn: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

const StatCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; color: string; bg: string; i: number }> =
  ({ icon: Icon, label, value, color, bg, i }) => (
    <motion.div custom={i} variants={fadeUp} initial="hidden" animate="show"
      className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={color} />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </motion.div>
  );

export const SurveysView: React.FC<Props> = ({ user, surveys, loading, onDelete, onShare, onSignIn }) => {

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 gap-12 px-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mt-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <LayoutTemplate size={32} className="text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Build surveys that <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">people love</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Sign in to start creating, sharing, and tracking powerful survey campaigns in minutes. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={onSignIn}
              className="px-8 py-3.5 bg-white dark:bg-secondary-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-secondary-700 hover:border-gray-300 dark:hover:border-secondary-600 hover:shadow-md rounded-xl transition-all font-semibold text-sm w-full sm:w-auto">
              Sign In to Get Started
            </button>
            <Link to="/builder/new"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-sm w-full sm:w-auto flex items-center justify-center gap-2">
              Start your first survey
              <Zap size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {[
            { icon: FileText, title: 'Drag & Drop Builder', desc: 'Create beautiful, multi-page surveys with rich question types built in minutes.' },
            { icon: Share2, title: 'Instant Sharing', desc: 'Generate a one-click public link to share anywhere or embed on your website.' },
            { icon: BarChart2, title: 'Live Analytics', desc: 'Track responses, completion rates, and insights in real-time as they come in.' },
          ].map((f) => (
            <motion.div key={f.title} variants={fadeUp}
              className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon size={22} className="text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full max-w-4xl mt-6 mb-12 bg-gradient-to-br from-red-50 to-white dark:from-secondary-800/50 dark:to-secondary-900 rounded-3xl p-8 md:p-12 border border-red-100 dark:border-secondary-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How it works</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">Three simple steps to gather the data you need and make better decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { step: '01', title: 'Create', desc: 'Design your survey using our intuitive builder and beautiful themes.' },
              { step: '02', title: 'Share', desc: 'Send your survey via email, social media, or embed it anywhere.' },
              { step: '03', title: 'Analyze', desc: 'Watch results pour in and view automated reports instantly.' },
            ].map((s, i) => (
              <div key={s.step} className="text-center relative">
                {i !== 2 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent dark:from-red-900/50" />
                )}
                <div className="w-12 h-12 bg-white dark:bg-secondary-800 border-2 border-red-100 dark:border-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400 font-bold shadow-sm relative z-10">
                  {s.step}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: FileText, label: 'Total Surveys', value: surveys.length, color: 'text-red-600 dark:text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Users, label: 'Total Responses', value: 0, color: 'text-blue-600 dark:text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: TrendingUp, label: 'Completion Rate', value: '0%', color: 'text-green-600 dark:text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Zap, label: 'Active Campaigns', value: 0, color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8">

      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute right-12 bottom-0 w-24 h-24 bg-white/5 rounded-full mb-[-20px]" />
        <div className="relative z-10">
          <p className="text-red-200 text-sm font-medium mb-1">Good to see you back 👋</p>
          <h2 className="text-2xl font-bold mb-1">
            {user.email ? user.email.split('@')[0] : 'Dashboard'}
          </h2>
          <p className="text-red-100 text-sm opacity-80">
            You have <span className="font-bold text-white">{surveys.length}</span> survey{surveys.length !== 1 ? 's' : ''} in your workspace.
          </p>
          <Link to="/builder/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-red-700 text-sm font-bold rounded-lg hover:bg-red-50 transition-colors shadow-sm">
            <Plus size={15} />
            New Survey
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} i={i} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
        }}
      >
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Plus, label: 'New Survey', to: '/builder/new', primary: true },
            { icon: FileText, label: 'My Surveys', onClick: undefined, secondary: true },
            { icon: BarChart2, label: 'Analytics', secondary: true },
            { icon: Share2, label: 'Share Link', secondary: true },
          ].map((a) => (
            a.to ? (
              <motion.div key={a.label} variants={fadeUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to={a.to}
                  className="flex flex-col items-center justify-center gap-2 h-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-colors">
                  <a.icon size={20} />
                  <span className="text-xs font-semibold">{a.label}</span>
                </Link>
              </motion.div>
            ) : (
              <motion.button key={a.label} variants={fadeUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center justify-center gap-2 w-full h-full p-4 bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 hover:border-red-200 dark:hover:border-red-900/50 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl shadow-sm hover:shadow-md transition-colors">
                <a.icon size={20} />
                <span className="text-xs font-semibold">{a.label}</span>
              </motion.button>
            )
          ))}
        </div>
      </motion.div>

      {/* Survey List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Surveys</h3>
          {surveys.length > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-secondary-800 px-2 py-0.5 rounded-full">{surveys.length} total</span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-gray-100 dark:bg-secondary-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 dark:bg-secondary-800 rounded w-1/2 mb-6" />
                <div className="flex gap-2">
                  <div className="h-7 w-7 bg-gray-100 dark:bg-secondary-800 rounded-lg" /><div className="h-7 w-7 bg-gray-100 dark:bg-secondary-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : surveys.length === 0 ? (
          <div className="bg-white dark:bg-secondary-900 border-2 border-dashed border-gray-200 dark:border-secondary-800 rounded-xl p-10 text-center">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 border-2 border-dashed border-red-200 dark:border-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <LayoutTemplate size={22} className="text-red-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No surveys yet</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Create your first survey to get started.</p>
            <Link to="/builder/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all">
              <Plus size={14} />
              Create Survey
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {surveys.map((survey, i) => (
              <motion.div key={survey.id} custom={i} variants={fadeUp} initial="hidden" animate="show"
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-secondary-900 border border-gray-100 dark:border-secondary-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col">
                <div className="h-1 bg-gradient-to-r from-red-500 to-red-700" />
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={15} className="text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={11} />
                      {new Date(survey.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-3 mb-1 truncate group-hover:text-red-600 transition-colors"
                    title={survey.name}>
                    {survey.name || 'Untitled Survey'}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">0 responses</p>
                </div>
                <div className="px-5 py-3 bg-gray-50 dark:bg-secondary-800/50 border-t border-gray-100 dark:border-secondary-800 flex items-center justify-between">
                  <div className="flex gap-1">
                    <Link to={`/builder/${survey.id}`} title="Edit"
                      className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <Edit3 size={14} />
                    </Link>
                    <button onClick={() => onShare(survey.id)} title="Share to your friends"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-xs font-medium">
                      <Share2 size={14} />
                      Share to your friends
                    </button>
                  </div>
                  <button onClick={() => onDelete(survey.id)} title="Delete"
                    className="p-1.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add new card */}
            <motion.div custom={surveys.length} variants={fadeUp} initial="hidden" animate="show" whileHover={{ scale: 1.02 }} className="h-full">
              <Link to="/builder/new"
                className="bg-white dark:bg-secondary-900 border-2 border-dashed border-gray-200 dark:border-secondary-700 hover:border-red-300 dark:hover:border-red-500/50 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 h-full min-h-[200px] transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-secondary-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 flex items-center justify-center transition-colors">
                  <Plus size={18} />
                </div>
                <span className="text-xs font-medium">New Survey</span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
