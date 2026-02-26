import React, { useState, useEffect } from 'react';
import { Timer, Calendar, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FocusTools = ({ subjects }) => {
    // --- Pomodoro Logic ---
    const [seconds, setSeconds] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => setSeconds(s => s - 1), 1000);
        } else if (seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            alert("Focus session complete! Take a break.");
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // --- AI Planner Logic ---
    const [hours, setHours] = useState(2);
    const [plan, setPlan] = useState([]);

    const generatePlan = () => {
        const totalMins = hours * 60;
        const timePerSubject = Math.floor(totalMins / subjects.length);
        const newPlan = subjects.map(sub => ({
            name: sub.name,
            duration: timePerSubject,
            task: "Read Chapter 1 & Practice"
        }));
        setPlan(newPlan);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Pomodoro Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-orange-600 font-bold">
                    <Timer size={20} />
                    <span>Focus Timer</span>
                </div>
                <div className="text-center">
                    <h2 className="text-6xl font-black text-slate-900 mb-8 font-mono tracking-tighter">
                        {formatTime(seconds)}
                    </h2>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={`p-4 rounded-2xl flex items-center gap-2 font-bold transition-all ${isActive ? 'bg-slate-100 text-slate-600' : 'bg-orange-500 text-white shadow-lg shadow-orange-200'}`}
                        >
                            {isActive ? <Pause size={20} /> : <Play size={20} />}
                            {isActive ? 'Pause' : 'Start Focus'}
                        </button>
                        <button
                            onClick={() => { setIsActive(false); setSeconds(25 * 60); }}
                            className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Planner Section */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6 text-primary-400 font-bold">
                        <Calendar size={20} />
                        <span>AI Study Planner</span>
                    </div>

                    <p className="text-sm text-slate-400 mb-4">How many hours will you study today?</p>
                    <div className="flex gap-3 mb-6">
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="bg-slate-800 border-none rounded-xl px-4 py-2 w-20 text-white font-bold focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                            onClick={generatePlan}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <Sparkles size={18} /> Generate Plan
                        </button>
                    </div>

                    <div className="space-y-3">
                        {plan.map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50"
                            >
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-bold text-blue-400">{item.name}</span>
                                    <span className="text-slate-500">{item.duration} mins</span>
                                </div>
                                <p className="text-[10px] text-slate-300">{item.task}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FocusTools;