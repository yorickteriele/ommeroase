import type { Collection } from 'tinacms';

const News: Collection = {
  label: 'Nieuws',
  name: 'news',
  path: 'content/news',
  format: 'mdx',
  fields: [
    {
      type: 'string',
      label: 'Titel',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      label: 'Korte Beschrijving',
      name: 'excerpt',
      required: true,
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'image',
      label: 'Hoofdafbeelding',
      name: 'image',
      required: true,
    },
    {
      type: 'datetime',
      label: 'Publicatiedatum',
      name: 'date',
      required: true,
      ui: {
        dateFormat: 'DD-MM-YYYY',
      },
    },
    {
      type: 'rich-text',
      label: 'Inhoud',
      name: 'body',
      isBody: true,
    },
  ],
};

export default News;
