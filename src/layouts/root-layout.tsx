import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/lib/nextauth/next-auth-session";
import "@/styles/styles.css";

export const metadata = {
  title: "Catalog Scolar Electronic",
  description:
    "Catalogul scolar al elevului, care il ajuta pentru vizualizarea rapida a notelor, absentelor si purtarii.",
  themeColor: "#000000",
  icons: [
    { rel: "icon", sizes: "192x192", href: "/icon-192x192.png" },
    { rel: "icon", sizes: "512x512", href: "/icon-512x512.png" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    }
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
          <link rel="icon" sizes="192x192" href="/icons/icon-192x192.png" />
          <link rel="icon" sizes="512x512" href="/icon-512x512.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#000000" />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
