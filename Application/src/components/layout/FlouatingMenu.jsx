import useDarkMode from "../../hooks/useDarkMode";
import useScreen from "../../hooks/useScreen";
import { useState, useEffect, useMemo } from 'react';
import "./stayle.css";

import { backup } from '../backup/config';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function FloatingMenu({
    onPrimaryAction,
    onHistory,
    onHome,
}) {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { screen, toggleScreen } = useScreen();

    const teste = async () => {

        toggleScreen()
        await delay(300);
        onHome?.();

    }


    return (
        <nav className="relative mb-10 group w-full h-0 flex items-center justify-center" style={{ position: 'fixed', bottom: 50, zIndex: 90 }}>
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
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                        <label className="cc-container">
                            <input type="checkbox"
                                checked={screen === "weekly" ? true : false}
                                onChange={teste}
                            />

                            <div className="cc-checkmark">
                                {/* Ícone NÃO */}
                                <svg className="cc-icon cc-no" viewBox="-1 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>calendar</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-311.000000, -361.000000)" fill="#ffffff"> <path d="M325,379 L327,379 L327,377 L325,377 L325,379 Z M325,387 L327,387 L327,385 L325,385 L325,387 Z M333,379 L335,379 L335,377 L333,377 L333,379 Z M333,387 L335,387 L335,385 L333,385 L333,387 Z M317,387 L319,387 L319,385 L317,385 L317,387 Z M339,369 L313,369 L313,367 C313,365.896 313.896,365 315,365 L319,365 L319,366 C319,366.553 319.447,367 320,367 C320.553,367 321,366.553 321,366 L321,365 L331,365 L331,366 C331,366.553 331.447,367 332,367 C332.553,367 333,366.553 333,366 L333,365 L337,365 C338.104,365 339,365.896 339,367 L339,369 L339,369 Z M337,379 C337,380.104 336.104,381 335,381 L333,381 C331.896,381 331,380.104 331,379 L331,377 C331,375.896 331.896,375 333,375 L335,375 C336.104,375 337,375.896 337,377 L337,379 L337,379 Z M337,387 C337,388.104 336.104,389 335,389 L333,389 C331.896,389 331,388.104 331,387 L331,385 C331,383.896 331.896,383 333,383 L335,383 C336.104,383 337,383.896 337,385 L337,387 L337,387 Z M329,379 C329,380.104 328.104,381 327,381 L325,381 C323.896,381 323,380.104 323,379 L323,377 C323,375.896 323.896,375 325,375 L327,375 C328.104,375 329,375.896 329,377 L329,379 L329,379 Z M329,387 C329,388.104 328.104,389 327,389 L325,389 C323.896,389 323,388.104 323,387 L323,385 C323,383.896 323.896,383 325,383 L327,383 C328.104,383 329,383.896 329,385 L329,387 L329,387 Z M321,379 C321,380.104 320.104,381 319,381 L317,381 C315.896,381 315,380.104 315,379 L315,377 C315,375.896 315.896,375 317,375 L319,375 C320.104,375 321,375.896 321,377 L321,379 L321,379 Z M321,387 C321,388.104 320.104,389 319,389 L317,389 C315.896,389 315,388.104 315,387 L315,385 C315,383.896 315.896,383 317,383 L319,383 C320.104,383 321,383.896 321,385 L321,387 L321,387 Z M337,363 L333,363 L333,362 C333,361.448 332.553,361 332,361 C331.447,361 331,361.448 331,362 L331,363 L321,363 L321,362 C321,361.448 320.553,361 320,361 C319.447,361 319,361.448 319,362 L319,363 L315,363 C312.791,363 311,364.791 311,367 L311,389 C311,391.209 312.791,393 315,393 L337,393 C339.209,393 341,391.209 341,389 L341,367 C341,364.791 339.209,363 337,363 L337,363 Z M317,379 L319,379 L319,377 L317,377 L317,379 Z" id="calendar" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                {/* Ícone SIM */}
                                <svg className="cc-icon cc-yes" fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M233.244,333.369h-73.956c-3.141,0-5.689,2.547-5.689,5.689v143.36c0,3.141,2.547,5.689,5.689,5.689h73.956 c3.141,0,5.689-2.547,5.689-5.689v-143.36C238.933,335.916,236.386,333.369,233.244,333.369z"></path> </g> </g> <g> <g> <path d="M233.244,179.769h-73.956c-3.141,0-5.689,2.547-5.689,5.689v108.089c0,3.141,2.547,5.689,5.689,5.689h73.956 c3.141,0,5.689-2.547,5.689-5.689V185.458C238.933,182.316,236.386,179.769,233.244,179.769z"></path> </g> </g> <g> <g> <path d="M352.711,333.369h-73.956c-3.141,0-5.689,2.547-5.689,5.689v143.36c0,3.141,2.547,5.689,5.689,5.689h73.956 c3.141,0,5.689-2.547,5.689-5.689v-143.36C358.4,335.916,355.853,333.369,352.711,333.369z"></path> </g> </g> <g> <g> <path d="M113.778,179.769H5.689c-3.141,0-5.689,2.547-5.689,5.689v108.089c0,3.141,2.547,5.689,5.689,5.689h108.089 c3.141,0,5.689-2.547,5.689-5.689V185.458C119.467,182.316,116.919,179.769,113.778,179.769z"></path> </g> </g> <g> <g> <path d="M472.175,54.613h-69.402V40.96c0-9.425-7.641-17.067-17.067-17.067S368.64,31.535,368.64,40.96v13.653H143.36V40.96 c0-9.425-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v13.653H39.825C17.83,54.613,0,72.443,0,94.438v45.509 c0,3.141,2.547,5.689,5.689,5.689h500.622c3.141,0,5.689-2.547,5.689-5.689V94.438C512,72.443,494.17,54.613,472.175,54.613z"></path> </g> </g> <g> <g> <path d="M113.778,333.369H5.689c-3.141,0-5.689,2.547-5.689,5.689v109.236c0,21.988,17.826,39.813,39.813,39.813h73.965 c3.141,0,5.689-2.547,5.689-5.689v-143.36C119.467,335.916,116.919,333.369,113.778,333.369z"></path> </g> </g> <g> <g> <path d="M506.311,333.369H398.222c-3.141,0-5.689,2.547-5.689,5.689v143.36c0,3.141,2.548,5.689,5.689,5.689h73.965 c21.988,0,39.813-17.826,39.813-39.813V339.058C512,335.916,509.453,333.369,506.311,333.369z"></path> </g> </g> <g> <g> <path d="M352.711,179.769h-73.956c-3.141,0-5.689,2.547-5.689,5.689v108.089c0,3.141,2.547,5.689,5.689,5.689h73.956 c3.141,0,5.689-2.547,5.689-5.689V185.458C358.4,182.316,355.853,179.769,352.711,179.769z"></path> </g> </g> <g> <g> <path d="M506.311,179.769H398.222c-3.141,0-5.689,2.547-5.689,5.689v108.089c0,3.141,2.548,5.689,5.689,5.689h108.089 c3.141,0,5.689-2.547,5.689-5.689V185.458C512,182.316,509.453,179.769,506.311,179.769z"></path> </g> </g> </g></svg>
                            </div>
                        </label>
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        Home
                    </span>
                </a>

                {/* Search */}
                <a
                    href="#"
                    className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[100ms]"
                    onClick={backup}
                >
                    <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                    
<svg width="64px" height="64px" viewBox="-7.92 -7.92 39.84 39.84" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#999"></path> </g></svg>                    
                    </div>
                    <span className="text-xs font-bold text-gray-700 text-center mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        Save
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
