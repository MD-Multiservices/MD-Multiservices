import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mdmultiservices83.fr"),
  alternates: { canonical: "/" },
  title: "Électricien à La Seyne-sur-Mer et Toulon | MD Multiservices 83",
  description:
    "Dépannage électrique, luminaires et petits travaux à La Seyne-sur-Mer et Toulon. Découvrez les chantiers, demandez un devis ou présentez votre projet de site internet.",
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
    url: "https://www.mdmultiservices83.fr",
    images: ["/Logo/logo.jpg"],
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