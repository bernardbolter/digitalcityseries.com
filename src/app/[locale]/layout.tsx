import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider, createTranslator } from 'next-intl'
import { setRequestLocale } from "next-intl/server"
import {routing} from '@/i18n/routing'
import CookieConsentManager from "@/components/gdpr/CookieConsentManager"
import { GATracker } from "@/components/gdpr/GATracker"
import { AppProvider } from "@/context/AppContext"
import { getArtworkData } from "@/lib/getArtworkData"
import { ReactNode } from "react"
import '@/styles/index.scss'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
} : {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    console.log(error)
    notFound()
  }

  const t = createTranslator({ locale, messages })

  const alternates = {
    canonical: `https://www.digitalcityseries.com/${locale}`,
    languages: {
      'da': 'https://www.digitalcityseries.com/da',
      'de': 'https://www.digitalcityseries.com/de',
      'en': 'https://www.digitalcityseries.com/en',
      'es': 'https://www.digitalcityseries.com/es',
      'fr': 'https://www.digitalcityseries.com/fr',
      'hr': 'https://www.digitalcityseries.com/hr',
      'it': 'https://www.digitalcityseries.com/it',
      'lv': 'https://www.digitalcityseries.com/lv',
      'pt': 'https://www.digitalcityseries.com/pt',
      'sv': 'https://www.digitalcityseries.com/sv',
      'th': 'https://www.digitalcityseries.com/th',
      'tr': 'https://www.digitalcityseries.com/tr',
      'yue': 'https://www.digitalcityseries.com/yue',
      'zh': 'https://www.digitalcityseries.com/zh',
    }
  };

  return {
    title: t('site.title'),
    description: t('site.description'),
    openGraph: {
      title: t('site.title'),
      description: t('site.description'),
      url: `https://www.digitalcityseries.com/${locale}`,
      siteName: 'Digital City Series',
      images: [
        {
          url: '/images/bernard_bolter_portrait.jpg',
          width: 1200,
          height: 630,
          alt: t('site.title'),
        }
      ],
      locale: locale === 'yue' ? 'zh_HK' : locale === 'zh' ? 'zh_CN' : locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('site.title'),
      description: t('site.description'),
      images: ['/images/bernard_bolter_portrait.jpg']
    },
    alternates,
    metadataBase: new URL('https://www.digitalcityseries.com')
  }
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
          <GATracker />
          <CookieConsentManager key={locale} />
          <AppProvider initialArtwork={artworkData}>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}