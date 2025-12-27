import { client } from '@/tina/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const newsQuery = `
      query {
        newsConnection(sort: "date", last: 10) {
          edges {
            node {
              id
              title
              excerpt
              image
              date
              _sys {
                filename
              }
            }
          }
        }
      }
    `;

    const response = await client.request(newsQuery);
    
    const items = response.newsConnection.edges?.map((edge: any) => edge.node) || [];

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
