"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  const navigation = globalSettings!.navigation || [];

  const footerStyle: React.CSSProperties = {};
  if (footer?.backgroundColor) {
    footerStyle.backgroundColor = footer.backgroundColor;
  }
  if (footer?.textColor) {
    footerStyle.color = footer.textColor;
  }

  const copyrightText = footer?.copyrightText || `Ommer Oase, All rights reserved`;

  return (
    <footer className="border-b pt-20" style={footerStyle}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start gap-8 border-t py-6" style={footer?.textColor ? { borderColor: `${footer.textColor}33` } : {}}>
          <div className="flex flex-col gap-4">
            {footer?.showLogo !== false && header?.logo && (
              <Link href="/" aria-label="go home">
                <img
                  src={header.logo}
                  alt={header.logoAlt || 'Logo'}
                  className="h-10 w-auto"
                />
              </Link>
            )}
            {footer?.description && (
              <div className="prose prose-sm max-w-none text-left" style={footer?.textColor ? { color: footer.textColor } : {}}>
                <TinaMarkdown content={footer.description} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm" style={footer?.textColor ? { color: footer.textColor } : {}}>
                © {new Date().getFullYear()} {copyrightText}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 ml-auto">
            {footer?.showNavigation && navigation.length > 0 && (
              <nav>
                <ul className="flex flex-col gap-2 text-sm">
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={item!.href!} 
                        className="hover:opacity-80 transition-opacity"
                        style={footer?.textColor ? { color: footer.textColor } : {}}
                      >
                        {item!.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        {(((footer?.links?.length ?? 0) > 0) || ((footer?.social?.length ?? 0) > 0)) && (
          <div className="w-full mt-6 pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={footer?.textColor ? { borderColor: `${footer.textColor}33` } : {}}>
            {/* Additional Links */}
            {footer?.links && footer.links.length > 0 && (
              <div className="flex flex-wrap gap-4 text-sm">
                {footer.links.map((link, index) => (
                  <Link 
                    key={index} 
                    href={link!.url!} 
                    className="hover:opacity-80 transition-opacity"
                    style={footer?.textColor ? { color: footer.textColor } : {}}
                  >
                    {link!.label}
                  </Link>
                ))}
              </div>
            )}
            {/* Social Links */}
            {footer?.social && footer.social.length > 0 && (
              <div className="flex gap-6 text-sm">
                {footer.social.map((link, index) => (
                  <Link 
                    key={`${link!.icon}${index}`} 
                    href={link!.url!} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Icon 
                      data={{ ...link!.icon, size: 'small' }} 
                      className="block" 
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
