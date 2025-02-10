import { Client } from '@notionhq/client';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextResponse } from 'next/server';

type NotionBlock = ListBlockChildrenResponse['results'][0] & {
  children?: NotionBlock[];
};

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

async function getBlockChildren(blockId: string) {
  const blocks: NotionBlock[] = [];
  let cursor;

  try {
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });
      blocks.push(...(results as NotionBlock[]));
      if (!next_cursor) break;
      cursor = next_cursor;
    }

    for (const block of blocks) {
      if ('has_children' in block && block.has_children) {
        block.children = await getBlockChildren(block.id);
      }
    }

    return blocks;
  } catch (error) {
    console.error('Error in getBlockChildren:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get('blockId');

  if (!blockId) {
    return NextResponse.json(
      { error: 'Block ID is required' },
      { status: 400 }
    );
  }

  try {
    // API 키 확인을 위한 로그
    console.log(
      'Using Notion API Key:',
      process.env.NOTION_SECRET_KEY ? 'Present' : 'Missing'
    );

    const blocks = await getBlockChildren(blockId);
    console.log('Successfully fetched blocks for ID:', blockId);

    return NextResponse.json({ blocks });
  } catch (error: any) {
    // 더 자세한 에러 정보 로깅
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch block children',
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
