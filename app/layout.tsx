import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD Multiservices 83 | Dépannage, électricité et petits travaux dans le Var",
  description:
    "MD Multiservices 83 intervient à La Seyne-sur-Mer, Toulon et dans le Var pour l’électricité, la recherche de panne, l’antenne TV, la peinture, le sol PVC et les petits travaux du quotidien.",
  keywords: [
    "MD Multiservices 83",
    "électricien La Seyne-sur-Mer",
    "dépannage électrique Toulon",
    "petits travaux Var",
    "antenne TV Var",
    "peinture La Seyne-sur-Mer",
    "sol PVC Toulon",
    "artisan multiservices Var",
  ],
  openGraph: {
    title: "MD Multiservices 83",
    description:
      "Un artisan local pour vos dépannages et petits travaux dans le Var.",
    url: "https://md-multiservices.vercel.app",
    siteName: "MD Multiservices 83",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}