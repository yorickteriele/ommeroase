"use client";
import React, { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import Image from "next/image";
import type { PageBlocksTreatmentCard } from "@/tina/__generated__/types";

import { PageBlocksContent, PageBlocksCta } from "@/tina/__generated__/types";
import { Content } from "./content";
import { CallToAction } from "./call-to-action";

export interface TreatmentCategorySwitcherProps {
  blocks: PageBlocksTreatmentCard[];
  contentBlocks?: PageBlocksContent[];
  ctaBlocks?: PageBlocksCta[];
}

export const TreatmentCategorySwitcher: React.FC<TreatmentCategorySwitcherProps> = ({ blocks, contentBlocks, ctaBlocks }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeBlock = blocks[activeIdx];

  return (
    <>
      <Section background={activeBlock.background!}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {blocks.map((block, idx) => (
              <button
                key={block.category || idx}
                data-tina-field={tinaField(block, 'category')}
                className={`px-5 py-2 rounded-full font-semibold border transition-all duration-200 text-lg shadow-sm
                  ${idx === activeIdx
                    ? 'bg-primary text-white border-primary scale-105 shadow-lg'
                    : 'bg-white/80 text-primary border-primary/30 hover:bg-primary/10 hover:scale-105'}
                `}
                style={{ minWidth: 120 }}
                onClick={() => setActiveIdx(idx)}
              >
                {block.category}
              </button>
            ))}
          </div>
          {activeBlock.category && (
            <h2
              data-tina-field={tinaField(activeBlock, 'category')}
              className="text-4xl font-semibold mb-8 text-center lg:text-5xl text-primary"
            >
              {activeBlock.category}
            </h2>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activeBlock.treatments &&
              activeBlock.treatments.map((treatment, i) => (
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
      {/* Render content (disclaimer) and CTA blocks after treatments */}
      {contentBlocks && contentBlocks.map((block, i) => (
        <Content key={i} data={block} />
      ))}
      {ctaBlocks && ctaBlocks.map((block, i) => (
        <CallToAction key={i} data={block} />
      ))}
    </>
  );
};