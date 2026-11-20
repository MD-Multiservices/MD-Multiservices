import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Création de sites internet pour artisans à Toulon | MD Multiservices 83",
  description: "Site vitrine dès 590 €, création de site professionnel et outils de gestion adaptés aux artisans, indépendants et petites entreprises à Toulon, La Seyne-sur-Mer et ailleurs.",
  alternates: { canonical: "/sites-internet" },
  openGraph: {
    title: "Sites internet & outils de gestion | MD Multiservices 83",
    description: "Sites vitrines, gestion clients et devis : des outils simples et personnalisés, avec tarifs clairs.",
    url: "/sites-internet",
    type: "website",
  },
};

const prestations = [
  {
    name: "Site essentiel",
    price: "590 €",
    detail: "Une page structurée (jusqu’à cinq sections) pour présenter votre activité, vos services et vos coordonnées.",
    items: ["Adapté aux téléphones et ordinateurs", "Formulaire de contact ou lien de prise de contact", "Référencement de base"],
    href: "/#demande-devis",
  },
  {
    name: "Site vitrine professionnel",
    price: "1 090 €",
    detail: "Jusqu’à cinq pages : présentation, prestations, galerie, contact et informations utiles.",
    items: ["Présentation personnalisée", "Galerie et appels à l’action", "Référencement technique de base"],
    href: "/#demande-devis",
  },
  {
    name: "Outil de gestion sur mesure",
    price: "À partir de 2 490 €",
    detail: "Un projet étudié selon vos besoins : clients, dossiers, devis, factures et suivi des prestations.",
    items: ["Étude des fonctionnalités attendues", "Organisation adaptée à votre activité", "Devis détaillé avant développement"],
    href: "/#demande-devis",
  },
] as const;

