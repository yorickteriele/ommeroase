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
import { News } from "./news";
import { GreenSection } from "./green-section";
import { QuantumSection } from "./quantum-section";

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
  // If there are treatment blocks, let the TreatmentCategorySwitcher
  // control where content blocks are rendered (so we don't duplicate them).
  const otherBlocks = props.blocks.filter((block: any) => {
    if (block.__typename === "PageBlocksTreatmentCard") return false;
    if (block.__typename === "PageBlocksCta") return false;
    // Exclude content blocks only when there are treatment blocks
    if (block.__typename === "PageBlocksContent" && treatmentBlocks.length > 0) return false;
    return true;
  });

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
    case "PageBlocksNews":
      return <News data={block as any} />;
    case "PageBlocksGreenSection":
      return <GreenSection data={block as any} />;
    case "PageBlocksQuantumSection":
      return <QuantumSection data={block as any} />;
    default:
      return null;
  }
};
