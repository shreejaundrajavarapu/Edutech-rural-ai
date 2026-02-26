import React, { useState } from 'react';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('6');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            // We add xp, streak, and rank here so the app has numbers to work with
            onLogin({
                name,
                studentClass,
                xp: 0,
                streak: 0,
                rank: 0,
                timeLearnt: 0
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-primary-200 mb-6 rotate-3">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back!</h1>
                    <p className="text-slate-500">Log in to start your learning journey</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-slate-50"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">
                                Your Class
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {['6', '7', '8', '9', '10'].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setStudentClass(num)}
                                        className={`py-3 rounded-xl font-bold transition-all border ${studentClass === num
                                            ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-100'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-slate-200 group"
                        >
                            Start Learning
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <GraduationCap size={16} />
                    <span>Offline learning enabled for rural India</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
