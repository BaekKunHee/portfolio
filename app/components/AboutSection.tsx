'use client';

import {
  learnMoreItems,
  type LearnMoreItem as LearnMoreItemType,
  type SkillItem as SkillItemType,
  skillSets,
} from '@/app/data/aboutData';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// Lottie 애니메이션 파일들을 동적 import
import flag from '@/public/assets/animations/flag.json';
import idea from '@/public/assets/animations/idea.json';
import mentorship from '@/public/assets/animations/mentorship.json';
import mission from '@/public/assets/animations/mission.json';
import user from '@/public/assets/animations/user.json';

const animationFiles = {
  flag: flag,
  idea: idea,
  mentorship: mentorship,
  mission: mission,
  user: user,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 },
};

const SkillItem = ({
  icon,
  label,
  isSoft,
}: SkillItemType & { isSoft: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center">
      {isSoft ? (
        <Lottie
          animationData={animationFiles[icon as keyof typeof animationFiles]}
          loop={true}
          autoplay={true}
          className="w-8 h-8 md:w-10 md:h-10"
        />
      ) : (
        <Image
          src={`/assets/icons/${icon}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={label}
          width={60}
          height={60}
          className="w-[16px] h-[16px] md:w-6 md:h-6"
        />
      )}
    </div>

    <span className="text-[#F5F5F5] text-xs md:text-sm text-center">
      {label}
    </span>
  </div>
);

const LearnMoreItem = ({ icon, text, url }: LearnMoreItemType) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group border-2 border-white/20 rounded-lg h-12 flex items-center justify-center gap-2 hover:bg-white/10 transition-all p-12 shadow-inner shadow-white/10"
  >
    <span className="text-white text-xl">
      <Image src={icon} alt={text} width={20} height={20} />
    </span>
    <span className="text-white text-md font-bold italic group-hover:underline">
      {text}
    </span>
  </a>
);

const AboutSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 pt-8 md:pt-24">
      {/* About Me */}

      {/* How I Think & Work 섹션 */}
      <motion.div {...fadeInUp} className="mb-10">
        <h2 className="text-2xl font-bold mb-4">How I Think & Work</h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Business-Driven Development */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#2A2A2A] p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#f5f5f5]">
              📌 Business-Driven Development
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                &ldquo;이 기능이 필요하다&rdquo;가 아니라 &ldquo;이 기능이
                비즈니스에 어떤 영향을 줄 것인가?&rdquo;를 먼저 생각합니다.
              </li>
              <br />
              <li>
                사용자 관점에서 가치를 만들어내고, 가설을 검증하면서 더 나은
                방향으로 개선하는 게 제 방식입니다.
              </li>
              <br />
              <li>
                데이터와 사용자 피드백을 기반으로 제품 성과를 측정하고, 최적의
                결정을 내리는 것이 핵심 원칙입니다.
              </li>
            </ul>
          </motion.div>

          {/* Work Approach */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#2A2A2A] p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#f5f5f5]">
              ⚙️ Work Methodology
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                Data-Driven Decision Making → 감이 아닌 데이터 기반으로 문제를
                해결
              </li>
              <br />
              <li>
                Trade-offs & Collaboration → 팀원들과 긴밀히 협력하여 최적의
                의사결정
              </li>
              <br />
              <li>
                Sustainable Development → 단기 성과가 아닌, 장기적으로
                유지보수하기 쉬운 코드와 구조 설계
              </li>
            </ul>
          </motion.div>

          {/* Frameworks */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#2A2A2A] p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#f5f5f5]">
              🛠️ Framework & Mindset
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                Agile & Lean Development → 빠르게 변화하는 시장에 맞춰 짧은
                주기의 반복적 개발로 효율성을 극대화
              </li>
              <br />
              <li>
                Growth Hacking - 데이터 기반으로 사용자의 행동을 분석하고,
                제품을 성장시키는 방법을 고민합니다.
              </li>
              <br />
              <li>
                Lean Development - 최소 비용으로 최대 가치를 제공하기 위해,
                불필요한 개발을 줄이고 핵심 기능에 집중합니다.
              </li>
            </ul>
          </motion.div>

          {/* Business Impact */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#2A2A2A] p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#f5f5f5]">
              🚀 Business Impact
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                UX 개선으로 전환율 20% 증가 → 단순한 기능 추가가 아니라, 사용자
                흐름 최적화
              </li>
              <br />
              <li>
                서비스 페이지 속도 50% 향상 → 프론트엔드 최적화(CDN, 코드
                스플리팅) + 백엔드 개선
              </li>
              <br />
              <li>
                자동화 도입으로 운영 비용 30% 절감 → 반복적인 수작업을
                자동화하여 비용 절감 & 생산성 향상
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills & Tools */}
      <motion.div {...fadeInUp} className="mb-8 md:mb-16">
        <h2 className="text-2xl font-bold mb-4">Skills & Tools</h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
        >
          {Object.entries(skillSets).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              className="p-6 md:p-8 rounded bg-[#242424]"
            >
              <span className="text-[#F5F5F5] font-bold mb-4 md:mb-4 block">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="flex justify-between items-center gap-2 md:gap-4">
                {skills.map((skill: SkillItemType, index: number) => (
                  <SkillItem
                    key={index}
                    {...skill}
                    isSoft={category === 'softSkills'}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* Learn More 섹션 */}
      <motion.div {...fadeInUp} className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Learn More</h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {learnMoreItems.map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <LearnMoreItem {...item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div {...fadeInUp} className="mb-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center w-full max-w-md mx-auto mt-8 space-y-4">
            <div className="w-full bg-[#2A2A2A] rounded-lg p-6 shadow-lg border border-white/10">
              <div className="w-40 h-40 relative animate-fade-in mx-auto mb-6">
                <Image
                  src="/assets/images/debear.jpeg"
                  alt="Profile"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fill
                  className="object-cover rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-400 text-right">이름</div>
                <div className="text-[#f5f5f5] col-span-2">
                  백건희(han.baek)
                </div>
                <div className="text-gray-400 text-right">생년월일</div>
                <div className="text-[#f5f5f5] col-span-2">94.05.21</div>

                <div className="text-gray-400 text-right">연락처</div>
                <div className="text-[#f5f5f5] col-span-2">010-9786-0799</div>

                <div className="text-gray-400 text-right">이메일</div>
                <div className="text-[#f5f5f5] col-span-2">
                  han.baek@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
