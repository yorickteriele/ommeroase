"use client";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";

interface PageBlocksGreenSection {
  background?: string;
  title?: string;
  subtitle?: string;
  content?: any;
  sectionImage?: string;
  features?: Array<{
    icon?: any;
    title?: string;
    description?: string;
  }>;
}

export const GreenSection = ({ data }: { data: PageBlocksGreenSection }) => {
  return (
    <Section background={data.background || "bg-emerald-50"}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 
          data-tina-field={tinaField(data, 'title')}
          className="text-4xl md:text-5xl font-bold text-primary mb-6"
        >
          {data.title || "Groen en puur"}
        </h2>
        
        {data.subtitle && (
          <p 
            data-tina-field={tinaField(data, 'subtitle')}
            className="text-lg leading-relaxed text-foreground/90"
          >
            {data.subtitle}
          </p>
        )}
      </div>
    </Section>
  );
};

export const greenSectionBlockSchema: Template = {
  name: "greenSection",
  label: "Groen en Puur Sectie",
  ui: {
    previewSrc: "/blocks/green-section.png",
    defaultItem: {
      title: 'Groen en puur',
      subtitle: 'Veiligheid voor mens en onze planeet staat voorop',
      background: 'bg-green-50/30',
      features: [
        {
          icon: { name: 'Leaf', color: 'primary', style: 'float' },
          title: 'Biologische producten',
          description: 'Voor de facials wordt het merk Absolution gebruikt en voor de headspa Nature as essence.',
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
      type: "object",
      label: "Kenmerken",
      name: "features",
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