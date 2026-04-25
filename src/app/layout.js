import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'IngredientLens — Culinary Discovery',
    template: '%s | IngredientLens',
  },
  description:
    'Discover meals through ingredients. An immersive culinary exploration experience powered by TheMealDB.',
  keywords: ['recipes', 'ingredients', 'food', 'cooking', 'meals', 'culinary'],
  openGraph: {
    title: 'IngredientLens — Culinary Discovery',
    description: 'Discover meals through ingredients. An immersive culinary exploration experience.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IngredientLens — Culinary Discovery',
    description: 'Discover meals through ingredients. An immersive culinary exploration experience.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
