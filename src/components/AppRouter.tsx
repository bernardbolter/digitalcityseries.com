'use client';

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import About from './artwork/About';
import Search from './artwork/Search';
import ArtworkGrid from './artwork/ArtworkGrid';

type RouteConfig = {
  path: string;
  component: ReactNode;
  exact?: boolean;
};

const AppRouter = () => {
  const pathname = usePathname();
  const { locale } = useLocale();

  // Define your routes
  const routes: RouteConfig[] = [
    {
      path: `/${locale}`,
      component: (
        <>
          <HomePage />
          <About />
          <Search />
          <ArtworkGrid />
        </>
      ),
      exact: true,
    },
    {
      path: '/',
      component: (
        <>
          <HomePage />
          <About />
          <Search />
          <ArtworkGrid />
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
      <div className="layout">
        <Header />
        <main className="layout__main">
          {currentRoute?.component || null}
        </main>
        <Footer />
      </div>
    );
  };

  return renderContent();
};

export default AppRouter;
