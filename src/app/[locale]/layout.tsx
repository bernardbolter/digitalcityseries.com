// app/[locale]/layout.tsx
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { AppProvider } from '@/context/AppContext'
import { getArtworkData } from '@/lib/getArtworkData'
import "@/styles/index.scss"

// Optional: Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const messages = await getMessages();
    
    // Fetch artwork data on the server
    const artworkData = await getArtworkData();

    return (
        <NextIntlClientProvider messages={messages}>
            <AppProvider initialArtwork={artworkData}>
                <div className="layout__container">
                    {children}
                </div>
            </AppProvider>
        </NextIntlClientProvider>
    );
}