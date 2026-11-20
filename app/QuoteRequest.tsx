"use client";

import type { FormEvent } from "react";

const offers = [
  { id: "page", label: "Site une page", price: "590 €", detail: "Présentez votre activité, vos services et vos coordonnées sur une seule page." },
  { id: "vitrine", label: "Site vitrine jusqu’à 5 pages", price: "1 090 €", detail: "Organisez vos services, vos réalisations et vos informations de contact en plusieurs pages." },
  { id: "outil", label: "Outil de gestion sur mesure", price: "À partir de 2 490 €", detail: "Décrivez les tâches à simplifier, les personnes qui utilisent l’outil et les informations à suivre." },
  { id: "suivi-site", label: "Maintenance de site internet", price: "39 € / mois", detail: "Suivi mensuel facultatif pour votre site." },
  { id: "suivi-outil", label: "Maintenance de logiciel", price: "79 € / mois", detail: "Suivi mensuel facultatif pour votre outil de gestion." }
] as const;

export type RequestKind = "travaux" | typeof offers[number]["id"];
type Props = { kind: RequestKind; onChange: (kind: RequestKind) => void };

export function DigitalOffers({ onSelect }: { onSelect: Props["onChange"] }) {
  return (
    <section id="services-numeriques" aria-labelledby="digital-title" className="bg-[#fff8ed] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <h2 id="digital-title" className="text-3xl font-black">Sites internet et outils de gestion</h2>
        <p className="mt-3 leading-7">Tarifs indicatifs. Le devis précise le contenu et les délais de votre projet.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {offers.map(offer => (
            <article key={offer.id} className="flex flex-col items-start rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{offer.label}</h3>
              <p className="my-2 text-2xl font-black">{offer.price}</p>
              <p className="mb-4 leading-7">{offer.detail}</p>
              <a href="#demande-devis" onClick={() => onSelect(offer.id)} aria-label={`Demander un devis pour ${offer.label}`} className="mt-auto font-bold underline underline-offset-4">Demander un devis</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const field = "mt-1 block w-full rounded-xl border border-stone-400 bg-white px-3 py-2 font-normal";
const label = "block font-semibold";

export function QuoteForm({ kind, onChange }: Props) {
  const works = kind === "travaux";
  const maintenance = kind === "suivi-site" || kind === "suivi-outil";
  const service = offers.find(offer => offer.id === kind)?.label ?? "Travaux et dépannage";

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rows = Array.from(new FormData(event.currentTarget).entries())
      .filter(([name, value]) => name !== "service" && String(value).trim())
      .map(([name, value]) => `${name} : ${String(value).trim()}`);
    const subject = encodeURIComponent(`Demande de devis — ${service}`);
    const body = encodeURIComponent(["Bonjour,", "", `Je souhaite un devis pour la prestation « ${service} ».`, "", ...rows, "", "Merci."].join("\n"));
    window.location.href = `mailto:mdmultiservices83@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="demande-devis" aria-labelledby="quote-title" className="px-5 py-14">
      <form onSubmit={prepareEmail} className="mx-auto max-w-3xl space-y-5 rounded-3xl bg-white p-6 shadow-md md:p-9">
        <h2 id="quote-title" className="text-3xl font-black">Demande de devis</h2>
        <label className={label}>Votre demande<select name="service" className={field} value={kind} onChange={e => onChange(e.target.value as RequestKind)}>
          <option value="travaux">Travaux et dépannage</option>
          {offers.map(offer => <option key={offer.id} value={offer.id}>{offer.label}</option>)}
        </select></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>Nom<input name="Nom" autoComplete="name" required className={field} /></label>
          <label className={label}>Téléphone<input name="Téléphone" type="tel" autoComplete="tel" required className={field} /></label>
        </div>
        {works ? <div className="space-y-4" key="chantier">
          <label className={label}>Adresse et ville de l’intervention<input name="Adresse du chantier" required className={field} /></label>
          <label className={label}>Type d’intervention<select name="Intervention" required defaultValue="" className={field}>
            <option value="" disabled>Choisir une intervention</option>
            {["Dépannage électrique", "Installation électrique", "Peinture", "Petite rénovation", "Autre"].map(item => <option key={item}>{item}</option>)}
          </select></label>
          <label className={label}>Photos disponibles<select name="Photos disponibles" required defaultValue="" className={field}><option value="" disabled>Choisir une réponse</option><option>Oui</option><option>Non</option></select></label>
        </div> : <div className="space-y-4" key="numerique">
          <label className={label}>Entreprise ou activité<input name="Entreprise ou activité" autoComplete="organization" className={field} /></label>
          <label className={label}>Site internet actuel (si disponible)<input name="Site actuel" className={field} /></label>
        </div>}
        <label className={label}>{works ? "Décrivez l’intervention" : maintenance ? "Que souhaitez-vous entretenir ou corriger ?" : kind === "outil" ? "Quelles tâches souhaitez-vous simplifier ?" : "Que souhaitez-vous présenter sur votre site ?"}
          <textarea key={works ? "travaux" : kind} name="Description" rows={4} maxLength={1600} required className={field} />
        </label>
        <label className={label}>Délai souhaité<input name="Délai souhaité" required placeholder="Par exemple, dans le mois" className={field} /></label>
        <label className={label}>Disponibilités pour être rappelé<input name="Disponibilités" className={field} /></label>
        <p>Votre messagerie s’ouvrira avec la demande préremplie. Vous pourrez y joindre vos photos et envoyer le message.</p>
        <button className="rounded-full bg-[#2f261f] px-6 py-3 font-bold text-white" type="submit">Préparer mon e-mail</button>
      </form>
    </section>
  );
}
