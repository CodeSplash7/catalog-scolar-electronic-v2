import Head from "next/head";

import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/lib/nextauth/next-auth-session";
import "@/styles/styles.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog Scolar Electronic"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <Head>
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </Head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
