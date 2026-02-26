import React from 'react';
import { Trophy, Flame, Star, Award, ShieldCheck } from 'lucide-react';
import { SUBJECTS_DATA } from '../data/mockData';

const AchievementBadge = ({ icon: Icon, label, description, unlocked }) => (
    <div className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 ${unlocked ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60 grayscale'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-bold text-slate-900">{label}</p>
            <p className="text-[10px] text-slate-500">{description}</p>
        </div>
    </div>
);

const Profile = ({ user, progress }) => {
    // If the app is still loading the user, show this instead of crashing
    if (!user) return <div className="p-20 text-center font-bold">Loading Profile...</div>;

    const achievements = [
        { icon: Flame, label: "7 Day Streak", description: "Learn for 7 days in a row", unlocked: (user?.streak || 0) >= 7 },
        { icon: Star, label: "Math Wizard", description: "Complete All Math chapters", unlocked: false },
        { icon: ShieldCheck, label: "Perfect Score", description: "Complete a quiz with 100% score", unlocked: false },
        { icon: Award, label: "First Step", description: "Earn your first XP", unlocked: (user?.xp || 0) > 0 },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-12 px-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 mb-8 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-black">
                        {user?.name ? user.name[0].toUpperCase() : "S"}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl font-black text-slate-900 mb-1">{user?.name || "Student"}</h2>
                        <p className="text-slate-500 font-medium mb-4">Class {user?.studentClass || "N/A"}</p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                <Trophy size={18} className="text-yellow-600" />
                                <span className="text-sm font-black text-slate-700">{user?.xp || 0} XP</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                <Flame size={18} className="text-orange-600" />
                                <span className="text-sm font-black text-slate-700">{user?.streak || 0} Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Achievements</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {achievements.map((item, i) => <AchievementBadge key={i} {...item} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;