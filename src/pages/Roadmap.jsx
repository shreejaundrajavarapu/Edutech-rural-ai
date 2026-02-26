import React from 'react';
import { SUBJECTS_DATA } from '../data/mockData';
import { CheckCircle2, Circle, Map as MapIcon, ChevronRight } from 'lucide-react';

const Roadmap = ({ progress, setProgress }) => {
    const toggleChapter = (subId, chapId) => {
        setProgress(prev => ({
            ...prev,
            [subId]: {
                ...(prev[subId] || {}),
                [chapId]: !(prev[subId]?.[chapId])
            }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-primary-50">
                    <MapIcon size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Learning Roadmap</h2>
                <p className="text-slate-500">Your step-by-step journey to success</p>
            </div>

            <div className="space-y-12 relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-10 bottom-0 w-1 bg-slate-100 hidden md:block"></div>

                {SUBJECTS_DATA.map((subject, sIdx) => (
                    <div key={subject.id} className="relative z-10">
                        <div className="flex items-center gap-6 mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${subject.color === 'blue' ? 'bg-blue-600 shadow-blue-100' :
                                    subject.color === 'green' ? 'bg-green-600 shadow-green-100' : 'bg-purple-600 shadow-purple-100'
                                }`}>
                                {sIdx + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{subject.name}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-16">
                            {subject.chapters.map((chapter) => (
                                <div
                                    key={chapter.id}
                                    onClick={() => toggleChapter(subject.id, chapter.id)}
                                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${progress[subject.id]?.[chapter.id]
                                            ? 'bg-green-50 border-green-200 shadow-green-50'
                                            : 'bg-white border-slate-100 hover:border-primary-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={progress[subject.id]?.[chapter.id] ? 'text-green-600' : 'text-slate-300'}>
                                            {progress[subject.id]?.[chapter.id] ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                        </div>
                                        <div>
                                            <p className={`font-bold ${progress[subject.id]?.[chapter.id] ? 'text-green-900' : 'text-slate-700'}`}>
                                                {chapter.title}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                {chapter.xp} XP Points
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmap;
