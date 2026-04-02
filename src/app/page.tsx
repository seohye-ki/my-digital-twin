'use client';

import { InterviewProvider, useInterview } from '@/context/InterviewContext';
import InterviewHeader from '@/components/InterviewHeader';
import InterviewStage from '@/components/InterviewStage';
import InterviewControls from '@/components/InterviewControls';
import InterviewSidebar from '@/components/InterviewSidebar';
import InterviewContextCards from '@/components/InterviewContextCards';
import InterviewReport from '@/components/InterviewReport';

function InterviewContent() {
  const { isEnding, isCompleted } = useInterview();

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 font-sans text-slate-900 transition-colors duration-500 selection:bg-blue-500/10">
      <InterviewHeader />

      <main className="flex-1 min-h-0 overflow-y-auto">
        <section className="flex flex-col p-5 items-center justify-between w-full min-h-[600px] h-full relative overflow-hidden">
          <InterviewStage />
          <InterviewControls />
          <InterviewSidebar />
        </section>
      </main>

      <InterviewContextCards />

      {/* Fade to Black Overlay during transition to report */}
      <div className={`fixed inset-0 z-[3000] bg-black/60 backdrop-blur-md transition-opacity duration-[1500ms] pointer-events-none ${isEnding && !isCompleted ? 'opacity-100' : 'opacity-0'}`} />

      <InterviewReport />

    </div>
  );
}

export default function Home() {
  return (
    <InterviewProvider>
      <InterviewContent />
    </InterviewProvider>
  );
}