import { NotionBlock } from "@/app/types/portfolio";

interface NotionRendererProps {
  blocks: NotionBlock[];
}

const NotionRenderer = ({ blocks }: NotionRendererProps) => {
  console.log(blocks);
  const renderBlock = (block: NotionBlock) => {
    try {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={block.id} className="text-black mb-4">
              {block.paragraph?.rich_text?.map((text: any, index: number) =>
                text.href ? (
                  <a
                    key={index}
                    href={text.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-600 hover:underline
                      ${text.annotations?.bold ? "font-bold" : ""} 
                      ${text.annotations?.italic ? "italic" : ""} 
                      ${text.annotations?.underline ? "underline" : ""}`}
                  >
                    {text.plain_text}
                  </a>
                ) : (
                  <span
                    key={index}
                    className={`${text.annotations?.bold ? "font-bold" : ""} 
                               ${text.annotations?.italic ? "italic" : ""} 
                               ${
                                 text.annotations?.underline ? "underline" : ""
                               }`}
                  >
                    {text.plain_text}
                  </span>
                )
              ) || ""}
            </p>
          );

        case "heading_1":
          return (
            <h1
              key={block.id}
              className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-2"
            >
              {block.heading_1?.rich_text
                ?.map((text: any) => text.plain_text)
                .join("") || ""}
            </h1>
          );

        case "heading_2":
          return (
            <h2
              key={block.id}
              className="text-2xl font-bold mt-8 mb-4 text-black"
            >
              {block.heading_2?.rich_text
                ?.map((text: any) => text.plain_text)
                .join("") || ""}
            </h2>
          );

        case "heading_3":
          return (
            <h3
              key={block.id}
              className="text-xl font-bold mt-6 mb-3 text-black"
            >
              {block.heading_3?.rich_text
                ?.map((text: any) => text.plain_text)
                .join("") || ""}
            </h3>
          );

        case "bulleted_list_item":
          return (
            <div key={block.id} className="mb-2">
              <li className="text-black ml-4">
                {block.bulleted_list_item?.rich_text
                  ?.map((text: any) => text.plain_text)
                  .join("") || ""}
              </li>
              {block.has_children && block.children && (
                <ul className="ml-8">
                  {block.children.map((child: NotionBlock) =>
                    renderBlock(child)
                  )}
                </ul>
              )}
            </div>
          );

        case "numbered_list_item":
          return (
            <li key={block.id} className="text-black ml-4 mb-2 list-decimal">
              {block.numbered_list_item?.rich_text
                ?.map((text: any) => text.plain_text)
                .join("") || ""}
            </li>
          );

        case "column_list":
          return (
            <div key={block.id} className="flex flex-col md:flex-row gap-4">
              {block.children?.map((child: NotionBlock) => renderBlock(child))}
            </div>
          );

        case "column":
          return (
            <div key={block.id} className="flex-1">
              {block.children?.map((child: NotionBlock) => renderBlock(child))}
            </div>
          );

        case "image":
          const imageUrl = block.image?.file?.url || block.image?.external?.url;
          return imageUrl ? (
            <div key={block.id} className="my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Content"
                className="w-full h-auto rounded-lg object-contain"
                loading="lazy"
              />
              {block.image.caption?.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {block.image.caption
                    .map((cap: any) => cap.plain_text)
                    .join("")}
                </p>
              )}
            </div>
          ) : null;

        case "code":
          return (
            <pre
              key={block.id}
              className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto"
            >
              <code className="text-gray-300">
                {block.code?.rich_text
                  ?.map((text: any) => text.plain_text)
                  .join("") || ""}
              </code>
            </pre>
          );

        case "callout":
          return (
            <div
              key={block.id}
              className="flex items-start p-4 my-4 bg-gray-100 rounded-lg"
            >
              {block.callout?.icon?.type === "emoji" && (
                <div className="mr-4 text-xl">{block.callout.icon.emoji}</div>
              )}
              <div className="text-black whitespace-pre-wrap">
                {block.callout?.rich_text?.map((text: any, index: number) => (
                  <span
                    key={index}
                    className={`${text.annotations?.bold ? "font-bold" : ""} 
                              ${text.annotations?.italic ? "italic" : ""} 
                              ${
                                text.annotations?.underline ? "underline" : ""
                              }`}
                  >
                    {text.plain_text}
                  </span>
                )) || ""}
              </div>
            </div>
          );

        case "toggle":
          return (
            <details key={block.id} className="mb-4 text-black">
              <summary className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                {block.toggle?.rich_text?.map((text: any, index: number) => (
                  <span
                    key={index}
                    className={`${text.annotations?.bold ? "font-bold" : ""} 
                               ${text.annotations?.italic ? "italic" : ""} 
                               ${
                                 text.annotations?.underline ? "underline" : ""
                               }`}
                  >
                    {text.plain_text}
                  </span>
                )) || ""}
              </summary>
              {block.has_children && (
                <div className="pl-4 mt-2">
                  {/* Nested blocks would need to be handled here */}
                </div>
              )}
            </details>
          );

        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering block:", error, block);
      return null;
    }
  };

  return <>{blocks.map(renderBlock)}</>;
};

export default NotionRenderer;
