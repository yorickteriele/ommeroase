import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { TreatmentCard } from "./treatment-card";
import { TreatmentCategorySwitcher } from "./treatment-category-switcher";
import { ContactInfo } from "./contact-info";

export function Blocks(props: Omit<Page, "id" | "_sys" | "_values">) {
  if (!props.blocks) return null;
  // Group all treatmentCard, content, and CTA blocks
  const treatmentBlocks = props.blocks.filter(
    (block): block is import("../../tina/__generated__/types").PageBlocksTreatmentCard =>
      !!block && (block as any).__typename === "PageBlocksTreatmentCard"
  );
  const contentBlocks = props.blocks.filter(
    (block): block is import("../../tina/__generated__/types").PageBlocksContent =>
      !!block && (block as any).__typename === "PageBlocksContent"
  );
  const ctaBlocks = props.blocks.filter(
    (block): block is import("../../tina/__generated__/types").PageBlocksCta =>
      !!block && (block as any).__typename === "PageBlocksCta"
  );
  const otherBlocks = props.blocks.filter(
    (block: any) =>
      block.__typename !== "PageBlocksTreatmentCard" &&
      // keep content blocks here so they're rendered normally
      block.__typename !== "PageBlocksCta"
  );

  return (
    <>
      {/* Render all non-treatment, non-content, non-cta blocks as before */}
      {otherBlocks.map(function (block: any, i: number) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
      {/* Render the treatment category switcher if there are any treatment blocks */}
      {treatmentBlocks.length > 0 && (
        <TreatmentCategorySwitcher
          blocks={treatmentBlocks}
          contentBlocks={contentBlocks}
          ctaBlocks={ctaBlocks}
        />
      )}
    </>
  );
}

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksTreatmentCard":
      return <TreatmentCard data={block} />;
    case "PageBlocksContactInfo":
      return <ContactInfo data={block} />;
    default:
      return null;
  }
};
