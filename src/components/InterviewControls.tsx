'use client';

import React from 'react';
import { Send, Megaphone, Volume2, VolumeX, X } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';

export default function InterviewControls() {
  const {
    questionInput, setInput,
    isAiLoading, isSpeaking, isInputLocked,
    isTtsActive, setIsTtsActive,
    showEndConfirmation, setShowEndConfirmation,
    handleEndInterview, finishInterview,
    sendQuestion
  } = useInterview();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(questionInput);
  };

  return (
    <div className="w-full max-w-5xl mt-6 mb-12 flex flex-col items-center gap-4 min-h-0">
      <div className="flex flex-col md:flex-row w-full items-center gap-3 md:gap-4 px-2 sm:px-0">
        <form
          onSubmit={handleFormSubmit}
          className="group relative flex w-full md:flex-1 items-center transition-all"
        >
          <input
            value={questionInput}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAiLoading || isSpeaking || isInputLocked}
            maxLength={100}
            placeholder="질문을 입력하거나 추천 리스트를 활용해보세요."
            className="w-full rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 bg-white py-4 md:py-5 pr-16 md:pr-20 pl-12 md:pl-16 text-[13px] md:text-base font-bold transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 focus:outline-none disabled:bg-slate-50 disabled:text-slate-300 shadow-lg"
          />
          <div className="absolute left-5 md:left-7 text-slate-300 transition-colors group-focus-within:text-blue-500">
            <Megaphone size={20} className="md:w-6 md:h-6" />
          </div>
          <button
            type="submit"
            disabled={!questionInput.trim() || isAiLoading || isSpeaking || isInputLocked}
            className="absolute right-2 rounded-[1rem] md:rounded-[1.2rem] bg-blue-600 p-2 md:p-2.5 text-white shadow-xl transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale"
          >
            <Send size={18} className="md:w-5 md:h-5" />
          </button>
        </form>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <button
            onClick={() => setIsTtsActive(!isTtsActive)}
            className={`flex h-[56px] md:h-[68px] flex-1 md:min-w-[130px] items-center justify-center gap-2 md:gap-3 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all shadow-lg hover:scale-105 active:scale-95 ${
              isTtsActive 
              ? 'border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100/50' 
              : 'border-slate-200 bg-white text-slate-400 hover:border-blue-300 hover:text-blue-500'
            }`}
          >
            {isTtsActive ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[11px] md:text-xs font-bold">{isTtsActive ? 'TTS ON' : 'TTS OFF'}</span>
            </div>
          </button>

          <div className="relative flex-[1.2]">
            {showEndConfirmation && (
              <>
                <div 
                  className="fixed inset-0 z-[4999]" 
                  onClick={() => setShowEndConfirmation(false)} 
                />
                <div className="absolute bottom-full right-0 mb-4 z-[5000] w-[260px] md:w-[300px] animate-in slide-in-from-bottom-2 fade-in duration-300">
                  <div className="bg-white rounded-[1.8rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col gap-4 relative">
                    <div className="absolute -bottom-2 right-8 md:right-12 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45" />
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 h-9 w-9 rounded-xl flex items-center justify-center text-red-500">
                        <X size={20} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-black text-slate-900 leading-tight">면접을 종료할까요?</h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">현재 내용으로 리포트가 생성됩니다.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={finishInterview}
                        className="flex-1 py-3 rounded-xl bg-red-500 text-white font-black text-xs hover:bg-red-600 hover:scale-105 transition-all active:scale-95 shadow-md"
                      >
                        예, 종료합니다
                      </button>
                      <button 
                        onClick={() => setShowEndConfirmation(false)}
                        className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 font-black text-xs hover:bg-slate-200 hover:scale-105 transition-all active:scale-95"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handleEndInterview}
              className="w-full h-[56px] md:h-[68px] md:px-6 items-center justify-center gap-2 md:gap-3 rounded-[1.5rem] md:rounded-[2rem] bg-red-500 text-white shadow-lg transition-all hover:bg-red-600 hover:scale-105 active:scale-95 group flex"
            >
              <X size={18} className="transition-transform group-hover:rotate-90 md:w-5 md:h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs md:text-sm font-black whitespace-nowrap">면접 종료</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 opacity-80 text-center">
        <p className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase">
          본 인터페이스의 보이스는 김서현의 음성을 클로닝하였습니다.
        </p>
      </div>
    </div>
  );
}
