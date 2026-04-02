# 👤 나의 디지털 트윈: 김서현 (Kim Seo-hyeon)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

신입 개발자의 경험과 기술 스택을 바탕으로 한 **AI 기반 디지털 트윈** 프로젝트입니다. 면접관이 실시간으로 대화하고 개발자의 역량을 검증할 수 있는 인터랙티브한 경험을 제공합니다.

## ✨ 핵심 기능

-   **🤖 AI 페르소나 (Gemini 2.5 Flash)**: 김서현 개발자의 정체성과 가치관을 학습한 AI가 1인칭으로 답변하며, 일관된 답변 원칙을 유지합니다.
-   **📚 RAG (검색 증강 생성) 기반 지연**: **Supabase Vector Store**와 연동하여, 실제 프로젝트 경험과 기술적 근거가 있는 내용만을 바탕으로 답변하여 할루시네이션(환각)을 최소화합니다.
-   **📈 신뢰도 점수 (Reliability Score)**: 각 답변마다 벡터 유사도에 기반한 신뢰도 점수를 제공하여 AI 답변의 근거 수준을 투명하게 공개합니다.
-   **🎙️ 실시간 음성 합성 (ElevenLabs)**: 실제 목소리를 복제한 고품질 TTS를 적용하여 더욱 생동감 넘치는 대화 경험을 선사합니다.
-   **⏲️ 프록시브 인지 (Silence Detection)**: 면접관이 오랫동안 응답이 없을 경우, 질문을 유도하거나 말을 거는 지능형 대화 유도 기능을 포함합니다.
-   **📊 인터뷰 분석 리포트**: 5개 질문이 완료되면 키워드 분석, 소프트 스킬 평가 등이 포함된 체계적인 성과 리포트를 자동 생성합니다.

## 🛠️ 기술 스택

-   **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
-   **AI Services**: Google Gemini AI (LLM & Embeddings), ElevenLabs (TTS)
-   **Database**: Supabase (PostgreSQL with pgvector)
-   **Styling & Components**: Lucide React, Framer Motion

## 🚀 시작하기

### 사전 준비 사항

-   Node.js 18.x 이상
-   Google Gemini API Key
-   ElevenLabs API Key 및 Voice ID
-   Supabase 프로젝트 (pgvector 확장 활성화 필요)

### 환경 변수 설정

루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 입력하세요:

```env
# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 설치 및 실행

1.  저장소 클론:
    ```bash
    git clone https://github.com/your-username/my-digital-twin.git
    cd my-digital-twin
    ```
2.  의존성 설치:
    ```bash
    npm install
    ```
3.  지식 베이스 구축 (선택 사항):
    ```bash
    npm run embed
    ```
4.  개발 서버 실행:
    ```bash
    npm run dev
    ```

## 📂 프로젝트 구조

-   `src/app`: Next.js 페이지 라우팅 및 API 엔드포인트
-   `src/components`: 채팅, 스테이지, 리포트 등 재사용 UI 컴포넌트
-   `src/context`: 전역 상태 관리를 위한 Context API
-   `src/data`: 원본 지식 데이터 및 임베딩 스크립트
-   `src/api`: Gemini, TTS, RAG 관련 백엔드 로직

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.


