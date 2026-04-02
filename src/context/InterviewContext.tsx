'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

import { ProjectLink, PROJECT_LINKS, RECOMMENDED_QUESTIONS, PROACTIVE_MESSAGES, INITIAL_CAPTION, FINAL_GREETING } from '@/data/interviewData';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface InterviewContextType {
  // States
  time: number;                   // Elapsed session time in seconds
  isSidebarVisible: boolean;      // Controls visibility of the suggestions sidebar
  messages: Message[];            // Conversation history between user and AI
  questionInput: string;          // Current value of the chat input field
  isAiLoading: boolean;           // True when waiting for AI response
  isInputLocked: boolean;         // Disables input briefly after sending
  currentSubtitle: string;        // Text being shown in the typewriter-effect subtitle
  reliability: number | null;     // Latest AI response similarity/reliability score
  isTtsActive: boolean;           // Whether Text-to-Speech is active
  isSpeaking: boolean;            // True when AI is currently speaking (audio playing)
  isSubtitleReady: boolean;          // Internal flag for caption animation sync
  isEnding: boolean;              // Triggered when interview termination begins (final greeting)
  isCompleted: boolean;           // Show final report dashboard
  showEndConfirmation: boolean;   // Controls the "Exit Interview" modal
  questionCount: number;          // Total questions asked by the user
  totalReliability: number;       // Sum of all reliability scores for averaging
  reliabilityCount: number;       // Number of scored responses
  contextCards: ProjectLink[];    // Dynamic info cards based on keywords
  isContextCardVisible: boolean;  // Visibility of the project info card
  contextCardKey: number;         // Key used to force-reanimate info cards
  
  // Setters/Actions
  setInput: (val: string) => void;
  setIsSidebarVisible: (val: boolean) => void;
  setIsTtsActive: (val: boolean) => void;
  setShowEndConfirmation: (val: boolean) => void;
  setIsContextCardVisible: (val: boolean) => void;
  
  sendQuestion: (text: string) => Promise<void>;
  handleQuestionClick: (question: string) => void;
  handleEndInterview: () => void;
  finishInterview: () => Promise<void>;
  formatTime: (seconds: number) => string;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionInput, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isInputLocked, setIsInputLocked] = useState(false);
  const [currentSubtitle, setcurrentSubtitle] = useState('');
  const [reliability, setReliability] = useState<number | null>(null);
  const [isTtsActive, setIsTtsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSubtitleReady, setIsSubtitleReady] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalReliability, setTotalReliability] = useState(0);
  const [reliabilityCount, setReliabilityCount] = useState(0);
  const [contextCards, setContextCards] = useState<ProjectLink[]>([]);
  const [isContextCardVisible, setIsContextCardVisible] = useState(false);
  const [contextCardKey, setcontextCardKey] = useState(0);


  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const contextCardTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isTtsActiveRef = useRef(isTtsActive);
  const isAiLoadingRef = useRef(isAiLoading);
  const isSpeakingRef = useRef(isSpeaking);
  const isInputLockedRef = useRef(isInputLocked);
  const isEndingRef = useRef(isEnding);
  const isCompletedRef = useRef(isCompleted);

  useEffect(() => { isTtsActiveRef.current = isTtsActive; }, [isTtsActive]);
  useEffect(() => { isAiLoadingRef.current = isAiLoading; }, [isAiLoading]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { isInputLockedRef.current = isInputLocked; }, [isInputLocked]);
  useEffect(() => { isEndingRef.current = isEnding; }, [isEnding]);
  useEffect(() => { isCompletedRef.current = isCompleted; }, [isCompleted]);

  /**
   * Resets the inactivity timer. 
   * If the user is silent for 90 seconds, the AI triggers a proactive message.
   */
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    if (isEndingRef.current || isCompletedRef.current) return;

    idleTimerRef.current = setTimeout(() => {
      if (isEndingRef.current || isCompletedRef.current) return;

      if (isAiLoadingRef.current || isSpeakingRef.current || isInputLockedRef.current) {
        resetIdleTimer();
        return;
      }
      const randomMsg = PROACTIVE_MESSAGES[Math.floor(Math.random() * PROACTIVE_MESSAGES.length)];
      setMessages(prev => [...prev, { role: 'model', content: randomMsg }]);
      setReliability(null);
      speak(randomMsg, true);
    }, 90000); // 90 seconds
  };

  /**
   * Scans the provided text for keywords and triggers the corresponding info card.
   */
  const detectContextCards = (text: string) => {
    // skip if interview is ending
    if (isEndingRef.current) return;

    const firstMatch = PROJECT_LINKS.find(project =>
      project.keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()))
    );

    if (firstMatch) {
      if (contextCardTimeoutRef.current) clearTimeout(contextCardTimeoutRef.current);
      setContextCards([firstMatch]);
      setcontextCardKey(Date.now());
      setIsContextCardVisible(true);
      contextCardTimeoutRef.current = setTimeout(() => setIsContextCardVisible(false), 12000);
    }
  };

  /**
   * Main function to handle AI speech. Handles both TTS audio and 
   * fallback text-only (typewriter) display logic.
   */
  const speak = (text: string, skipLoading: boolean = false) => {
    return new Promise<void>(async (resolve) => {
      try {
        setcurrentSubtitle('');
        setIsSubtitleReady(false);
        if (!skipLoading) setIsAiLoading(true);

        if (isTtsActiveRef.current) {
          const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          
          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(url);
            resetIdleTimer();
            resolve();
          };
          audio.onerror = () => {
            setIsSpeaking(false);
            resetIdleTimer();
            resolve();
          };
          
          setIsAiLoading(false);
          setIsSubtitleReady(true);
          setIsSpeaking(true);
          detectContextCards(text);
          await audio.play();
        } else {
          const startSpeak = () => {
            setIsAiLoading(false);
            setIsSubtitleReady(true);
            setIsSpeaking(true);
            detectContextCards(text);
            const duration = Math.max(1500, text.length * 60); 
            setTimeout(() => {
              setIsSpeaking(false);
              resetIdleTimer();
              resolve();
            }, duration);
          };
          if (skipLoading) startSpeak(); else setTimeout(startSpeak, 800);
        }
      } catch (e) {
        console.error('speak error:', e);
        setIsAiLoading(false);
        setIsSubtitleReady(true);
        detectContextCards(text);
        setIsSpeaking(false);
        resetIdleTimer();
        resolve();
      }
    });
  };

  /**
   * Sends user's question to the AI, handles streaming response, 
   * and calculates reliability metrics.
   */
  const sendQuestion = async (text: string) => {
    if (!text.trim() || isAiLoading || isSpeaking || isInputLocked) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsContextCardVisible(false);
    setIsAiLoading(true);
    setIsSubtitleReady(false);
    setReliability(null);

    const newUserMessage = { role: 'user' as const, content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setQuestionCount(prev => prev + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다.');

      const scoreHeader = response.headers.get('X-Similarity-Score');
      if (scoreHeader) {
        const score = parseFloat(scoreHeader);
        const scorePercent = Math.round(score * 100);
        setReliability(scorePercent);
        setTotalReliability(prev => prev + scorePercent);
        setReliabilityCount(prev => prev + 1);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages([...updatedMessages, { role: 'model', content: assistantContent }]);
      }
      speak(assistantContent);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...updatedMessages, { role: 'model', content: '죄송합니다. 오류가 발생했습니다.' }]);
      setIsAiLoading(false);
    } finally {
      setIsInputLocked(true);
      setTimeout(() => {
        setIsInputLocked(false);
        setInput(''); 
      }, 2000);
    }
  };

  /**
   * Auto-submits a question (used by sidebar suggestions).
   */
  const handleQuestionClick = (question: string) => {
    if (isAiLoading || isSpeaking || isInputLocked) return;
    setIsSidebarVisible(false);
    setInput(question);
    sendQuestion(question);
  };

  /**
   * Opens the end-interview confirmation modal.
   */
  const handleEndInterview = () => {
    if (isEnding || isCompleted) return;
    setShowEndConfirmation(true);
  };

  /**
   * Finalizes the session: plays final greeting and switches to the report dashboard.
   */
  const finishInterview = async () => {
    setShowEndConfirmation(false);
    setIsEnding(true);
    isEndingRef.current = true; // force update ref immediately
    setIsContextCardVisible(false); // remove any existing cards

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    setReliability(null);
    await speak(FINAL_GREETING, true);
    
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    setIsEnding(false);
    setIsCompleted(true);
  };

  /**
   * Utility to format seconds into MM:SS display format.
   */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Initial setup
  useEffect(() => {
    setIsSubtitleReady(true);
    speak(INITIAL_CAPTION).then(() => {
      resetIdleTimer();
    });
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (isCompleted || isEnding) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isCompleted, isEnding]);

  // Auto-termination logic
  useEffect(() => {
    if (isCompleted || isEnding || showEndConfirmation) return;
    if (time >= 600 || questionCount >= 5) {
      setIsCompleted(true);
    }
  }, [time, questionCount, isCompleted, isEnding, showEndConfirmation]);

  // Caption effect
  useEffect(() => {
    const isWaiting = isAiLoading && (messages.length === 0 || messages[messages.length - 1]?.role === 'user');
    const lastAiMessage = [...messages].reverse().find((m) => m.role === 'model');
    const fullCaption = isEnding ? FINAL_GREETING : (isWaiting ? '' : (lastAiMessage ? lastAiMessage.content : INITIAL_CAPTION));

    if (isWaiting || !isSubtitleReady) {
      setcurrentSubtitle('');
      return;
    }

    if (currentSubtitle.length < fullCaption.length) {
      if (!fullCaption.startsWith(currentSubtitle)) {
        setcurrentSubtitle(fullCaption[0] || '');
        return;
      }
      const timer = setTimeout(() => {
        setcurrentSubtitle(fullCaption.slice(0, currentSubtitle.length + 1));
      }, 35);
      return () => clearTimeout(timer);
    }
  }, [messages, isAiLoading, isEnding, isSubtitleReady, currentSubtitle]);

  return (
    <InterviewContext.Provider value={{
      messages, questionInput, isAiLoading, isInputLocked, time, isSidebarVisible, currentSubtitle,
      reliability, isTtsActive, isSpeaking, isSubtitleReady, isEnding,
      isCompleted, showEndConfirmation, questionCount, totalReliability, reliabilityCount,
      contextCards, isContextCardVisible, contextCardKey,
      setInput, setIsSidebarVisible, setIsTtsActive, setShowEndConfirmation, setIsContextCardVisible,
      sendQuestion, handleQuestionClick, handleEndInterview, finishInterview, formatTime
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
