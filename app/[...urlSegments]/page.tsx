import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';
import { PageConnectionQuery } from '@/tina/__generated__/types';

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <Section>
        <ClientPage {...data} />
      </Section>
    </Layout>
  );
}

export async function generateStaticParams() {
  // Return static paths for all pages except home (which is handled by app/page.tsx)
  return [
    { urlSegments: ['about'] },
  ];
}