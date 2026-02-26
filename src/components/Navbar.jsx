import React from 'react';
import { User, Bell, Wifi, WifiOff } from 'lucide-react';

const Navbar = ({ user }) => {
    const isOnline = navigator.onLine;

    return (
        <nav className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                    Smart Rural Learning Hub
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                    {isOnline ? (
                        <><Wifi size={14} /> Online</>
                    ) : (
                        <><WifiOff size={14} /> Offline Mode</>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-slate-500">Class {user.studentClass}th</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm">
                        {user.name[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
