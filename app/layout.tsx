import { cookies, headers } from 'next/headers';
import { LanguageProvider } from "./providers/LanguageProvider";
import { ClientLayout } from "./providers/ClientLayout";
import { ThemeProvider } from "./providers/ThemeProvider";
import TanstackProvider from "./providers/tanstack.provider";
import { Locale } from "./lib/dictionary";
import MainLayout from "./components/MainLayout";
import type { Metadata } from "next";
import "./globals.css";

import { Poiret_One, Open_Sans, IBM_Plex_Mono } from "next/font/google";

const poiret = Poiret_One({ subsets: ["latin"], weight: "400", variable: "--font-poiret" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "dranzr",
  description: "dranzr — building modern digital products and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  
  let initialLang: Locale = 'en'; // Default to English ("Rest of world")
  
  if (localeCookie && (localeCookie === 'es' || localeCookie === 'en')) {
     initialLang = localeCookie as Locale;
  } else {
     const headersList = headers();
     const acceptLang = headersList.get('accept-language') || '';
     if (acceptLang.startsWith('es')) {
        initialLang = 'es'; // Spanish for LatAm/Spanish speakers
     }
  }

  return (
    <html lang={initialLang} className={`${poiret.variable} ${openSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {}
              })()
            `
          }}
        />
      </head>
      <body className={openSans.className}>
        <ThemeProvider>
          <TanstackProvider>
            <LanguageProvider initialLang={initialLang}>
              <ClientLayout>
                <MainLayout>
                  {children}
                </MainLayout>
              </ClientLayout>
            </LanguageProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}