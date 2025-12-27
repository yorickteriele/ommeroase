"use client";

import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { NewsQuery, NewsQueryVariables } from "@/tina/__generated__/types";
import { components } from '@/components/mdx-components';
import Link from 'next/link';

interface ClientPageProps {
  query: string;
  data: NewsQuery;
  variables: NewsQueryVariables;
}

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  const news = tinaData.news;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link 
        href="/#nieuws"
        className="inline-flex items-center text-sm text-primary hover:underline mb-8"
      >
        ← Terug naar nieuws
      </Link>

      <header className="mb-12">
        {news.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <img
              data-tina-field={tinaField(news, 'image')}
              src={news.image}
              alt={news.title || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 
          data-tina-field={tinaField(news, 'title')}
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
        >
          {news.title}
        </h1>

        <div className="flex items-center gap-4 text-muted-foreground">
          <time 
            data-tina-field={tinaField(news, 'date')}
            dateTime={news.date}
          >
            {new Date(news.date).toLocaleDateString('nl-NL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {news.excerpt && (
          <p 
            data-tina-field={tinaField(news, 'excerpt')}
            className="mt-6 text-xl text-muted-foreground"
          >
            {news.excerpt}
          </p>
        )}
      </header>

      <div 
        data-tina-field={tinaField(news, 'body')}
        className="prose prose-lg max-w-none"
      >
        <TinaMarkdown content={news.body} components={components} />
      </div>
    </article>
  );
}
