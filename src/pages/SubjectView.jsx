import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS_DATA } from '../data/mockData';
import {
    FileText,
    PlayCircle,
    ArrowLeft,
    Download,
    CheckCircle2,
    Circle,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SubjectView = ({ progress, setProgress }) => {
    const { subjectId } = useParams();
    const subject = SUBJECTS_DATA.find(s => s.id === subjectId);
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'videos'

    if (!subject) return <div>Subject not found</div>;

    const toggleChapter = (chapterId) => {
        setProgress(prev => ({
            ...prev,
            [subjectId]: {
                ...(prev[subjectId] || {}),
                [chapterId]: !(prev[subjectId]?.[chapterId])
            }
        }));
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="mb-8">
                <Link to="/" className="text-sm font-bold text-slate-500 flex items-center gap-1 hover:text-primary-600 transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl bg-${subject.color}-50 text-${subject.color}-600 border border-${subject.color}-100`}>
                            {/* Icon placeholder */}
                            <FileText size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900">{subject.name}</h2>
                            <p className="text-slate-500">{subject.description}</p>
                        </div>
                    </div>

                    <Link
                        to={`/quiz/${subject.id}`}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-100 transition-all flex items-center justify-center gap-2"
                    >
                        Take Subject Quiz
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'notes' ? 'text-primary-600 bg-primary-50/50 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <FileText size={18} /> Notes & PDFs
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'videos' ? 'text-primary-600 bg-primary-50/50 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <PlayCircle size={18} /> Lecture Videos
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {subject.chapters.map((chapter) => (
                                <div
                                    key={chapter.id}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary-200 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleChapter(chapter.id)}
                                            className={`transition-colors ${progress[subjectId]?.[chapter.id] ? 'text-green-500' : 'text-slate-300 group-hover:text-primary-400'}`}
                                        >
                                            {progress[subjectId]?.[chapter.id] ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                        </button>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{chapter.title}</h4>
                                            <p className="text-xs text-slate-500">Earn {chapter.xp} XP upon completion</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <a
                                            href={subject.realContent ? "/notes/document.pdf" : "#"}
                                            className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all"
                                            title="Download for offline"
                                            onClick={(e) => { if (!subject.realContent) { e.preventDefault(); alert('Dummy PDF selected'); } }}
                                        >
                                            <Download size={14} /> Download
                                        </a>
                                        <a
                                            href={subject.realContent ? (activeTab === 'notes' ? "/notes/document.pdf" : "/video/video.mp4") : "#"}
                                            target="_blank"
                                            className="flex-1 md:flex-none px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-700 shadow-md shadow-primary-100 transition-all"
                                            onClick={(e) => { if (!subject.realContent) { e.preventDefault(); alert('Looking at dummy content'); } }}
                                        >
                                            {activeTab === 'notes' ? <ExternalLink size={14} /> : <PlayCircle size={14} />}
                                            {activeTab === 'notes' ? 'View PDF' : 'Watch Video'}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SubjectView;
