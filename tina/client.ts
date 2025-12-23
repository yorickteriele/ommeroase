import { createClient, TinaClient } from "tinacms/dist/client";
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

// Create a singleton client instance
let clientInstance: TinaClient | null = null;

function getClient(): TinaClient {
  if (!clientInstance) {
    clientInstance = createClient({
      url: process.env.NEXT_PUBLIC_TINA_URL || 'http://localhost:4001/graphql',
      token: process.env.TINA_TOKEN || undefined,
      queries,
    });
  }
  return clientInstance;
}

const client = getClient();

export default client;
export { client };
