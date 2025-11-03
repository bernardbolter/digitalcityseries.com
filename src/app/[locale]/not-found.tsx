import { getTranslations } from 'next-intl/server'
import LoadingGlobe from '@/svg/LoadingGlobe'
import Link from 'next/link'
import '@/styles/components/_not-found.scss'

export default async function NotFound() {
    const t = await getTranslations('notFound')

    return (
        <div className="not-found__container">
        <div className="not-found__sky" />
        <div className="not-found__text">
            <h1>404</h1>
            <h2>{t('heading')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('description') }} />
            <Link href="/">
            {t('returnHome')}
            </Link>
            <Link href="/business-plan">
            {t('reviewMission')}
            </Link>
        </div>
        <div className="not-found__globe">
            <LoadingGlobe />
        </div>
        </div>
    )
}

export async function generateMetadata() {
  const t = await getTranslations('notFound');
  return { title: t('metaTitle') };
}