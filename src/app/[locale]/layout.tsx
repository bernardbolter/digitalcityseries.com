import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider} from 'next-intl'
import { setRequestLocale } from "next-intl/server"
import {routing} from '@/i18n/routing'
import { AppProvider } from "@/context/AppContext"
import { getArtworkData } from "@/lib/getArtworkData"
import { ReactNode } from "react"
import '@/styles/index.scss'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const artworkData = await getArtworkData()

  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} id="html-tag">
      <body>
        <NextIntlClientProvider>
          <AppProvider initialArtwork={artworkData}>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}