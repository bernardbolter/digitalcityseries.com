import { notFound } from "next/navigation"

export const supportedLocales = [
    'en', 'fr', 'es', 'de', 'it', 'yue', 'sv', 'pt', 'da', 'lv', 'tr', 'hr', 'zh', 'th'
]

export const defaultLocale = 'en'

export const localePrefix = 'always'

export async function getMessages(locale: string) {
    try {
        return (await import(`@/messages/${locale}.json`)).default
    } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error);
        throw new Error(`Could not load messages for locale ${locale}`);
        notFound()
    }
}