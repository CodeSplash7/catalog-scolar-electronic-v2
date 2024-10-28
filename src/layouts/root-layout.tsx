import Head from "next/head";

import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/lib/nextauth/next-auth-session";
import "@/styles/styles.css";
import Link from "next/link";
import Image from "next/image";
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

function Header() {
  return (
    <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Catalog scolar electronic logo"
          width={50}
          height={50}
          priority
        />
      </Link>
      <h1>Catalog Scolar Electronic</h1>
    </header>
  );
}
