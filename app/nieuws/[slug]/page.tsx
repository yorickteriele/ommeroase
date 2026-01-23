import { client } from "@/tina/client";
import ClientPage from "./client-page";
import { notFound } from "next/navigation";
import Layout from "@/components/layout/layout";

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  
  try {
    const { data, query, variables } = await client.queries.news({
      relativePath: `${resolvedParams.slug}.mdx`,
    });

    // Return 404 if news not found or is a draft
    if (!data.news || data.news.draft) {
      notFound();
    }

    return (
      <Layout>
        <ClientPage data={data} query={query} variables={variables} />
      </Layout>
    );
  } catch (error) {
    console.error("Failed to fetch news:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const newsListData = await client.queries.newsConnection();
    // Filter out drafts from static params
    const paths = newsListData.data.newsConnection.edges
      ?.filter((edge) => !edge?.node?.draft)
      .map((edge) => ({
        slug: edge?.node?._sys.filename,
      })) || [];

    return paths;
  } catch (error) {
    console.error('Failed to generate static params for news:', error);
    return [];
  }
}
