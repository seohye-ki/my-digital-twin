export interface ProjectLink {
  keywords: string[];
  title: string;
  subtitle: string;
  href: string;
  icon: string;
}

export const PROJECT_LINKS: ProjectLink[] = [
  {
    keywords: ['LuFin', '루핀', '금융교육', '핀테크'],
    title: 'LuFin',
    subtitle: '신용도 기반 초등학생 금융교육 시뮬레이션',
    href: 'https://seohye-ki.github.io/projects/lufin.html',
    icon: '💰',
  },
  {
    keywords: ['DocshunD', '닥스훈트', '공동번역', '커뮤니티'],
    title: 'DocshunD',
    subtitle: 'IT 공식문서 공동 번역 & 커뮤니티',
    href: 'https://seohye-ki.github.io/projects/docshund.html',
    icon: '📚',
  },
  {
    keywords: ['Spico', '스피코', '발표 코칭', 'AI 코칭'],
    title: 'Spico',
    subtitle: 'AI 발표 코칭 애플리케이션',
    href: 'https://seohye-ki.github.io/projects/spico.html',
    icon: '🎤',
  },
  {
    keywords: ['EVERYMATCH', '에브리매치', '스포츠 캘린더'],
    title: 'EVERYMATCH',
    subtitle: '프로스포츠 경기일정 통합 캘린더',
    href: 'https://seohye-ki.github.io/projects/everymatch.html',
    icon: '⚽',
  },
  {
	keywords: ['42서울', '42seoul', '라피신', 'c언어'],
	title: '42 Seoul',
	subtitle: '자기주도적 성장을 위한 과제 기반 학습',
	href: 'https://seohye-ki.github.io/projects/42seoul.html',
	icon: '💻',
  },
  {
    keywords: ['포트폴리오', 'portfolio', '경험', '역량'],
    title: '포트폴리오',
    subtitle: '김서현 포트폴리오',
    href: 'https://seohye-ki.github.io/',
    icon: '🔗',
  },  
  {
    keywords: ['깃허브', 'github', '구현', '코드'],
    title: '깃허브',
    subtitle: '김서현 깃허브',
    href: 'https://github.com/seohye-ki',
    icon: '🔗',
  },
];

export const INITIAL_CAPTION = '안녕하세요. 면접관님! 지원자 김서현입니다. 면접기회를 주셔서 감사합니다.';


export const PROACTIVE_MESSAGES = [
	"언제든 편하게 질문해 주세요.",
	"편하게 질문 주시면 최선을 다해 답변해 드리겠습니다.",
	"우측 상단 버튼을 누르시면 추천 질문 목록을 보실 수 있습니다."
];

export const RECOMMENDED_QUESTIONS = [
  {
    category: "자기소개",
    questions: [
      "본인을 한 단어로 표현해본다면?",
      "가족이나 친구들은 본인을 어떤 사람이라고 하나요?",
    ]
  },
  {
    category: "장단점",
    questions: [
      "자신의 장점과 단점을 각각 사례와 함께 설명해보세요.",
      "다른 지원자와 차별화되는 강점이 있다면?",
      "본인의 단점은 무엇이고, 어떻게 극복하고 있나요?",
    ]
  },
  {
    category: "경험·성과",
    questions: [
      "팀 프로젝트에서 갈등이 발생했을 때 어떻게 해결했나요?",
      "본인이 주도적으로 문제를 발견하고 개선한 경험이 있다면?",
      "팀 프로젝트에서 본인의 역할 이상으로 기여한 경험이 있나요?",
      "실패했거나 아쉬웠던 경험과 거기서 무엇을 배웠나요?",
      "도전적인 목표를 세우고 성공했던 경험이 있나요?",
      "팀이나 조직을 이끌었던 경험을 말씀해주세요.",
    ]
  },
  {
    category: "가치관",
    questions: [
      "전공(경영학)과 다른 개발 직무를 선택한 이유가 뭔가요?",
      "결과와 과정 중 어느 것이 더 중요하다고 생각하나요?",
    ]
  },
  {
    category: "조직생활",
    questions: [
      "협업에서 가장 중요하게 생각하는 요소는 무엇인가요?",
	  "팀에서 본인이 주로 맡는 역할은 무엇인가요? (리더 / 팔로워 등)",
      "같이 일하기 싫은 동료나 상사 유형이 있다면 말씀해주세요.",
    ]
  },
  {
    category: "개인",
    questions: [
      "스트레스를 받을 때 본인만의 해소 방법이 있나요?",
      "취미나 여가 시간을 어떻게 보내시나요?",
      "요즘 따로 하고 있는 자기계발이 있나요?",
    ]
  }
];

export const FINAL_GREETING = "팀의 일원이 되어 함께 문제를 해결하고 성장할 수 있는 기회를 꼭 얻고 싶습니다. 실제 현장에서도 신뢰받는 개발자로서 제 역량을 증명해 보이고 싶습니다. 긍정적인 검토 부탁드리며, 좋은 소식 기다리고 있겠습니다. 감사합니다!";
