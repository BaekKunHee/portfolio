import { NotionContent, Project } from '@/app/types/portfolio';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NotionRenderer from './NotionRenderer';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [notionContent, setNotionContent] = useState<NotionContent | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlockChildren = async (blockId: string) => {
      try {
        const response = await fetch(
          `/api/notion/blocks/children?blockId=${blockId}`
        );
        const data = await response.json();
        console.log('Children blocks:', data);
        return data.blocks;
      } catch (error) {
        console.error('Failed to fetch block children:', error);
        return [];
      }
    };

    const fetchNotionContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/notion/page?pageId=${project.notionPageId}`
        );
        const data = await response.json();
        console.log('Initial blocks:', data);

        // 최상위 블록에 대해서만 children을 가져옴 (API에서 이미 재귀적으로 처리)
        const blocksWithChildren = await Promise.all(
          data.blocks.map(async (block: any) => {
            if (block.has_children) {
              console.log('Fetching children for block:', block.id);
              const children = await fetchBlockChildren(block.id);
              return { ...block, children };
            }
            return block;
          })
        );

        console.log('Blocks with children:', blocksWithChildren);
        setNotionContent({ blocks: blocksWithChildren });
      } catch (error) {
        console.error('Failed to fetch notion content:', error);
        setNotionContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNotionContent();
  }, [project.notionPageId]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed md:inset-10 inset-0 bg-[#2A2A2A] z-50 rounded-lg overflow-hidden"
      >
        <div className="sticky top-0 z-10 bg-[#2A2A2A] border-b border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
              <div className="hidden md:flex w-48 h-32 bg-neutral-100 rounded-lg items-center justify-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={200}
                  height={100}
                  className="w-[80px] h-[80px] object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-sm text-white rounded bg-gray-600">
                    {project.type}
                  </span>
                  {project.period && (
                    <span className="text-sm text-gray-400">
                      {project.period}
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-400 mb-2 text-sm md:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-black text-white rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100%-200px)] md:h-[calc(100%-180px)] overflow-y-auto bg-white">
          <div className="p-6 md:pb-20">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : notionContent?.blocks ? (
              <div className="max-w-3xl mx-auto text-black relative">
                <NotionRenderer blocks={notionContent.blocks} />
                <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50">
                  <a
                    href={`https://notion.so/${project.notionPageId.replace(
                      /-/g,
                      ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-3 text-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                    </svg>
                    <span className="font-medium">노션에서 보기</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-black">
                콘텐츠를 불러올 수 없습니다.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectModal;
