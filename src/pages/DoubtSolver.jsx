import React, { useState } from 'react';
import { DOUBTS_QA } from '../data/mockData';
import { MessageSquare, Send, Bot, User as UserIcon, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DoubtSolver = () => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! I am your AI Study Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        // User message
        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInput('');

        // Mock bot search
        setTimeout(() => {
            const match = DOUBTS_QA.find(qa =>
                text.toLowerCase().includes(qa.q.toLowerCase()) ||
                qa.q.toLowerCase().includes(text.toLowerCase())
            );

            const response = match ? match.a : "That's a great question! For now, I only know answers to basic app usage. Try asking 'What are XP points?' or 'Can I study offline?'";

            setMessages(prev => [...prev, { type: 'bot', text: response }]);
        }, 600);
    };

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
            <div className="mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200">
                    <Bot size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900">AI Doubt Solver</h2>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Offline AI Active
                    </p>
                </div>
            </div>

            <div className="flex-1 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 mb-4 flex flex-col overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'bot' ? 'bg-primary-100 text-primary-600' : 'bg-slate-800 text-slate-200'
                                    }`}>
                                    {msg.type === 'bot' ? <Bot size={16} /> : <UserIcon size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${msg.type === 'bot'
                                        ? 'bg-primary-50 text-primary-900 rounded-tl-none border border-primary-100'
                                        : 'bg-slate-800 text-white rounded-tr-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {['What are XP points?', 'Offline mode?', 'How to start?'].map(q => (
                            <button
                                key={q}
                                onClick={() => handleSend(q)}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-primary-400 hover:text-primary-600 transition-all shadow-sm"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            className="flex-1 px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm shadow-inner"
                            placeholder="Ask a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center hover:bg-primary-700 shadow-md shadow-primary-100 active:scale-95 transition-all"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoubtSolver;
