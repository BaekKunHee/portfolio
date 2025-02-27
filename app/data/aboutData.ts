export interface SkillItem {
  icon: string;
  label: string;
}

export interface LearnMoreItem {
  icon: string;
  text: string;
  url: string;
}

export interface SkillSets {
  stack: SkillItem[];
  infra: SkillItem[];
  tools: SkillItem[];
  softSkills: SkillItem[];
}

export const badges = {
  one: [
    '🤖 AI & Automation Utilization',
    '💡 Product Design for Problem Solving',
    '📊 Data-Driven Growth Hacking',
    '⚡ Iterative Experimentation & Optimization',
    '🔥 Rapid MVP Development & Testing',
    '🧠 Data-Driven Decision Making',
  ],
  two: [
    '🚀 Fast Experimentation & Growth-Driven Development',
    '🏗 Lean & Agile Development',
    '🤝 Teamwork & Cross-functional Collaboration',
    '🎯 Focus on Core Problems',
    '🔍 First-Principles Thinking',
    '🛠 End-to-End Ownership',
    '🔄 Continuous Learning & Adaptation',
  ],
};

export const skillSets: SkillSets = {
  stack: [
    { icon: 'next.svg', label: 'Next.js' },
    { icon: 'typescript.svg', label: 'TypeScript' },
    { icon: 'python.svg', label: 'Python' },
    { icon: 'flutter.svg', label: 'Flutter' },
    { icon: 'lowcode.svg', label: 'LowCode' },
  ],
  infra: [
    { icon: 'aws.svg', label: 'AWS' },
    { icon: 'docker.svg', label: 'Docker' },
    { icon: 'mysql.svg', label: 'Database' },
    { icon: 'kubernetes.svg', label: 'Kubernetes' },
    { icon: 'copilot.svg', label: 'CI/CD' },
  ],
  tools: [
    { icon: 'gpt.svg', label: 'Prompt' },
    { icon: 'figma.svg', label: 'Figma' },
    { icon: 'make.svg', label: 'Automation' },
    { icon: 'data.svg', label: 'Analytics' },
    { icon: 'jira.svg', label: 'Jira' },
  ],
  softSkills: [
    { icon: 'idea', label: '팀워크' },
    { icon: 'user', label: '팔로워쉽' },
    { icon: 'mission', label: '문제해결' },
    { icon: 'mentorship', label: '의사소통' },
    { icon: 'flag', label: '리더쉽' },
  ],
};

export const learnMoreItems: LearnMoreItem[] = [
  {
    icon: '/assets/icons/github.svg',
    text: 'Github',
    url: 'https://github.com/BaekKunHee',
  },
  {
    icon: '/assets/icons/link.svg',
    text: 'Bio Link',
    url: 'https://bit.ly/m/han_baek',
  },
  {
    icon: '/assets/icons/notion.svg',
    text: 'Notion',
    url: 'https://www.notion.so/baek-kun-hee-123456',
  },
  {
    icon: '/assets/icons/medium.svg',
    text: 'Resume',
    url: 'https://han-baek.notion.site/Han-Baek-Problem-Solver-18fca87a5280804a8765dbc6aac4a7c1?pvs=4',
  },
];
