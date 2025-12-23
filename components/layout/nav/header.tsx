"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  const navigation = globalSettings!.navigation || [];
  const ctaButton = header.ctaButton;

  const [menuState, setMenuState] = React.useState(false)
  
  const headerStyle: React.CSSProperties = {};
  if (header.backgroundColor) {
    headerStyle.backgroundColor = header.backgroundColor;
  }
  
  const navClassName = `fixed z-20 w-full backdrop-blur-3xl ${
    header.transparentBackground ? 'bg-transparent' : 'bg-background/50'
  } ${header.showBorder !== false ? 'border-b' : ''} transition-all duration-300 hover:shadow-xl hover:scale-[1.001]`;
  
  const buttonVariantClass = ctaButton?.style === 'outline' 
    ? 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
    : ctaButton?.style === 'secondary'
    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    : 'bg-primary text-primary-foreground hover:bg-primary/90';

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={navClassName}
        style={headerStyle}>
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center">
                {header.logo && (
                  <img
                    src={header.logo}
                    alt={header.logoAlt || 'Logo'}
                    className="h-12 w-auto"
                  />
                )}
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:flex lg:items-center lg:gap-4">
                <ul className="flex gap-8 text-sm">
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="text-muted-foreground group block duration-200 hover:text-primary hover:bg-accent-foreground/5 rounded-sm px-1 py-0.5">
                        <span className="relative inline-block">
                          {item!.label}
                          <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-accent-foreground transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 origin-left" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {ctaButton && (
                  <a
                    href={ctaButton.url || '#'}
                    target={ctaButton.newTab ? '_blank' : undefined}
                    rel={ctaButton.newTab ? 'noopener noreferrer' : undefined}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${buttonVariantClass} transform transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg`}>
                    {ctaButton.text || 'Button'}
                  </a>
                )}
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="text-muted-foreground group block duration-200 hover:text-primary hover:bg-accent-foreground/5 rounded-sm px-1 py-0.5">
                        <span className="relative inline-block">
                          {item!.label}
                          <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-accent-foreground transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 origin-left" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {ctaButton && (
                  <a
                    href={ctaButton.url || '#'}
                    target={ctaButton.newTab ? '_blank' : undefined}
                    rel={ctaButton.newTab ? 'noopener noreferrer' : undefined}
                    className={`block rounded-md px-4 py-2 text-center font-medium transition-colors mt-4 ${buttonVariantClass} transform transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg`}>
                    {ctaButton.text || 'Button'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
