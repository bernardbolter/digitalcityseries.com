# Digital City Series Website

This is a static website for the Digital City Series art collection by Bernard Bolter, built with Next.js, SASS using BEM methodology, and React Context for state management.

## Features

- Static website built with Next.js app router
- SASS with BEM methodology for styling
- React Context API for state management
- Responsive design for all device sizes
- Artwork gallery with filtering and search functionality
- Dynamic artwork detail pages
- About section with artist information
- Internationalization (i18n) with support for English, French, and Spanish

## Technology Stack

- **Frontend Framework**: Next.js 15.x
- **Styling**: SASS with BEM methodology
- **State Management**: React Context API
- **Data Fetching**: Axios
- **Utility Libraries**: Lodash
- **Static Export**: Next.js static site generation
- **Internationalization**: Custom i18n implementation for static sites

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a static build of the website:

```bash
npm run build
```

This will generate a static export in the `out` directory that can be deployed to any static hosting service.

To build the site with i18n support for all locales:

```bash
npm run build:i18n
```

This will generate locale-specific directories in the `out` directory, with a redirect from the root to the default locale.

## Internationalization (i18n)

The website supports multiple languages (English, French, and Spanish) using a custom i18n implementation that works with static site generation. Here's how it works:

### Implementation Details

- Uses a custom React Context (`LocaleContext`) to manage the current locale and translations
- Translations are stored in JSON files in the `public/locales` directory
- Language switching is handled client-side using localStorage to persist the user's language preference
- The build process creates separate directories for each locale in the `out` directory

### Adding a New Language

1. Add a new translation file in `public/locales/[language-code]/common.json`
2. Update the `SUPPORTED_LOCALES` environment variable in `next.config.js`

### Usage in Components

```jsx
import { useLocale } from '../context/LocaleContext';

function MyComponent() {
  const { t, locale, setLocale } = useLocale();
  
  return (
    <div>
      <h1>{t('some.translation.key')}</h1>
      <p>Current language: {locale}</p>
      <button onClick={() => setLocale('fr')}>Switch to French</button>
    </div>
  );
}
```

## Project Structure

```
/src
  /app                 # Next.js app router pages
  /components          # React components
    /artwork           # Artwork-related components
    /layout            # Layout components (Header, Footer)
  /context             # React Context providers
  /styles              # SASS styles
    /components        # Component-specific styles
    /pages             # Page-specific styles
    _variables.scss    # SASS variables
    globals.scss       # Global styles
/public                # Static assets
```

## Deployment

This website is configured for static export and can be deployed to any static hosting service like Netlify, Vercel, GitHub Pages, or AWS S3.

## Credits

- Artwork and concept by Bernard Bolter
- Website development by Digital City Series team
