import { client } from "@/tina/client";
import ClientPage from "./client-page";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const { data, query, variables } = await client.queries.news({
      relativePath: `${params.slug}.mdx`,
    });

    if (!data.news) {
      notFound();
    }

    return <ClientPage data={data} query={query} variables={variables} />;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  const newsListData = await client.queries.newsConnection();
  const paths = newsListData.data.newsConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.filename,
  })) || [];

  return paths;
}
