import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://fullsense.fullsense.workers.dev"),

  title: {
    default: "Fullsense | Perfumería",
    template: "%s | Fullsense",
  },

  description:
    "Perfumes de diseñador y perfumes árabes en Bucaramanga. Envíos gratis en Bucaramanga y área metropolitana y pago contra entrega.",

  applicationName: "Fullsense",

  icons: {
    icon: "/logo-fullsense.png",
    shortcut: "/logo-fullsense.png",
    apple: "/logo-fullsense.png",
  },

  openGraph: {
    title: "Fullsense | Perfumería",
    description:
      "Perfumes de diseñador y perfumes árabes en Bucaramanga. Envíos gratis y pago contra entrega.",
    url: "https://fullsense.fullsense.workers.dev",
    siteName: "Fullsense Perfumería",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/logo-fullsense.png",
        width: 1200,
        height: 630,
        alt: "Fullsense Perfumería",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fullsense | Perfumería",
    description:
      "Perfumes de diseñador y perfumes árabes en Bucaramanga.",
    images: ["/logo-fullsense.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}