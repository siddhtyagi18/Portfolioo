import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RotatingBrowserTitle } from "@/components/rotating-browser-title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siddh Tyagi | Premium Portfolio",
  description: "Personal portfolio of Siddh Tyagi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RotatingBrowserTitle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
