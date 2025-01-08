import { RootLayout } from "./components/layout/index";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Inter } from "@next/font/google";
import { cn } from "../lib/utils/clsx";

// RootProvider and AuthProvider remain if you still need them
import { RootProvider } from "@/libs/context/root";
import { AuthProvider } from "@/libs/context/auth";

const GeistSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbo Project",
  description: ".",
};

export default function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.className, "antialiased", "light")}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          defer
          data-domain="llmchat.co"
          src="https://plausible.io/js/script.tagged-events.js"
        ></script>
      </head>
      <body>
        <RootProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {/* <SessionsProvider> */}
                <RootLayout>{children}</RootLayout>
              {/* </SessionsProvider> */}
            </AuthProvider>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}
