'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';

export default function InterviewStage() {
  const { 
    currentSubtitle, 
    reliability, 
    isAiLoading, 
    messages
  } = useInterview();

  const isWaiting = isAiLoading && (messages.length === 0 || messages[messages.length - 1]?.role === 'user');

  return (
    <div className="relative flex-1 w-full flex flex-col items-center justify-center min-h-0">
      <div className="group relative aspect-[3/4] sm:aspect-[4/3] min-[901px]:aspect-video w-full overflow-hidden rounded-[3rem] border-8 border-white bg-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
        <div
          className="absolute inset-0 bg-[url('/images/interview_bg.png')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
        </div>

        {/* Interviewee Image Area */}
        <div className="absolute inset-0 flex items-center justify-center pt-16 md:pt-24">
          <div className="relative h-[95%] md:h-[115%] w-full flex items-center justify-center transition-transform duration-700">
            <Image
              src="/images/interviewee.png"
              alt="Kim Seo-hyun"
              fill
              sizes="100vw"
              className="object-contain transition-all duration-1000"
            />
          </div>
        </div>

        {/* AI Subtitles Overlay */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 z-[3100] w-[92%] max-w-4xl -translate-x-1/2">
          <div className="animate-in fade-in slide-in-from-bottom-6 relative flex min-h-[60px] md:min-h-[90px] items-center justify-center rounded-[1.5rem] md:rounded-[2.5rem] border border-white/20 bg-slate-900/85 px-6 py-4 md:px-14 md:py-8 text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] backdrop-blur-2xl duration-700">
            {reliability !== null && !isAiLoading && (
              <div className="absolute -top-4 md:-top-5 right-6 md:right-12 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-1.5 md:gap-2 rounded-full border border-blue-400/30 bg-blue-600/60 px-3 py-1.5 md:px-5 md:py-2.5 shadow-xl backdrop-blur-xl">
                  <Sparkles className="text-white animate-pulse w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span className="text-[10px] md:text-[13px] font-black tracking-tight text-white uppercase">
                    신뢰도 <span className="text-blue-100 ml-1 md:ml-1.5">{reliability}%</span>
                  </span>
                </div>
              </div>
            )}
            {isAiLoading && !currentSubtitle ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Sparkles className="animate-pulse text-blue-400 w-4 h-4 md:w-6 md:h-6" />
                <span className="text-xs md:text-lg font-bold tracking-tight text-slate-300">답변을 구성 중입니다</span>
                <span className="flex gap-1 md:gap-2 ml-1 md:ml-2">
                   <span className="h-1.5 w-1.5 md:h-2 md:w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                   <span className="h-1.5 w-1.5 md:h-2 md:w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                   <span className="h-1.5 w-1.5 md:h-2 md:w-2 animate-bounce rounded-full bg-blue-400" />
                </span>
              </div>
            ) : (
              <p className="text-xs md:text-lg leading-relaxed font-bold tracking-tight text-white/95">
                {currentSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
