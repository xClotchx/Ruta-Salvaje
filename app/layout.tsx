import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { adventures, optimized } from '../lib/adventures';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const title = 'Ruta Salvaje — Cascadas, senderos y montañas de Chiriquí';
const description =
  'Diario de exploración por Chiriquí, Panamá: cascadas, senderos y volcanes con fotos, datos de cada ruta y enlaces directos a Google Maps.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  themeColor: '#061210',
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'es_PA',
    images: [{ url: optimized(adventures[0].image, 1080, 70), width: 1080, height: 810 }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
