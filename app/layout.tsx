import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ruta Salvaje — Registro de Exploración',
  description:
    'Diario inmersivo de exploración de cascadas, senderos y ríos. Una experiencia visual vanguardista del viaje hacia lo desconocido.',
  openGraph: {
    title: 'Ruta Salvaje — Registro de Exploración',
    description:
      'Diario inmersivo de exploración de cascadas, senderos y ríos.',
    type: 'website',
  },
  themeColor: '#0a0f0c',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
