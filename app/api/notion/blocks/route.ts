import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

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
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    return NextResponse.json({ blocks: response.results });
  } catch (error) {
    console.error('Error fetching block children:', error);
    return NextResponse.json(
      { error: 'Failed to fetch block children' },
      { status: 500 }
    );
  }
}
