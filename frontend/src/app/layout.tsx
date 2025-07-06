import type { Metadata } from "next";
import { Inter,Poppins  } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ['200', '400', '700'],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '600'],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "EPTA-Fullstack Vehicle Manage – Teste Técnico",
  description: "Sistema completo para gerenciamento de veículos. Teste técnico para Fullstack.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
