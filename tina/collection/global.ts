import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Navigation",
      name: "navigation",
      description: "Main navigation links used in header and footer",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          href: "home",
          label: "Home",
        },
      },
      fields: [
        {
          type: "string",
          label: "Link",
          name: "href",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
      ],
    },
    {
      type: "object",
      label: "Site Settings",
      name: "siteSettings",
      fields: [
        {
          type: "string",
          label: "Site Title",
          name: "title",
          description: "Website title (appears in browser tab)",
        },
        {
          type: "string",
          label: "Site Description",
          name: "description",
          description: "Default meta description for SEO",
        },
        {
          type: "image",
          label: "Favicon",
          name: "favicon",
          description: "Browser icon (recommended: 32x32px .png or .ico)",
        },
      ],
    },
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "image",
          label: "Logo",
          name: "logo",
        },
        {
          type: "string",
          label: "Logo Alt Text",
          name: "logoAlt",
        },
        {
          type: "string",
          label: "Background Color",
          name: "backgroundColor",
          description: "Header background color (hex code)",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "boolean",
          label: "Transparent Background",
          name: "transparentBackground",
          description: "Make header background transparent",
        },
        {
          type: "boolean",
          label: "Show Border",
          name: "showBorder",
          description: "Show bottom border on header",
        },

        {
          type: "object",
          label: "CTA Button",
          name: "ctaButton",
          fields: [
            {
              type: "string",
              label: "Button Text",
              name: "text",
            },
            {
              type: "string",
              label: "Button URL",
              name: "url",
            },
            {
              type: "boolean",
              label: "Open in New Tab",
              name: "newTab",
            },
            {
              type: "string",
              label: "Button Style",
              name: "style",
              options: ["primary", "secondary", "outline"],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Copyright Text",
          name: "copyrightText",
          description: "Custom copyright text (leave empty for auto-generated)",
        },
        {
          type: "rich-text",
          label: "Footer Description",
          name: "description",
          description: "Additional footer content",
        },
        {
          type: "string",
          label: "Background Color",
          name: "backgroundColor",
          description: "Footer background color (hex code)",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "boolean",
          label: "Show Logo",
          name: "showLogo",
          description: "Display logo in footer",
        },
        {
          type: "boolean",
          label: "Show Navigation",
          name: "showNavigation",
          description: "Display navigation links in footer",
        },
        {
          type: "string",
          label: "Text Color",
          name: "textColor",
          description: "Footer text color (hex code)",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || 'undefined' };
            },
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
        {
          type: "object",
          label: "Additional Links",
          name: "links",
          list: true,
          description: "Extra footer links (Privacy Policy, Terms, etc.)",
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          description: "Main brand color used for buttons, links, and accents",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          label: "Secondary Color",
          name: "secondaryColor",
          description: "Secondary accent color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          label: "Background Color",
          name: "backgroundColor",
          description: "Page background color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          label: "Text Color",
          name: "textColor",
          description: "Main text color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
            {
              label: "Playfair Display",
              value: "playfair",
            },
            {
              label: "Montserrat",
              value: "montserrat",
            },
          ],
        },
        {
          type: "string",
          name: "headingFont",
          label: "Heading Font Family",
          description: "Separate font for headings (optional)",
          options: [
            {
              label: "Same as body",
              value: "inherit",
            },
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
            {
              label: "Playfair Display",
              value: "playfair",
            },
            {
              label: "Montserrat",
              value: "montserrat",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
        {
          type: "number",
          label: "Border Radius",
          name: "borderRadius",
          description: "Button and card border radius (0-20px)",
        },
        {
          type: "string",
          label: "Content Width",
          name: "contentWidth",
          description: "Maximum content width",
          options: [
            {
              label: "Narrow (768px)",
              value: "narrow",
            },
            {
              label: "Medium (1024px)",
              value: "medium",
            },
            {
              label: "Wide (1280px)",
              value: "wide",
            },
            {
              label: "Full Width",
              value: "full",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
