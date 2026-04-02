'use client';

import React from 'react';
import { LayoutPanelTop, X } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';
import { RECOMMENDED_QUESTIONS } from '@/data/interviewData';

export default function InterviewSidebar() {
  const { 
    isSidebarVisible, 
    setIsSidebarVisible, 
    handleQuestionClick,
    isAiLoading,
    isSpeaking,
    isInputLocked
  } = useInterview();

  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 z-[10000] w-[360px] max-w-[90vw] transform bg-white shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner">
                <LayoutPanelTop size={20} />
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-slate-900">질문 추천 리스트</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested Questions</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarVisible(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
            <div className="space-y-3">
              {RECOMMENDED_QUESTIONS.map((q: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(q)}
                  disabled={isAiLoading || isSpeaking || isInputLocked}
                  className="w-full text-left p-4 rounded-2xl border border-slate-100 bg-white text-[13px] font-bold leading-relaxed text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50/30 hover:text-blue-600 active:scale-[0.98] disabled:opacity-50"
                >
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 p-6 bg-slate-50/50">
            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              RECOMMENDED QUESTIONS
            </p>
          </div>
        </div>
      </aside>

      {isSidebarVisible && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}
    </>
  );
}
