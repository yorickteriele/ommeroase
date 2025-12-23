import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";

// Polyfill localStorage for server-side rendering
if (typeof window === 'undefined') {
  // @ts-ignore
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}

// Use local GraphQL server in development, TinaCloud in production
const isProduction = process.env.NODE_ENV === 'production';
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || 
               process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 
               process.env.HEAD || 
               'main';

const apiUrl = isProduction && clientId
  ? `https://content.tinajs.io/1.6/content/${clientId}/github/${branch}`
  : (process.env.NEXT_PUBLIC_TINA_URL || 'http://localhost:4001/graphql');

export const client = createClient({
  url: apiUrl,
  token: process.env.TINA_TOKEN || undefined,
  queries,
});

export default client;
