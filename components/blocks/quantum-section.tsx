"use client";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import Link from "next/link";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";

interface PageBlocksQuantumSection {
  background?: string;
  title?: string;
  subtitle?: string;
  content?: any;
  sectionImage?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  highlights?: Array<{
    icon?: any;
    title?: string;
    description?: string;
  }>;
}

export const QuantumSection = ({ data }: { data: PageBlocksQuantumSection }) => {
  return (
    <Section background={data.background || "white"}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 
            data-tina-field={tinaField(data, 'title')}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {data.title || "Kwantumkracht"}
          </h2>
          {data.subtitle && (
            <p 
              data-tina-field={tinaField(data, 'subtitle')}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image with overlay */}
          {data.sectionImage && (
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  data-tina-field={tinaField(data, 'sectionImage')}
                  src={data.sectionImage}
                  alt={data.title || 'Kwantumkracht'}
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="order-1 lg:order-2">
            {data.content && (
              <div 
                data-tina-field={tinaField(data, 'content')}
                className="prose prose-lg mb-8"
              >
                <TinaMarkdown content={data.content} />
              </div>
            )}

            {data.highlights && data.highlights.length > 0 && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                {data.highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-4 p-5 rounded-lg bg-white/50 border border-gray-200"
                  >
                    {highlight.icon && (
                      <div className="flex-shrink-0">
                        <Icon
                          tinaField={tinaField(highlight, "icon")}
                          data={{ size: "medium", ...highlight.icon }}
                        />
                      </div>
                    )}
                    <div>
                      <h3 
                        data-tina-field={tinaField(highlight, 'title')}
                        className="font-semibold text-lg text-primary mb-2"
                      >
                        {highlight.title}
                      </h3>
                      {highlight.description && (
                        <p 
                          data-tina-field={tinaField(highlight, 'description')}
                          className="text-muted-foreground"
                        >
                          {highlight.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.buttonLabel && data.buttonUrl && (
              <Link
                href={data.buttonUrl}
                className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-medium"
              >
                <span data-tina-field={tinaField(data, 'buttonLabel')}>
                  {data.buttonLabel}
                </span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const quantumSectionBlockSchema: Template = {
  name: "quantumSection",
  label: "Kwantumkracht Sectie",
  ui: {
    previewSrc: "/blocks/quantum-section.png",
    defaultItem: {
      title: 'Kwantumkracht',
      subtitle: 'Energetische behandelingen die het onderbewustzijn aanspreken',
      background: 'white',
      buttonLabel: 'Lees verder',
      buttonUrl: '/kwantumkracht',
      highlights: [
        {
          icon: { name: 'Sparkles', color: 'primary', style: 'float' },
          title: 'Energetische behandelingen',
          description: 'Werken met het kwantumveld',
        },
      ],
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
      type: "rich-text",
      label: "Inhoud",
      name: "content",
    },
    {
      type: "image",
      label: "Afbeelding",
      name: "sectionImage",
    },
    {
      type: "string",
      label: "Button Label",
      name: "buttonLabel",
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
    },
    {
      type: "object",
      label: "Highlights",
      name: "highlights",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Titel",
          name: "title",
        },
        {
          type: "string",
          label: "Beschrijving",
          name: "description",
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
};
