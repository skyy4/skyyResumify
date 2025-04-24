import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resumify",
  description: "Virtual Resume Builder",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen pb-8">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
