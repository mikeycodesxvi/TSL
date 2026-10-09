import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KC Soup Bar & Momos | Legendary Himalayan Broths & Artisanal Momos Since 1989",
  description:
    "Dehradun's iconic culinary landmark since 1989. Handcrafted steamed & tandoori momos, slow-simmered Himalayan dumpling soups, piping hot thukpa, and wok specialties on Rajpur Road, Jakhan.",
  keywords: [
    "KC Soup Bar",
    "KC Momos Dehradun",
    "Best Momos in Dehradun",
    "Rajpur Road Jakhan Momos",
    "Tibetan Thukpa Dehradun",
    "KC Soup Bar Rajpur Road",
    "Dumpling Soup Dehradun",
  ],
  openGraph: {
    title: "KC Soup Bar & Momos | The Soul of Dehradun Since 1989",
    description: "35+ years of legendary momos & slow-simmered broths in the Himalayan foothills.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
