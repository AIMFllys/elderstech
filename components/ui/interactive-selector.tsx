"use client";

import React, { useState, useEffect } from 'react';

export interface SelectorOption {
    title: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
}

export interface InteractiveSelectorProps {
    title?: string;
    description?: string;
    options: SelectorOption[];
    className?: string;
}

export const InteractiveSelector = ({ title, description, options, className = "" }: InteractiveSelectorProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
    const [fullImage, setFullImage] = useState<string | null>(null);

    const handleOptionClick = (index: number) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        options.forEach((_, i) => {
            const timer = setTimeout(() => {
                setAnimatedOptions(prev => [...prev, i]);
            }, 180 * i);
            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [options]);

    return (
        <div className={`relative flex flex-col items-center justify-center bg-[#222] font-sans text-white py-12 ${className}`}>
            {/* Header Section */}
            {(title || description) && (
                <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
                    {title && <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">{title}</h1>}
                    {description && <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">{description}</p>}
                </div>
            )}

            {(title || description) && <div className="h-12"></div>}

            {/* Options Container */}
            <div className="options flex w-full max-w-[1200px] min-w-[300px] md:min-w-[600px] h-[500px] mx-0 items-stretch overflow-hidden relative px-4 md:px-0">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
                        style={{
                            backgroundImage: `url('${option.image}')`,
                            backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                            backgroundPosition: 'center',
                            backfaceVisibility: 'hidden',
                            opacity: animatedOptions.includes(index) ? 1 : 0,
                            transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                            minWidth: activeIndex === index ? '120px' : '40px',
                            minHeight: '100px',
                            margin: 0,
                            borderRadius: 0,
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: activeIndex === index ? '#fff' : '#292929',
                            cursor: 'pointer',
                            backgroundColor: '#18181b',
                            boxShadow: activeIndex === index
                                ? '0 20px 60px rgba(0,0,0,0.50)'
                                : '0 10px 30px rgba(0,0,0,0.30)',
                            flex: activeIndex === index ? '25 1 0%' : '1 1 0%',
                            zIndex: activeIndex === index ? 10 : 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            overflow: 'hidden',
                            willChange: 'flex-grow, box-shadow, background-size, background-position'
                        }}
                        onClick={() => handleOptionClick(index)}
                    >
                        {/* Shadow effect */}
                        <div
                            className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                            style={{
                                bottom: activeIndex === index ? '0' : '-40px',
                                height: '120px',
                                boxShadow: activeIndex === index
                                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
                            }}
                        ></div>

                        {/* Label with icon and info */}
                        <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                            {option.icon && (
                                <div
                                    className={`icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200 ${activeIndex === index ? 'pointer-events-auto cursor-pointer hover:bg-white/20 hover:scale-110' : ''}`}
                                    onClick={(e) => {
                                        if (activeIndex === index) {
                                            e.stopPropagation();
                                            setFullImage(option.image);
                                        }
                                    }}
                                    title={activeIndex === index ? "点击展开照片" : ""}
                                >
                                    {option.icon}
                                </div>
                            )}
                            <div className="info text-white whitespace-pre relative">
                                <div
                                    className="main font-bold text-lg md:text-xl transition-all duration-700 ease-in-out"
                                    style={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                    }}
                                >
                                    {option.title}
                                </div>
                                {option.description && (
                                    <div
                                        className="sub text-sm md:text-base text-gray-300 transition-all duration-700 ease-in-out hidden md:block"
                                        style={{
                                            opacity: activeIndex === index ? 1 : 0,
                                            transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                        }}
                                    >
                                        {option.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Aesthetic Full Screen Photo Frame Overlay */}
            {fullImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeInTop transition-all"
                    onClick={() => setFullImage(null)}
                >
                    <div
                        className="relative flex flex-col items-center justify-center p-6 pb-20 md:p-8 md:pb-24 bg-[#fafefc] shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(255,255,255,0.15)] rounded-sm cursor-default transform transition-all duration-500 hover:-translate-y-1"
                        style={{ border: '2px solid #e5e5e5' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setFullImage(null)}
                            className="absolute z-[110] -top-5 -right-5 md:-top-6 md:-right-6 p-3 bg-white hover:bg-red-50 text-gray-800 shadow-xl rounded-full transition-all transform hover:scale-110 border border-gray-200 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <div className="relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 bg-gray-100 p-1">
                            <img
                                src={fullImage}
                                alt="Expanded detail"
                                className="max-h-[70vh] md:max-h-[75vh] max-w-[85vw] md:max-w-[75vw] object-contain"
                            />
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center">
                            <span className="text-gray-400 text-xs md:text-sm tracking-[0.3em] font-light uppercase">
                                Field Study Record
                            </span>
                            <span className="text-gray-300 text-xs mt-1 font-serif italic">
                                桑梓智护 心驿耆年
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom animations */}
            <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
        </div>
    );
};

export default InteractiveSelector;
