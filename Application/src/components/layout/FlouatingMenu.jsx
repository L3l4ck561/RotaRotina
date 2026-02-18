import useDarkMode from "../../hooks/useDarkMode";
import { useState, useEffect, useMemo } from 'react';
import "./stayle.css";

export default function FloatingMenu({
    onPrimaryAction,
    onSearch,
    onHistory,
    onHome,
}) {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (
        <nav className="relative mb-10 group w-full h-0 flex items-center justify-center" style={{ position: 'fixed', bottom: 50, zIndex:90 }}>
            <a
                href="#"
                className="relative w-16 h-16 bg-[#3b82f6] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110 z-50 hover:bg-[#2563eb]"
                onClick={(e) => {
                    e.preventDefault();
                    onPrimaryAction?.();
                }}
            >
                <svg
                    className="w-8 h-8 transition-transform duration-500 ease-in-out group-hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </a>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-40 transition-all duration-500">
                {/* Home */}
                <a
                    href="#"
                    className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[150px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[50ms]"
                    onClick={(e) => {
                        e.preventDefault();
                        onHome?.();
                    }}
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                        <svg
                            className="w-5 h-5 text-gray-400 hover:text-[#3b82f6] transition-colors duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L3 9v11a2 2 0 002 2h4v-7h6v7h4a2 2 0 002-2V9L12 2z" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        Home
                    </span>
                </a>

                {/* Search */}
                <a
                    href="#"
                    className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[100ms]"
                    onClick={(e) => {
                        e.preventDefault();
                        onSearch?.();
                    }}
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                        <svg
                            className="w-5 h-5 text-gray-400 hover:text-[#3b82f6] transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        Search
                    </span>
                </a>

                {/* History */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onHistory?.();
                    }}
                    className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[75px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[150ms]"
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                        <svg
                            className="w-5 h-5 text-gray-400 hover:text-[#3b82f6] transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        History
                    </span>
                </a>

                {/* Profile */}
                <a
                    href="#"

                    className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[150px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[200ms]"
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                        <div className="dark-toggle">
                            <input
                                type="checkbox"
                                id="darkMode"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <label htmlFor="darkMode"></label>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        DarkMode
                    </span>
                </a>
            </div>
        </nav>
    );
}
