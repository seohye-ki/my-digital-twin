'use client';

import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';

export default function InterviewContextCards() {
  const { 
    contextCards, 
    isContextCardVisible, 
    setIsContextCardVisible, 
    contextCardKey,
    isCompleted
  } = useInterview();

  if (!isContextCardVisible || contextCards.length === 0 || isCompleted) return null;

  return (
    <div 
      key={contextCardKey}
      className="fixed right-6 md:right-8 top-24 z-[3200] flex flex-col items-end w-auto animate-in fade-in zoom-in slide-in-from-right-10 duration-700 ease-out fill-mode-forwards"
    >
      <div className="relative group/container">
        <button
          onClick={() => setIsContextCardVisible(false)}
          className="absolute -top-3 -right-3 z-[210] flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-lg hover:bg-slate-50 hover:text-slate-600 transition-all scale-90 hover:scale-100"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col gap-3">
          {contextCards.map((card, idx) => (
            <a
              key={idx}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-[320px] items-center gap-3 overflow-hidden rounded-[2rem] bg-white p-4 border border-slate-100 shadow-[0_30px_60px_-12px_rgba(37,99,235,0.25),0_18px_36px_-18px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-blue-400 hover:-translate-y-1"
            >
            <div className="absolute -inset-1 bg-white opacity-50 blur group-hover:opacity-100 transition-opacity shadow-md" />
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-white text-2xl shadow-xl relative z-10">
              {card.icon}
            </div>
            <div className="min-w-0 flex-1 relative z-10">
              <p className="text-[13px] font-black text-slate-900 truncate leading-tight mb-1">{card.title}</p>
              <p className="text-[10px] font-bold text-slate-500 line-clamp-1">{card.subtitle}</p>
              <div className="mt-1.5 flex items-center justify-between">
                 <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-500">View Project <ArrowRight size={10} /></span>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
        </div>
      </div>
    </div>
  );
}
