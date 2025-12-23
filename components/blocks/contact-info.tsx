"use client";
import { PageBlocksContactInfo } from "@/tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Card, CardContent, CardHeader } from "../ui/card";
import { Icon } from "../icon";
import { iconSchema } from "@/tina/fields/icon";

export const ContactInfo = ({ data }: { data: PageBlocksContactInfo }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-4xl px-6">
        {data.title && (
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="text-4xl font-semibold mb-8 text-center lg:text-5xl text-primary"
          >
            {data.title}
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {data.items &&
            data.items.map((item, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {item?.icon && (
                      <Icon
                        tinaField={tinaField(item, "icon")}
                        data={{ size: "medium", ...item.icon }}
                      />
                    )}
                    <h3
                      data-tina-field={tinaField(item, "label")}
                      className="text-lg font-semibold"
                    >
                      {item?.label}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  {item?.value && (
                    <p
                      data-tina-field={tinaField(item, "value")}
                      className="text-sm"
                    >
                      {item.value}
                    </p>
                  )}
                  {item?.link && (
                    <a
                      data-tina-field={tinaField(item, "link")}
                      href={item.link}
                      className="text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkText || item.link}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Section>
  );
};

export const contactInfoBlockSchema: Template = {
  name: "contactInfo",
  label: "Contact Info",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      title: "Contact",
      items: [
        {
          icon: { name: "Mail", color: "primary" },
          label: "Email",
          value: "info@ommeroase.nl",
          link: "mailto:info@ommeroase.nl",
        },
        {
          icon: { name: "Phone", color: "primary" },
          label: "Telefoon",
          value: "+31 6 46013149",
          link: "tel:+31646013149",
        },
      ],
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
      type: "object",
      label: "Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label,
        }),
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "Value",
          name: "value",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "string",
          label: "Link Text",
          name: "linkText",
        },
      ],
    },
  ],
};
