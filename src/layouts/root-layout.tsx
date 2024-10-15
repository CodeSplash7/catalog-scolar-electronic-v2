import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/lib/nextauth/next-auth-session";
import "@/styles/styles.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
