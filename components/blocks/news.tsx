"use client";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  _sys: {
    filename: string;
  };
}

interface PageBlocksNews {
  background?: string | null;
  title?: string | null;
  subtitle?: string | null;
  maxItems?: number | null;
  newsItems?: NewsItem[];
}

export const News = ({ data }: { data: PageBlocksNews }) => {
  const displayItems = (data.newsItems || []).slice(0, data.maxItems || 3);

  return (
    <Section background={data.background || "white"} id="nieuws">
      {/* Decorative border */}
      <div className="border-t-4 border-primary/20 mb-12"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
        <div className="text-center mb-12">
          <h2 
            data-tina-field={tinaField(data as any, 'title')} 
            className="text-balance text-4xl font-semibold lg:text-5xl text-primary"
          >
            {data.title || "Het laatste nieuws"}
          </h2>
          {data.subtitle && (
            <p 
              data-tina-field={tinaField(data as any, 'subtitle')}
              className="mt-4 text-lg text-muted-foreground"
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {displayItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nog geen nieuwsberichten beschikbaar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <Link 
                key={item.id} 
                href={`/nieuws/${item._sys.filename}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardHeader className="pb-3 pt-4">
                    <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString('nl-NL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Decorative border */}
      <div className="border-b-4 border-primary/20 mt-12"></div>
    </Section>
  );
};

export const newsBlockSchema: Template = {
  name: "news",
  label: "Nieuws",
  ui: {
    previewSrc: "/blocks/news.png",
    defaultItem: {
      title: 'Het laatste nieuws',
      subtitle: 'Blijf op de hoogte van de laatste nieuwtjes en acties',
      maxItems: 3,
      background: 'white',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Titel",
      name: "title",
    },
    {
      type: "string",
      label: "Ondertitel",
      name: "subtitle",
      ui: {
        component: 'textarea',
      },
    },
    {
      type: "number",
      label: "Aantal items om te tonen",
      name: "maxItems",
      ui: {
        parse: (value: string) => Number(value),
      },
    },
  ],
};
