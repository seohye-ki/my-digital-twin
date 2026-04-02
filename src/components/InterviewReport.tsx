'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Clock, Megaphone, Send, LayoutPanelTop } from 'lucide-react';
import { useInterview } from '@/context/InterviewContext';

export default function InterviewReport() {
  const { 
    isCompleted, 
    questionCount, 
    time, 
    formatTime, 
    totalReliability, 
    reliabilityCount, 
    messages 
  } = useInterview();

  if (!isCompleted) return null;

  return (
    <div className="fixed inset-0 z-[4000] flex flex-col bg-[#f8fafc] overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 animate-in zoom-in duration-700 pb-12">
        
        {/* 1. Header & Quick Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shrink-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-none mb-1">인터뷰 분석 리포트</h2>
                <p className="text-[11px] font-black text-blue-500/60 uppercase tracking-[0.2em]">AI Interview Report</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-black text-sm transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg shadow-blue-100"
            >
              <ArrowRight size={18} /> 지원자 더 알아보기
            </button>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 min-h-0 flex flex-col gap-6 md:gap-8 overflow-hidden">
          
          {/* 2. Stats Dashboard Bar */}
          {questionCount > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">진행 시간</span>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" />
                  <span className="text-2xl font-black text-slate-900 tabular-nums">{formatTime(time)}</span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">총 질문 수</span>
                <div className="flex items-center gap-2">
                  <Megaphone size={18} className="text-indigo-500" />
                  <span className="text-2xl font-black text-slate-900">{questionCount}회</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-lg shadow-blue-100 flex flex-col gap-1 text-white">
                <span className="text-[10px] font-black text-blue-100/60 uppercase tracking-widest">평균 답변 신뢰도</span>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-200" />
                  <span className="text-2xl font-black">
                    {reliabilityCount > 0 ? Math.round(totalReliability / reliabilityCount) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-8 min-h-0 overflow-hidden">
            {/* 3. Left Column: Professional Profile Card */}
            <div className="w-full lg:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col relative overflow-hidden group min-h-full"> 
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all" />
                
                <div className="flex flex-col items-center text-center mb-8 relative">
                  <div className="h-40 w-40 relative rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-xl mb-5 transition-transform duration-500">
                    <Image src="/images/interviewee.png" alt="Candidate" fill className="object-cover" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">김서현</h3>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">Web Developer</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Sparkles size={12} className="text-blue-500" /> Key Summary
                    </h4>
                    <p className="text-sm font-bold leading-relaxed text-slate-700 italic border-l-4 border-blue-500 pl-4 bg-slate-50/50 py-3.5 rounded-r-2xl">
                       &quot;{messages.length > 0 ? "더 넓은 시야로 문제를 바라보고, 집요하게 해결책을 찾아내는 개발자가 되겠습니다." : "면접 기회를 주셔서 감사합니다. 성실함과 열정으로 보답하겠습니다."}&quot;
                    </p>
                  </div>

                  <div className="space-y-3">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                       <LayoutPanelTop size={12} /> Contact & Links
                     </h4>
                     <div className="grid grid-cols-1 gap-2.5">
                        <a href="https://seohye-ki.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-[1.5rem] bg-white border border-slate-100 text-[13px] font-black text-slate-800 shadow-sm transition-all hover:bg-blue-50/50 hover:border-blue-200 hover:-translate-y-1 group">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-[0.8rem] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100 transition-transform group-hover:rotate-3 group-hover:scale-110">
                                 <Sparkles size={18} />
                              </div>
                              <div>
                                 <p className="font-black text-slate-900 leading-none mb-1">포트폴리오</p>
                                 <p className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors tracking-tight">자세히 보러가기</p>
                              </div>
                           </div>
                           <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-blue-100 transition-colors">
                              <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                           </div>
                        </a>
                        
                        <a href="https://github.com/seohye-ki" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-[1.5rem] bg-white border border-slate-100 text-[13px] font-black text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 group">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-[0.8rem] bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200 transition-transform group-hover:-rotate-3 group-hover:scale-110">
                                 <LayoutPanelTop size={18} />
                              </div>
                              <div>
                                 <p className="font-black text-slate-900 leading-none mb-1">Github</p>
                                 <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors tracking-tight">소스코드 확인하기</p>
                              </div>
                           </div>
                           <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-slate-200 transition-colors">
                              <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                           </div>
                        </a>
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-[13px] font-bold text-slate-500">
                           <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center text-slate-400">
                              <Send size={16} />
                           </div>
                           seohyeon.shkim@gmail.com
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Right Column: Interview Q&A Dashboard or Empty State */}
            <div className="flex-1 flex flex-col min-h-0 h-[600px] lg:h-full">
              {questionCount > 0 ? (
                <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col relative">
                  <div className="p-7 border-b border-slate-50 shrink-0 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                        <Megaphone size={16} />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 tracking-tight">질의응답 히스토리 분석</h4>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">{questionCount} Questions</span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-7 scroll-smooth bg-slate-50/20 scrollbar-visible">
                    <div className="space-y-6">
                      {messages.filter(m => m.role === 'user').map((msg, i) => {
                        const modelResp = messages[messages.indexOf(msg) + 1];
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="bg-white rounded-[1.8rem] border border-slate-100 p-6 shadow-sm transition-all duration-300">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                                <p className="font-black text-slate-900 text-sm md:text-base leading-snug">{msg.content}</p>
                              </div>
                               {modelResp?.role === 'model' && (
                                <div className="ml-6 pl-5 border-l-2 border-blue-50">
                                  <p className="text-xs md:text-sm font-bold text-slate-500 leading-relaxed transition-colors">
                                    {modelResp.content}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 p-12 text-center flex flex-col items-center justify-center">
                  <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-6">
                    <Sparkles size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900/40 mb-2">대화 내역이 없습니다</h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto text-sm leading-relaxed">
                    질문이 없거나 시간 초과로 종료되었습니다. 다음 면접때는 궁금한 점을 직접 물어보세요!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
