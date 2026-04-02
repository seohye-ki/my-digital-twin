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
  "지금까지 가장 힘들었던 경험은 무엇이고, 어떻게 극복했나요?",
  "팀 내에서 의견 충돌이 있었던 경험을 말씀해주세요. 어떻게 해결했나요?",
  "본인이 주도적으로 문제를 발견하고 개선한 경험이 있다면 구체적으로 말씀해주세요.",
  "팀 프로젝트에서 본인의 역할 이상으로 기여한 경험이 있나요?",
  "실패했거나 아쉬웠던 경험과 거기서 무엇을 배웠는지 말씀해주세요."
];

export const FINAL_GREETING = "팀의 일원이 되어 함께 문제를 해결하고 성장할 수 있는 기회를 꼭 얻고 싶습니다. 실제 현장에서도 신뢰받는 개발자로서 제 역량을 증명해 보이고 싶습니다. 긍정적인 검토 부탁드리며, 좋은 소식 기다리고 있겠습니다. 감사합니다!";
