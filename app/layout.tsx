import React from "react";
import { Metadata } from "next";
import { 
  Comfortaa, 
  Quicksand, 
  Nunito, 
  Josefin_Sans,
  Cormorant,
  Lora,
  Crimson_Text,
  Playfair_Display,
  Libre_Baskerville,
  Karla,
  Lexend,
  Poppins,
  Outfit,
  Sofia_Sans,
  Manrope,
  DM_Sans,
  Jost,
  Spectral,
  EB_Garamond
} from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";
import { client } from "@/tina/client";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const josefinSans = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin-sans" });
const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-cormorant" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const crimsonText = Crimson_Text({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-crimson-text" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre-baskerville" });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const sofiaSans = Sofia_Sans({ subsets: ["latin"], variable: "--font-sofia-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const spectral = Spectral({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-spectral" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-eb-garamond" });

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await client.queries.global({
    relativePath: "index.json",
  });
  
  const siteSettings = globalData?.data?.global?.siteSettings;
  
  return {
    title: siteSettings?.title || "Ommer Oase",
    description: siteSettings?.description || "Wellness & Massage",
    icons: {
      icon: siteSettings?.favicon || "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(
      comfortaa.variable,
      quicksand.variable,
      nunito.variable,
      josefinSans.variable,
      cormorant.variable,
      lora.variable,
      crimsonText.variable,
      playfair.variable,
      libreBaskerville.variable,
      karla.variable,
      lexend.variable,
      poppins.variable,
      outfit.variable,
      sofiaSans.variable,
      manrope.variable,
      dmSans.variable,
      jost.variable,
      spectral.variable,
      ebGaramond.variable
    )}>
      <body className="min-h-screen bg-background antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
