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
    "🤖 AI & Automation Utilization",
    "💡 Product Design for Problem Solving",
    "📊 Data-Driven Growth Hacking",
    "⚡ Iterative Experimentation & Optimization",
    "🔥 Rapid MVP Development & Testing",
    "🧠 Data-Driven Decision Making",
  ],
  two: [
    "🚀 Fast Experimentation & Growth-Driven Development",
    "🏗 Lean & Agile Development",
    "🤝 Teamwork & Cross-functional Collaboration",
    "🎯 Focus on Core Problems",
    "🔍 First-Principles Thinking",
    "🛠 End-to-End Ownership",
    "🔄 Continuous Learning & Adaptation",
  ],
};

export const skillSets: SkillSets = {
  stack: [
    { icon: "next.svg", label: "Next.js" },
    { icon: "typescript.svg", label: "TypeScript" },
    { icon: "python.svg", label: "Python" },
    { icon: "flutter.svg", label: "Flutter" },
    { icon: "lowcode.svg", label: "LowCode" },
  ],
  infra: [
    { icon: "aws.svg", label: "AWS" },
    { icon: "docker.svg", label: "Docker" },
    { icon: "mysql.svg", label: "Database" },
    { icon: "kubernetes.svg", label: "Kubernetes" },
    { icon: "copilot.svg", label: "CI/CD" },
  ],
  tools: [
    { icon: "gpt.svg", label: "Prompt" },
    { icon: "figma.svg", label: "Figma" },
    { icon: "make.svg", label: "Automation" },
    { icon: "data.svg", label: "Analytics" },
    { icon: "jira.svg", label: "Jira" },
  ],
  softSkills: [
    { icon: "teamwork.svg", label: "팀워크" },
    { icon: "followership.svg", label: "팔로워쉽" },
    { icon: "problemsolving.svg", label: "문제해결" },
    { icon: "communication.svg", label: "의사소통" },
    { icon: "leadership.svg", label: "리더쉽" },
  ],
};

export const learnMoreItems: LearnMoreItem[] = [
  {
    icon: "/assets/icons/github.svg",
    text: "Github",
    url: "https://github.com/BaekKunHee",
  },
  {
    icon: "/assets/icons/link.svg",
    text: "Bio Link",
    url: "https://bit.ly/m/developer_bear",
  },
  {
    icon: "/assets/icons/notion.svg",
    text: "Notion",
    url: "https://han-baek.notion.site/HAN-Product-Hacker-21c7a57f96cb414fb69347aeeeb06f72?pvs=74",
  },
  {
    icon: "/assets/icons/medium.svg",
    text: "TBD",
    url: "#",
  },
];
