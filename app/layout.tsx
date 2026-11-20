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
    "création de site internet artisan Toulon",
    "artisan multiservices Var",
    "site vitrine La Seyne-sur-Mer",
    "outil de gestion devis artisans",
  ],
  openGraph: {
    title: "MD Multiservices 83",
    description:
      "Un artisan local pour vos dépannages et petits travaux dans le Var.",
    url: "https://www.mdmultiservices83.fr",
    images: [{ url: "/Logo/logo.jpg", alt: "MD Multiservices 83" }],
    siteName: "MD Multiservices 83",
    type: "website",
    locale: "fr_FR",
  },
  twitter: { card: "summary", title: "MD Multiservices 83", description: "Électricité, petits travaux et création de sites internet pour les professionnels." },
  robots: { index: true, follow: true },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "MD Multiservices 83",
  url: "https://www.mdmultiservices83.fr/",
  telephone: "+33768092153",
  email: "mdmultiservices83@gmail.com",
  image: "https://www.mdmultiservices83.fr/Logo/logo.jpg",
  address: { "@type": "PostalAddress", addressLocality: "La Seyne-sur-Mer", postalCode: "83500", addressRegion: "Var", addressCountry: "FR" },
  areaServed: ["La Seyne-sur-Mer", "Toulon", "Six-Fours-les-Plages", "Ollioules", "Saint-Mandrier-sur-Mer", "La Garde", "La Valette-du-Var", "Le Pradet"],
  description: "Dépannage électrique, réparations et petits travaux dans le Var. Création de sites internet et d'outils de gestion pour professionnels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu-principal" className="skip-link">Aller au contenu principal</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}