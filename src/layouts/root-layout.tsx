import Head from "next/head";

import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/lib/nextauth/next-auth-session";
import "@/styles/styles.css";
import { Metadata } from "next";

export const metadata = {
  title: "Catalog Scolar Electronic",
  description:
    "Catalogul scolar al elevului, care il ajuta pentru vizualizarea rapida a notelor, absentelor si purtarii.",
  themeColor: "#000000",
  icons: [
    { rel: "icon", sizes: "192x192", href: "/icons/icon-192x192.png" },
    { rel: "icon", sizes: "512x512", href: "/icons/icon-512x512.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" }
  ],
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
