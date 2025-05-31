import type { Metadata } from "next";
import "../styles/index.scss";
import { AppProvider } from "../context/AppContext";
import { LocaleProvider } from "../context/LocaleContext";
import { Noto_Sans, Noto_Sans_SC, Noto_Sans_TC, Noto_Sans_Thai } from 'next/font/google'
import ClientWrapper from "../components/ClientWrapper";

// Configure fonts for different languages
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
})

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
      <body className={`${notoSans.variable} ${notoSansSC.variable} ${notoSansTC.variable} ${notoSansThai.variable}`}>
        <LocaleProvider>
          <AppProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </AppProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