export default function SitesInternetPage() {
  return (
    <main id="contenu-principal" className="min-h-screen bg-[#f4ecdf] text-[#2f261f]">
      <div className="border-b border-[#dfd3c1] bg-[#faf6ef] px-5 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link className="text-xl font-black" href="/">MD Multiservices <span className="text-[#8a431b]">83</span></Link>
          <nav aria-label="Navigation des services numériques" className="flex flex-wrap items-center gap-5 font-semibold">
            <Link className="underline underline-offset-4" href="/#prestations">Travaux</Link>
            <Link className="underline underline-offset-4" href="/#realisations">Réalisations</Link>
            <Link className="rounded-xl bg-[#8a431b] px-4 py-3 text-white" href="/#demande-devis">Demander un devis</Link>
          </nav>
        </div>
      </div>

      <section className="bg-[#faf6ef] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-wide text-[#8a431b]">Pour artisans, indépendants et petites entreprises</p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight md:text-6xl">Un site professionnel et des outils de gestion adaptés à votre activité</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#574c40]">
            J’ai conçu le site MD Multiservices 83 et un outil pour gérer mes propres clients, devis et factures.
            Je propose aussi cette expérience aux professionnels qui souhaitent une présence en ligne claire ou une application pratique, sans fonctionnalités superflues.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#demande-devis" className="rounded-xl bg-[#8a431b] px-6 py-4 font-bold text-white">Décrire mon projet</Link>
            <a href="https://md-multiservices-manager.vercel.app/demo" className="rounded-xl border border-[#8a431b] px-6 py-4 font-bold text-[#8a431b]" target="_blank" rel="noopener noreferrer">Voir la démonstration du Manager</a>
          </div>
          <p className="mt-4 text-sm text-[#6f6258]">La démonstration utilise des données fictives. Les prestations numériques peuvent être étudiées à distance.</p>
        </div>
      </section>

      <section className="px-5 py-16" aria-labelledby="prestations-numeriques">
        <div className="mx-auto max-w-6xl">
          <h2 id="prestations-numeriques" className="text-3xl font-black">Prestations et tarifs</h2>
          <p className="mt-3 max-w-3xl leading-8 text-[#574c40]">Des forfaits de départ transparents. Un devis définit précisément les pages, fonctionnalités, délais et éventuels frais de services tiers.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {prestations.map((offer) => (
              <article key={offer.name} className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#d7c0a7]">
                <h3 className="text-xl font-black">{offer.name}</h3>
                <p className="mt-3 text-3xl font-black text-[#8a431b]">{offer.price}</p>
                <p className="mt-3 leading-7 text-[#574c40]">{offer.detail}</p>
                <ul className="my-6 space-y-3 text-[#574c40]">
                  {offer.items.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
                <a className="mt-auto inline-block rounded-xl bg-[#2f261f] px-5 py-3 text-center font-bold text-white" href={offer.href}>Demander un devis</a>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 rounded-3xl bg-[#fff8ed] p-6 ring-1 ring-[#d7c0a7] sm:grid-cols-3">
            <div><h3 className="font-bold">Page supplémentaire</h3><p className="mt-1 text-xl font-black">120 € / page</p></div>
            <div><h3 className="font-bold">Maintenance de site</h3><p className="mt-1 text-xl font-black">39 € / mois</p></div>
            <div><h3 className="font-bold">Maintenance d’outil</h3><p className="mt-1 text-xl font-black">79 € / mois</p></div>
            <p className="text-sm leading-6 text-[#574c40] sm:col-span-3">Maintenance facultative, avec périmètre défini au contrat. Nom de domaine, hébergement et services tiers éventuels : coûts précisés séparément au devis. Deux séries d’ajustements incluses pour les sites vitrines, dans le périmètre convenu.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-16" aria-labelledby="etapes-numeriques">
        <div className="mx-auto max-w-6xl">
          <h2 id="etapes-numeriques" className="text-3xl font-black">Un projet simple, du premier échange à la mise en ligne</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["1", "Votre besoin", "Vous décrivez votre activité, les pages et les fonctions souhaitées."],
              ["2", "Une proposition", "Je précise le périmètre, le tarif, les délais et les frais éventuels."],
              ["3", "La réalisation", "Le projet est développé, présenté et ajusté dans le cadre du devis."],
              ["4", "La livraison", "Vous validez les éléments prévus avant leur mise en ligne ou leur remise."]
            ].map(([n,title,description]) => (
              <li key={n} className="rounded-2xl bg-white p-5 ring-1 ring-[#eadac7]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8a431b] font-black text-white">{n}</span>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 leading-7 text-[#574c40]">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-white p-5 ring-1 ring-[#d7c0a7]">
              <summary className="cursor-pointer font-bold">Est-ce que je peux garder mon nom de domaine ?</summary>
              <p className="mt-3 leading-7">Oui, le domaine peut être enregistré à votre nom. Les frais éventuels de domaine et d’hébergement sont présentés séparément.</p>
            </details>
            <details className="rounded-2xl bg-white p-5 ring-1 ring-[#d7c0a7]">
              <summary className="cursor-pointer font-bold">La maintenance est-elle obligatoire ?</summary>
              <p className="mt-3 leading-7">Non. Elle est facultative et fait l’objet d’une proposition précisant les mises à jour et l’assistance incluses.</p>
            </details>
            <details className="rounded-2xl bg-white p-5 ring-1 ring-[#d7c0a7]">
              <summary className="cursor-pointer font-bold">L’outil de gestion transmet-il déjà les factures électroniques officielles ?</summary>
              <p className="mt-3 leading-7">Non. La connexion réglementaire à une plateforme agréée nécessite un développement et des vérifications spécifiques. Elle ne fait pas partie des fonctionnalités actuellement garanties.</p>
            </details>
          </div>
          <div className="mt-10 rounded-3xl bg-[#2f261f] p-7 text-white md:p-9">
            <h2 className="text-2xl font-black">Parlons de votre projet</h2>
            <p className="mt-3 leading-7 text-stone-200">Indiquez votre activité, les fonctionnalités souhaitées et votre budget. Je vous proposerai une solution adaptée.</p>
            <Link href="/#demande-devis" className="mt-6 inline-flex rounded-xl bg-white px-6 py-4 font-bold text-[#2f261f]">Préparer ma demande de devis</Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#f3eadb] px-5 py-8 text-center text-sm text-[#574c40]">
        <p className="font-bold">MD Multiservices 83</p>
        <div className="mt-3 flex flex-wrap justify-center gap-5">
          <Link className="underline" href="/">Accueil</Link>
          <a className="underline" href="mailto:mdmultiservices83@gmail.com">E-mail</a>
          <Link className="underline" href="/mentions-legales">Mentions légales</Link>
        </div>
      </footer>
    </main>
  );
}
