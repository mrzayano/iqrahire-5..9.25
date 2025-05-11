import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter,Amiri } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";


import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Font setup
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});


// Metadata for SEO and social
export const metadata: Metadata = {
  title: "IqraHire - Islamic Professional Network",
  description:
    "Connect with professionals who share your values and find career opportunities aligned with your principles.",
  generator: "v0.dev",
};

// Root Layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} ${amiri.variable} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <main>{children}</main>
              <Toaster className="bg-white z-10 "/>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
