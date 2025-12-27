import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { treatmentCardBlockSchema } from '@/components/blocks/treatment-card';
import { contactInfoBlockSchema } from '@/components/blocks/contact-info';
import { newsBlockSchema } from '@/components/blocks/news';
import { greenSectionBlockSchema } from '@/components/blocks/green-section';
import { quantumSectionBlockSchema } from '@/components/blocks/quantum-section';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        treatmentCardBlockSchema,
        contactInfoBlockSchema,
        newsBlockSchema,
        greenSectionBlockSchema,
        quantumSectionBlockSchema,
      ],
    },
  ],
};

export default Page;
