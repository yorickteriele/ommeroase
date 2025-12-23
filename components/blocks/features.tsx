"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import Link from "next/link";

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-4xl font-semibold lg:text-5xl text-primary">{data.title}</h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4">{data.description}</p>
        </div>
        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 items-stretch">
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature key={i} {...block!} />;
            })}
        </Card>
      </div>
    </Section>
  )
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  return (
    <div className="group shadow-zinc-950/5 flex flex-col h-full">
      <CardHeader className="pb-3">
        {data.image ? (
          <div className="relative mx-auto w-full h-48 mb-6">
            <img
              data-tina-field={tinaField(data, "image")}
              src={data.image}
              alt={data.title || ''}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <CardDecorator>
            {data.icon && (
              <Icon
                tinaField={tinaField(data, "icon")}
                data={{ size: "large", ...data.icon }}
              />
            )}
          </CardDecorator>
        )}

        <h3
          data-tina-field={tinaField(data, "title")}
          className="mt-6 font-medium text-primary"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm pb-8 flex-1">
        <TinaMarkdown
          data-tina-field={tinaField(data, "text")}
          content={data.text}
        />
      </CardContent>
      {data.label && data.url && (
        <Link 
          href={data.url}
          className="mt-4 mx-6 mb-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors mt-auto"
        >
          <span
            data-tina-field={tinaField(data, "label")}
          >
            {data.label}
          </span>
        </Link>
      )}
    </div>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    name: "Tina",
    color: "white",
    style: "float",
  }
};

export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        {
          type: "image",
          label: "Image",
          name: "image",
          description: "Feature image (optional, will be used instead of icon if provided)",
        },
        iconSchema as any,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
        {
          label: 'Button Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Button URL',
          name: 'url',
          type: 'string',
          description: 'The page or URL to link to (e.g., /contact, /wellness)',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
              { label: 'Button', value: 'button' },
              { label: 'Link', value: 'link' },
          ],
        },
      ],
    },
  ],
};
