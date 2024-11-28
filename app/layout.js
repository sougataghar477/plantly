import localFont from "next/font/local";
import React from "react";
import SessionProviderComponent from "@/components/SessionProvider";
import { SearchProvider } from "@/context/SearchContext";
import { Provider } from "@/components/ui/provider";
import './globals.css';
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Plantly",
  description: "An E-Commerce Website About Plants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SearchProvider>
            <SessionProviderComponent>
              <Provider>
                <Navbar />
                {children}
              </Provider>
            </SessionProviderComponent>
          </SearchProvider>
        </Suspense>
      </body>
    </html>
  );
}
