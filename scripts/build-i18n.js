const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { copySync } = require('fs-extra');

// Get the list of supported locales from environment variables
const defaultLocale = process.env.DEFAULT_LOCALE || 'en';
const supportedLocales = (process.env.SUPPORTED_LOCALES || 'en,fr,es').split(',');

console.log('Building static site with i18n support...');

// First build the site normally
console.log('Building base site...');
try {
  execSync('next build', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('Successfully built base site');
} catch (error) {
  console.error('Error building base site:', error);
  process.exit(1);
}

// Create locale-specific directories and copy the built files
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) {
  console.error('Error: out directory not found. Make sure the build was successful.');
  process.exit(1);
}

// Create a directory for each locale
supportedLocales.forEach(locale => {
  console.log(`Creating directory for locale: ${locale}`);
  const localeDir = path.join(outDir, locale);
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir, { recursive: true });
  }
  
  // Copy all files from the out directory to the locale directory
  try {
    const files = fs.readdirSync(outDir);
    files.forEach(file => {
      if (file !== locale && !supportedLocales.includes(file)) {
        const srcPath = path.join(outDir, file);
        const destPath = path.join(localeDir, file);
        
        if (fs.lstatSync(srcPath).isDirectory()) {
          copySync(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    });
    
    console.log(`Successfully created locale directory for: ${locale}`);
  } catch (error) {
    console.error(`Error creating locale directory for ${locale}:`, error);
  }
});

// Create an index.html in the root out directory that redirects to the default locale
const redirectHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0;url=/${defaultLocale}/index.html">
    <title>Redirecting to ${defaultLocale}</title>
  </head>
  <body>
    Redirecting to <a href="/${defaultLocale}/index.html">${defaultLocale}</a>...
  </body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), redirectHtml);
console.log(`Created redirect to default locale: ${defaultLocale}`);

console.log('Static site build with i18n support complete!');

