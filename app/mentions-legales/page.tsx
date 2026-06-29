import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | MD Multiservices 83",
  description:
    "Informations légales concernant le site MD Multiservices 83.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#f4ecdf] px-5 py-10 text-[#2f261f] md:py-16">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center rounded-full bg-white px-5 py-3 font-bold text-[#2f261f] shadow-sm ring-1 ring-[#eadac7] transition hover:bg-[#fff8ed]"
        >
          ← Retour au site
        </a>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-md ring-1 ring-[#eadac7] md:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-[#b65f1a]">
            Informations légales
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Mentions légales
          </h1>

          <div className="mt-10 space-y-10">
            <LegalSection title="Éditeur du site">
              <p>
                <strong>Mehdi Derghal EI</strong> — Entrepreneur individuel
              </p>

              <p>
                <strong>Nom commercial :</strong> MD Multiservices 83
              </p>

              <p>
                <strong>SIREN :</strong> 104 499 900
              </p>

              <p>
                <strong>SIRET :</strong> 104 499 900 00017
              </p>

              <p>
                <strong>Adresse :</strong> 21 avenue Julien Belfort,
                83500 La Seyne-sur-Mer
              </p>

              <p>
                <strong>Téléphone :</strong>{" "}
                <a
                  href="tel:0768092153"
                  className="font-bold text-[#b65f1a] underline underline-offset-4"
                >
                  07 68 09 21 53
                </a>
              </p>

              <p>
                <strong>E-mail :</strong>{" "}
                <a
                  href="mailto:mdmultiservices83@gmail.com"
                  className="font-bold text-[#b65f1a] underline underline-offset-4"
                >
                  mdmultiservices83@gmail.com
                </a>
              </p>

              <p>
                <strong>Directeur de la publication :</strong> Mehdi Derghal
              </p>
            </LegalSection>

            <LegalSection title="Hébergement">
              <p>
                Le site est hébergé par :
              </p>

              <p>
                <strong>Vercel Inc.</strong>
                <br />
                440 N Barranca Ave #4133
                <br />
                Covina, CA 91723
                <br />
                États-Unis
              </p>

              <p>
                Site de contact de l’hébergeur :
              </p>

              <a
                href="https://vercel.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#b65f1a] underline underline-offset-4"
              >
                Contacter Vercel
              </a>
            </LegalSection>

            <LegalSection title="Nature des prestations">
              <p>
                MD Multiservices 83 propose notamment des prestations de
                dépannage, d’électricité, de pose ou remplacement de
                luminaires, prises et interrupteurs, de peinture, de petites
                réparations et de rénovation légère.
              </p>

              <p>
                Chaque demande est étudiée selon sa nature, son ampleur, les
                conditions d’accès et l’état réel de l’installation ou du
                support. Les prestations sont réalisées après échange
                préalable et acceptation du devis.
              </p>
            </LegalSection>

            <LegalSection title="Médiation de la consommation">
              <p>
                En cas de désaccord, le client doit d’abord contacter
                MD Multiservices 83 afin de rechercher une solution amiable.
              </p>

              <div className="mt-4 rounded-2xl bg-[#fff3df] p-4 ring-1 ring-[#e6bd89]">
                <p className="font-black text-[#934812]">
                  Information à compléter
                </p>

                <p className="mt-2">
                  Le nom, l’adresse et le site internet du médiateur de la
                  consommation choisi seront ajoutés après la signature de la
                  convention correspondante.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="Données personnelles">
              <p>
                Les informations communiquées volontairement par téléphone,
                WhatsApp ou e-mail sont utilisées uniquement pour répondre aux
                demandes, préparer les devis, organiser les interventions et
                assurer le suivi des prestations.
              </p>

              <p>
                Ces informations ne sont pas vendues. Vous pouvez demander leur
                accès, leur rectification ou leur suppression en écrivant à :
              </p>

              <a
                href="mailto:mdmultiservices83@gmail.com"
                className="font-bold text-[#b65f1a] underline underline-offset-4"
              >
                mdmultiservices83@gmail.com
              </a>
            </LegalSection>

            <LegalSection title="Propriété intellectuelle">
              <p>
                Les textes, photographies, éléments graphiques, logos et autres
                contenus présents sur ce site ne peuvent pas être reproduits,
                utilisés ou diffusés sans autorisation préalable, sauf
                utilisation autorisée par la loi.
              </p>
            </LegalSection>

            <LegalSection title="Cartographie">
              <p>
                La carte de la zone d’intervention est fournie à titre
                indicatif. Elle ne constitue pas un engagement automatique de
                déplacement.
              </p>

              <p>
                Le déplacement est confirmé selon l’adresse, le temps de trajet,
                la disponibilité et la nature de l’intervention.
              </p>
            </LegalSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-black text-[#2f261f]">
        {title}
      </h2>

      <div className="mt-4 space-y-3 leading-8 text-[#6f6258]">
        {children}
      </div>
    </section>
  );
}