import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|en|fr|es|it|yue|sv|pt|da|lv|tr|hr|zh|th)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};