import React from "react";
import client from "@/tina/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  // Fetch news items for the news block
  let newsItems = [];
  try {
    const newsResult = await client.queries.newsConnection({
      sort: 'date',
      last: 10,
    });
    newsItems = newsResult.data.newsConnection.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} newsItems={newsItems} />
    </Layout>
  );
}
