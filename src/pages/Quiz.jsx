import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS_DATA } from '../data/mockData';
import { Trophy, ArrowLeft, CheckCircle2, XCircle, RefreshCcw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = ({ setProgress }) => {
    const { subjectId } = useParams();
    const subject = SUBJECTS_DATA.find(s => s.id === subjectId);

    const [currentStep, setCurrentStep] = useState(0); // 0 to len-1: questions, len: result
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    if (!subject) return <div>Subject not found</div>;

    const handleAnswer = (optionIdx) => {
        setAnswers({ ...answers, [currentStep]: optionIdx });
        if (currentStep < subject.quiz.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculateScore = () => {
        let score = 0;
        subject.quiz.forEach((q, idx) => {
            if (answers[idx] === q.correct) score++;
        });
        return score;
    };

    const getResultFeedback = (score) => {
        const percentage = (score / subject.quiz.length) * 100;
        if (percentage === 100) return { msg: "Perfect! You're a Master!", tone: "text-green-600" };
        if (percentage >= 70) return { msg: "Great job! Keep it up!", tone: "text-blue-600" };
        return { msg: "Good effort! Practice more to improve.", tone: "text-amber-600" };
    };

    if (showResult) {
        const score = calculateScore();
        const feedback = getResultFeedback(score);

        return (
            <div className="max-w-xl mx-auto py-12">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-10 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Trophy size={48} />
                    </motion.div>

                    <h2 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete!</h2>
                    <p className={`text-xl font-bold mb-6 ${feedback.tone}`}>{feedback.msg}</p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 flex justify-around border border-slate-100">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Score</p>
                            <p className="text-3xl font-black text-slate-900">{score} / {subject.quiz.length}</p>
                        </div>
                        <div className="w-px bg-slate-200"></div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">XP Gained</p>
                            <p className="text-3xl font-black text-primary-600">+{score * 20}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => { setCurrentStep(0); setAnswers({}); setShowResult(false); }}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                        >
                            <RefreshCcw size={18} /> Try Again
                        </button>
                        <Link
                            to="/"
                            className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = subject.quiz[currentStep];

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8 flex items-center justify-between">
                <Link to="/" className="text-sm font-bold text-slate-500 flex items-center gap-1 hover:text-primary-600">
                    <ArrowLeft size={16} /> Quit Quiz
                </Link>
                <div className="px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                    Question {currentStep + 1} of {subject.quiz.length}
                </div>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-12 border border-slate-200">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep) / subject.quiz.length) * 100}%` }}
                    className="h-full bg-primary-500"
                ></motion.div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">
                    {currentQ.question}
                </h3>

                <div className="space-y-3">
                    {currentQ.options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className="w-full p-5 rounded-2xl border-2 border-slate-100 text-left font-bold text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all group flex items-center justify-between shadow-sm"
                        >
                            <span>{option}</span>
                            <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary-100 group-hover:text-primary-600 transition-all">
                                {String.fromCharCode(65 + i)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm pl-4">
                <Star size={14} fill="currentColor" />
                <span>Think carefully! Each correct answer gives you 20 XP.</span>
            </div>
        </div>
    );
};

export default Quiz;
