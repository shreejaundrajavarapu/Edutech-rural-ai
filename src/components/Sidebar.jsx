import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, BookOpen, MessageSquare, User as UserIcon, LogOut, Trophy } from 'lucide-react';

const Sidebar = ({ logout, user }) => {
    // Safety variables - if user or user.xp is missing, it defaults to 0
    const xp = user?.xp || 0;
    const level = Math.floor(xp / 300) + 1;
    const progress = (xp % 300 / 300) * 100;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Map, label: 'Roadmap', path: '/roadmap' },
        { icon: MessageSquare, label: 'AI Doubts', path: '/doubts' },
        { icon: UserIcon, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 overflow-y-auto flex">            <div className="p-6 flex-1">
            <div className="flex items-center gap-3 px-2 py-4 bg-blue-600/10 rounded-xl border border-blue-500/20 mb-8">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-tight">Edutech</h1>
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Rural Learning</p>
                </div>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>

            <div className="p-6 mt-auto">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 mb-4">
                    <div className="flex items-center gap-2 text-yellow-500 mb-1">
                        <Trophy size={16} />
                        <span className="text-xs font-bold uppercase">Level {level}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-[10px] mt-2 text-slate-400">{xp} / 300 XP</p>
                </div>

                <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-red-500/10 text-slate-400 hover:text-red-400">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;