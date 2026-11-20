"use client";

import { useState, type FormEvent } from "react";
import { checkPhotos, photoAccept, photoDraft } from "./photo-mail";

const offers = [
  { id: "page", label: "Site une page", price: "590 €", detail: "Présentez votre activité, vos services et vos coordonnées sur une seule page." },
  { id: "vitrine", label: "Site vitrine jusqu’à 5 pages", price: "1 090 €", detail: "Organisez vos services, vos réalisations et vos informations de contact en plusieurs pages." },
  { id: "outil", label: "Outil de gestion sur mesure", price: "À partir de 2 490 €", detail: "Retrouvez vos dossiers clients, vos devis et vos interventions dans un outil adapté à votre façon de travailler." },
  { id: "suivi-site", label: "Maintenance de site internet", price: "39 € / mois", detail: "Suivi mensuel facultatif pour votre site." },
  { id: "suivi-outil", label: "Maintenance de logiciel", price: "79 € / mois", detail: "Suivi mensuel facultatif pour votre outil de gestion." }
] as const;

export type RequestKind = "travaux" | typeof offers[number]["id"];
type Props = { kind: RequestKind; onChange: (kind: RequestKind) => void };

export function DigitalOffers({ onSelect }: { onSelect: Props["onChange"] }) {
  return (
    <section id="services-numeriques" aria-labelledby="digital-title" className="bg-[#fff8ed] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <h2 id="digital-title" className="text-3xl font-black">Sites internet &amp; outils de gestion</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8">J’ai créé ce site pour présenter mes chantiers et mon propre outil pour suivre mes clients, mes devis et mes factures. Je peux aussi créer le site ou le logiciel dont votre activité a besoin.</p>
        <a className="mt-3 inline-block font-bold underline underline-offset-4" href="https://md-multiservices-manager.vercel.app/demo">Découvrir le Manager avec des données de démonstration →</a>
        <p className="mt-5 leading-7">Tarifs indicatifs. Le devis précise le contenu et les délais de votre projet.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {offers.slice(0, 3).map(offer => (
            <article key={offer.id} className="flex flex-col items-start rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{offer.label}</h3>
              <p className="my-2 text-2xl font-black">{offer.price}</p>
              <p className="mb-4 leading-7">{offer.detail}</p>
              <a href="#demande-devis" onClick={() => onSelect(offer.id)} aria-label={`Demander un devis pour ${offer.label}`} className="mt-auto font-bold underline underline-offset-4">Demander un devis</a>
            </article>
          ))}
        </div>
        <h3 className="mt-8 text-xl font-bold">Maintenance facultative</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">{offers.slice(3).map(offer =>
          <a key={offer.id} href="#demande-devis" onClick={() => onSelect(offer.id)} className="rounded-xl border border-[#d7c0a7] bg-white p-4 underline underline-offset-4">{offer.label} · {offer.price}</a>
        )}</div>
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

  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const files = data.getAll("photos").filter((v): v is File => v instanceof File && !!v.name);
    const rows = Array.from(data.entries())
      .filter(([name, value]) => name !== "service" && typeof value === "string" && value.trim())
      .map(([name, value]) => `${name} : ${String(value).trim()}`);
    const subject = encodeURIComponent(`Demande de devis — ${service}`);
    const body = ["Bonjour,", "", `Je souhaite un devis pour la prestation « ${service} ».`, "", ...rows, "", "Merci."].join("\n");
    const button = (event.nativeEvent as SubmitEvent).submitter;
    if (files.length && !(button instanceof HTMLButtonElement && button.value === "manual")) {
      setBusy(true);
      try {
        const draft = await photoDraft(body, files);
        const url = URL.createObjectURL(draft);
        const link = document.createElement("a");
        link.href = url;
        link.download = "demande-devis-travaux.eml";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
        setStatus("Le brouillon a été téléchargé. Ouvrez-le dans une messagerie compatible, vérifiez les photos jointes puis envoyez-le. Avec un webmail, utilisez le bouton de préparation sans pièces jointes et ajoutez vos photos dans le message.");
      } catch {
        setStatus("Le brouillon n’a pas pu être créé. Vous pouvez préparer le message sans pièces jointes et ajouter vos photos dans votre messagerie.");
      } finally { setBusy(false); }
      return;
    }
    window.location.href = `mailto:mdmultiservices83@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="demande-devis" aria-labelledby="quote-title" className="px-5 py-14">
      <form onSubmit={prepareEmail} className="mx-auto max-w-3xl space-y-5 rounded-3xl bg-white p-6 shadow-md md:p-9">
        <h2 id="quote-title" className="text-3xl font-black">Demande de devis</h2>
        <label className={label}>Votre demande<select name="service" className={field} value={kind} onChange={e => { setStatus(""); onChange(e.target.value as RequestKind); }}>
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
          <label className={label}>Photos du chantier (facultatif)
            <input name="photos" type="file" multiple accept={photoAccept} className={field} aria-describedby="photo-help"
              onChange={e => { const input = e.currentTarget; input.setCustomValidity(checkPhotos(Array.from(input.files ?? []))); input.reportValidity(); setStatus(""); }} />
          </label>
          <p id="photo-help" className="text-sm">JPG, PNG, WebP, HEIC ou HEIF · 15 Mo au total. Avec des photos, le bouton prépare un brouillon .eml à ouvrir dans votre messagerie.</p>
        </div> : <div className="space-y-4" key="numerique">
          <label className={label}>Entreprise ou activité<input name="Entreprise ou activité" autoComplete="organization" className={field} /></label>
          <label className={label}>Site internet actuel (si disponible)<input name="Site actuel" className={field} /></label>
        </div>}
        <label className={label}>{works ? "Décrivez l’intervention" : maintenance ? "Que souhaitez-vous entretenir ou corriger ?" : kind === "outil" ? "Quelles tâches souhaitez-vous simplifier ?" : "Que souhaitez-vous présenter sur votre site ?"}
          <textarea key={works ? "travaux" : kind} name="Description" rows={4} maxLength={1600} required className={field} />
        </label>
        <label className={label}>Délai souhaité<input name="Délai souhaité" required placeholder="Par exemple, dans le mois" className={field} /></label>
        <label className={label}>Disponibilités pour être rappelé<input name="Disponibilités" className={field} /></label>
        <p>Vous relisez votre demande avant de l’envoyer. Vos coordonnées servent à vous répondre et à établir le devis. <a className="underline" href="/mentions-legales#donnees">Données personnelles</a></p>
        <button className="rounded-full bg-[#2f261f] px-6 py-3 font-bold text-white" disabled={busy} type="submit">{busy ? "Préparation…" : "Préparer mon e-mail"}</button>
        {works && <button type="submit" value="manual" disabled={busy} className="block underline underline-offset-4">Ouvrir ma messagerie et y joindre les photos moi-même</button>}
        <p role="status" className="text-sm leading-6">{status}</p>
      </form>
    </section>
  );
}
