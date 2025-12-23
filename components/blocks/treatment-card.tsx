"use client";
import { PageBlocksTreatmentCard } from "@/tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Card, CardButton, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import Image from "next/image";

export const TreatmentCard = ({ data }: { data: PageBlocksTreatmentCard }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-5xl px-6">
        {data.category && (
          <h2
            data-tina-field={tinaField(data, 'category')}
            className="text-4xl font-semibold mb-8 text-center lg:text-5xl text-primary"
          >
            {data.category}
          </h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.treatments &&
            data.treatments.map((treatment, i) => (
              <Card key={i} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                {treatment?.image && (
                  <div className="flex justify-center items-center pt-6">
                    <Image
                      data-tina-field={tinaField(treatment, 'image')}
                      src={treatment.image}
                      alt={treatment.title || 'Treatment'}
                      width={50}
                      height={50}
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <h3
                    data-tina-field={tinaField(treatment, "title")}
                    className="text-xl font-semibold text-primary text-center min-h-[3.5rem]"
                  >
                    {treatment?.title}
                  </h3>
                  <div className="min-h-[1.75rem]">
                    {treatment?.duration && (
                      <p
                        data-tina-field={tinaField(treatment, "duration")}
                        className="text-sm text-muted-foreground text-center"
                      >
                        Duur: {treatment.duration}
                      </p>
                    )}
                  </div>
                  {treatment?.price && (
                    <p
                      data-tina-field={tinaField(treatment, "price")}
                      className="text-lg font-bold text-primary text-center"
                    >
                      {treatment.price}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div
                    data-tina-field={tinaField(treatment, "description")}
                    className="text-sm"
                  >
                    <TinaMarkdown content={treatment?.description} />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Section>
  );
};

const defaultTreatment = {
  title: "Treatment Name",
  duration: "60 min",
  price: "€74,-",
  description: {
    type: "root",
    children: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Description of the treatment",
          },
        ],
      },
    ],
  },
};

export const treatmentCardBlockSchema: Template = {
  name: "treatmentCard",
  label: "Treatment Card",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      category: "Facials",
      treatments: [defaultTreatment, defaultTreatment, defaultTreatment],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Category",
      name: "category",
    },
    {
      type: "object",
      label: "Treatments",
      name: "treatments",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
      },
      fields: [
        {
          type: "image",
          label: "Image",
          name: "image",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Duration",
          name: "duration",
        },
        {
          type: "string",
          label: "Price",
          name: "price",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
      ],
    },
  ],
};
