import { NextResponse } from "next/server";

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// DB에서 포트폴리오 목록을 가져오는 API
export async function GET() {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_SECRET_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 100,
          sorts: [
            {
              timestamp: "created_time",
              direction: "descending",
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid response format");
    }

    // 노션 DB 결과를 포트폴리오 아이템 형식으로 변환
    const portfolioItems = data.results.map((page: any, index: number) => {
      // 각 속성에 대한 안전한 접근
      const properties = page.properties || {};

      return {
        id: index + 1,
        title: properties.title?.title?.[0]?.text.content || "Untitled",
        description: properties.description?.rich_text?.[0]?.text.content || "",
        image:
          properties.image?.files?.[0]?.file?.url ||
          "/assets/images/default.png",
        type: properties.type?.select?.name || "Side",
        notionPageId: properties.notionPageId?.rich_text?.[0]?.text.content,
        tags:
          properties.tags?.multi_select?.map(
            (tag: { name: string }) => tag.name
          ) || [],
        period: properties.period?.rich_text?.[0]?.text.content || "",
      };
    });

    return NextResponse.json({ portfolioItems });
  } catch (error) {
    console.error("Failed to fetch database:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch database",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST 메서드는 삭제하고 page/route.ts에서만 페이지 내용을 처리하도록 함
