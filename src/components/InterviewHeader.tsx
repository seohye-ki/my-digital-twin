'use client';

import React from 'react';
import { Users, Clock, LayoutPanelTop } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';

export default function InterviewHeader() {
  const { time, formatTime, isSidebarVisible, setIsSidebarVisible } = useInterview();

  return (
    <header className="flex h-auto p-5 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 relative z-50 shrink-0 shadow-sm">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
          <Users size={20} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-tight text-slate-900 md:text-base leading-none">
            2026 상반기 신입 개발자 채용 면접
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Interview Room</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-red-600 shadow-sm border border-red-100">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-black tracking-wider uppercase">REC</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 border-l border-slate-200 pl-4 md:pl-6">
          <Clock size={16} className="text-blue-500" />
          <span className="text-xs font-bold tabular-nums">
            {formatTime(time)}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className={`flex h-10 px-4 items-center gap-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
            isSidebarVisible
              ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-inner'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
          }`}
        >
          <LayoutPanelTop size={18} />
          <span className="hidden text-xs font-bold md:block">질문 리스트</span>
        </button>
      </div>
    </header>
  );
}
