import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.scss";
import { AppProvider } from "../context/AppContext";
import { LocaleProvider } from "../context/LocaleContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital City Series",
  description: "Exploring urban environments through digital art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <LocaleProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
