/* eslint-disable */
import { Locales } from 'intlayer';
import _Xvw4d2hE1LSG6Fidx5dk from './home.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "home": typeof _Xvw4d2hE1LSG6Fidx5dk;
  }

  type DeclaredLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
  type RequiredLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
  type ExtractedLocales = Extract<Locales, RequiredLocales>;
  type ExcludedLocales = Exclude<Locales, RequiredLocales>;
  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
}