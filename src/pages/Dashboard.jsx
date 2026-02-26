import React from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS_DATA } from '../data/mockData';
import {
    Trophy,
    Flame,
    BookOpen,
    Play,
    ArrowRight,
    TrendingUp,
    Clock,
    Calculator,
    Beaker
} from 'lucide-react';
import { motion } from 'framer-motion';
import FocusTools from '../components/FocusTools';
// Mapping icons to names for the Subject Cards
const addXP = (amount) => {
    const updatedUser = {
        ...user,
        xp: (user.xp || 0) + amount,
        // Let's also increase time learnt slightly as an example
        timeLearnt: (user.timeLearnt || 0) + 0.1
    };
    setUser(updatedUser);
};
const ICON_MAP = {
    Calculator: Calculator,
    BookOpen: BookOpen,
    Beaker: Beaker
};

const StatCard = ({ icon: Icon, label, value, color, unit = "" }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-slate-900">{value}<span className="text-sm font-normal text-slate-400 ml-1">{unit}</span></p>
        </div>
    </div>
);

const SubjectCard = ({ subject, progress }) => {
    const Icon = ICON_MAP[subject.icon] || BookOpen;

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100'
    }[subject.color] || 'bg-slate-50 text-slate-600 border-slate-100';

    const barColor = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500'
    }[subject.color] || 'bg-slate-500';

    const subProgress = progress[subject.id] ?
        Math.round((Object.values(progress[subject.id]).filter(v => v).length / subject.chapters.length) * 100) : 0;

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl border ${colorClasses}`}>
                        <Icon size={24} />
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{subject.name}</h3>
                <p className="text-xs text-slate-500 mb-6 line-clamp-2">{subject.description}</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-slate-900">{subProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${subProgress}%` }}
                            className={`h-full ${barColor}`}
                        ></motion.div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <Link
                    to={`/subject/${subject.id}`}
                    className="flex-1 bg-white border border-slate-200 py-2.5 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                    <Play size={14} fill="currentColor" />
                    Study
                </Link>
                <Link
                    to={`/quiz/${subject.id}`}
                    className="flex-1 bg-white border border-slate-200 py-2.5 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 hover:border-amber-500 hover:text-amber-600 transition-all"
                >
                    <Trophy size={14} />
                    Quiz
                </Link>
            </div>
        </div>
    );
};

// Change this line (approx line 111 in your file)
const Dashboard = ({ user, setUser, progress }) => {    // Dynamic Stats pull directly from the 'user' prop now
    const stats = [
        { icon: Flame, label: "Daily Streak", value: user.streak || "0", color: "bg-orange-50 text-orange-600", unit: "days" },
        { icon: Trophy, label: "Experience", value: user.xp || "0", color: "bg-yellow-50 text-yellow-600", unit: "XP" },
        { icon: Clock, label: "Time Learnt", value: user.timeLearnt || "0", color: "bg-indigo-50 text-indigo-600", unit: "hours" },
        { icon: TrendingUp, label: "Current Rank", value: user.rank || "0", color: "bg-emerald-50 text-emerald-600", unit: "th" },
    ];

    const overallProgress = SUBJECTS_DATA.reduce((acc, sub) => {
        const subProg = progress[sub.id] ?
            (Object.values(progress[sub.id]).filter(v => v).length / sub.chapters.length) : 0;
        return acc + subProg;
    }, 0) / SUBJECTS_DATA.length;

    return (
        <div className="max-w-6xl mx-auto pb-12 px-4">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Hello, {user.name || 'Student'}! 👋</h2>
                    <p className="text-slate-500">You're making great progress. Ready to learn something new today?</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 min-w-[240px]">
                    <div className="flex-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                            <span className="text-slate-400">Total Completion</span>
                            <span className="text-slate-900">{Math.round(overallProgress * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress * 100}%` }}
                                className="h-full bg-blue-600"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Your Subjects</h3>
                    <Link to="/roadmap" className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View Learning Roadmap <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUBJECTS_DATA.map((subject) => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            progress={progress}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <Trophy size={14} />
                            Recommended for you
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Master Fractions and Decimals</h3>
                        <p className="text-slate-400 max-w-md">You're almost finished the Integers chapter. Moving to Fractions will help you unlock the next Math badge.</p>
                    </div>
                    <Link
                        to="/subject/math"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 whitespace-nowrap"
                    >
                        Resume Learning
                    </Link>
                </div>
            </div>
            {/* ... other code above ... */}

            {/* New Study Tools Section */}
            {/* Update this at the bottom of Dashboard.jsx */}
            <FocusTools subjects={SUBJECTS_DATA} onComplete={() => addXP(50)} />
        </div> // This is the final closing div of the Dashboard
    );
};


export default Dashboard;