import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { AppProvider } from '@/context/AppContext'
import "../../styles/index.scss"

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    setRequestLocale(locale)
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages}>
            <AppProvider>
                <div className="layout__container">
                    {children}
                </div>
            </AppProvider>
        </NextIntlClientProvider>
    )
}