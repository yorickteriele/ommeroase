import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { client } from "@/tina/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    }
  );

  // Ensure pages are included in the navigation so static builds (e.g., GitHub Pages)
  // always show all site pages even when the global nav is stale or not updated.
  const pagesResponse = await client.queries.pageConnection();
  const pageEdges: any[] = pagesResponse.data?.pageConnection?.edges || [];

  // Only auto-include pages that explicitly opt-in to navigation via
  // `showInNavigation: true` frontmatter. Pages explicitly listed in
  // `content/global/index.json` are still always included.
  const pagesNav = pageEdges
    .map((edge) => {
      const filepath = edge?.node?._sys?.breadcrumbs?.join('/');
      if (!filepath || filepath === 'home' || filepath.startsWith('admin')) return null;

      // Respect explicit opt-in frontmatter from the page's _values
      const showInNav = !!edge?.node?._values?.showInNavigation;
      if (!showInNav) return null;

      const href = `/${filepath}`;
      const last = filepath.split('/').pop() || '';
      const label = decodeURIComponent(last).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return { __typename: 'GlobalNavigation', href, label };
    })
    .filter(Boolean) as { __typename: 'GlobalNavigation'; href: string; label: string }[];

  const globalNav = globalData.global.navigation || [];
  const mergedNav = [...globalNav];
  pagesNav.forEach((p) => {
    if (!mergedNav.find((item) => item?.href === p.href)) mergedNav.push(p);
  });

  const effectiveGlobal = {
    ...globalData.global,
    navigation: mergedNav,
  };

  return (
    <LayoutProvider globalSettings={effectiveGlobal} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden pt-20">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
