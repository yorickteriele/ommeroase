"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { cloneElement, ReactElement } from "react";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  newsItems?: any[];
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ 
    data: props.data,
    variables: props.variables,
    query: props.query,
  });
  
  // Inject newsItems into any news blocks
  const pageWithNews = {
    ...data?.page,
    blocks: data?.page?.blocks?.map((block: any) => {
      if (block?.__typename === 'PageBlocksNews') {
        return {
          ...block,
          newsItems: props.newsItems,
        };
      }
      return block;
    }),
  };
  
  return (
    <ErrorBoundary>
      <Blocks {...pageWithNews} />
    </ErrorBoundary>
  );
}
