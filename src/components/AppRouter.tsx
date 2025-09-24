'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/context/LocaleContext'
import Header from '@/components/header/Header'
import About from '@/components/about/About'
import Paintings from '@/components/paintings/Paintings'
import ArtworkGrid from './artwork/ArtworkGrid'
import Footer from '@/components/footer/Footer'

type RouteConfig = {
  path: string;
  component: ReactNode;
  exact?: boolean;
};

const AppRouter = () => {
  const pathname = usePathname()
  const { locale } = useLocale()

  // Define your routes
  const routes: RouteConfig[] = [
    {
      path: `/${locale}`,
      component: (
        <>
          <Header />
          <About />
          <Paintings />
          <ArtworkGrid />
          <Footer />
        </>
      ),
      exact: true,
    },
    {
      path: '/',
      component: (
        <>
          <Header />
          <About />
          <Paintings />
          <ArtworkGrid />
          <Footer />
        </>
      ),
      exact: true,
    },
    // Add more routes as needed
  ];

  // Find the matching route
  const currentRoute = routes.find(route => {
    if (route.exact) {
      return pathname === route.path;
    }
    return pathname.startsWith(route.path);
  });

  // Render the layout with the current route's component
  const renderContent = () => {
    return (
        <main className="layout__main">
          {currentRoute?.component || null}
        </main>
    );
  };

  return renderContent();
};

export default AppRouter;
