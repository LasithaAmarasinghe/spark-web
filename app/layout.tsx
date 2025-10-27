import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { inter } from '@/utils/font_utils';

export const metadata: Metadata = {
  title: 'Spark',
  description: 'The Spark Website from ENTC',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='/spark/favicon.ico'
          sizes='any'
        />
        <link
          rel='icon'
          href='/spark/favicons/favicon-16x16.png'
          sizes='16x16'
          type='image/png'
        />
        <link
          rel='icon'
          href='/spark/favicons/favicon-32x32.png'
          sizes='32x32'
          type='image/png'
        />
        <link
          rel='apple-touch-icon'
          href='/spark/favicons/apple-touch-icon.png'
          sizes='180x180'
        />
        <link
          rel='manifest'
          href='/spark/site.webmanifest'
        />
        {/* Set default color scheme */}
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='dark'>{children}</MantineProvider>
      </body>
    </html>
  );
}

export default RootLayout;
