const googleBusinessUrl = "https://share.google/VcY2B8sPoMXdcNlpc";
const logoUrl = "/Logo/logo.jpg";

const photos: { avant: string[]; pendant: string[]; apres: string[] } = {
  avant: [
    "/Renovation/Avant/Avant-1.jpg",
    "/Renovation/Avant/Avant-2.jpg",
    "/Renovation/Avant/Avant-3.jpg",
    "/Renovation/Avant/Avant-4.jpg",
    "/Renovation/Avant/Avant-5.jpg",
  ],
  pendant: [
    "/Renovation/Pendant/Pendant-1.jpg",
    "/Renovation/Pendant/Pendant-2.jpg",
    "/Renovation/Pendant/Pendant-3.jpg",
  ],
  apres: [],
};

const devisMail = encodeURIComponent(`Bonjour,

Je souhaite vous transmettre une demande de devis.

Nom :
Téléphone :
Ville du chantier :
Adresse approximative du chantier :

Type d'intervention souhaitée :
Électricité / Dépannage / Rénovation / Peinture / Sol PVC / Antenne TV / Autre

Description de la demande :


Photos disponibles :
Oui / Non

Délai souhaité :


Disponibilités pour être rappelé :


Merci.`);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4ecdf] pb-24 text-[#2f261f] md:pb-0">
      <section className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#b65f1a]">
            La Seyne-sur-Mer • Toulon • Département du Var
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Un artisan local pour vos dépannages et petits travaux dans le Var
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f534a]">
            Électricité, recherche de panne, antenne TV, peinture, sol PVC et
            petites réparations du quotidien à La Seyne-sur-Mer, Toulon et
            alentours.
          </p>

          <div className="mx-auto mt-7 max-w-2xl rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#eadac7]">
            <p className="text-lg font-black text-[#2f261f]">
              Besoin d’une intervention ?
            </p>
            <p className="mt-2 text-[#6f6258]">
              Le plus simple est d’appeler directement ou d’envoyer quelques
              photos du problème.
            </p>

            <a
              href="tel:0768092153"
              className="mt-5 block rounded-full bg-[#b65f1a] px-7 py-4 text-center text-lg font-black text-white shadow-md hover:bg-[#934812]"
            >
              📞 Appeler maintenant : 07 68 09 21 53
            </a>
          </div>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/33768092153"
              className="rounded-full bg-[#256d3b] px-7 py-3 text-center font-bold text-white shadow-md hover:bg-[#1f5b31]"
            >
              💬 Envoyer des photos par WhatsApp
            </a>

            <a
              href={`mailto:mdmultiservices83@gmail.com?subject=Demande%20de%20devis%20MD%20Multiservices%2083&body=${devisMail}`}
              className="rounded-full bg-[#2f261f] px-7 py-3 text-center font-bold text-white shadow-md hover:bg-[#1f1814]"
            >
              ✉️ Demander un devis
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-4">
            <TrustItem text="Contact direct" />
            <TrustItem text="Devis au forfait" />
            <TrustItem text="Intervention locale" />
            <TrustItem text="Explications claires" />
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Services proposés</h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#6f6258]">
            Les interventions sont étudiées selon l’état réel du chantier. Le
            prix est proposé au forfait après échange ou diagnostic.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ServiceCard
              title="Électricité"
              items={[
                "Recherche de panne électrique",
                "Remplacement de prises",
                "Remplacement d’interrupteurs",
                "Pose de luminaires et appliques",
                "Petites interventions électriques",
              ]}
            />

            <ServiceCard
              title="Dépannage"
              items={[
                "Antenne TV",
                "Diagnostic simple",
                "Petites réparations",
                "Aide au repérage du problème",
                "Intervention sur rendez-vous",
              ]}
            />

            <ServiceCard
              title="Rénovation légère"
              items={[
                "Peinture",
                "Sol PVC / lino",
                "Petites reprises",
                "Préparation de support",
                "Petits travaux du quotidien",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Comment ça se passe ?</h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#6f6258]">
            Le but est de rester simple : comprendre le besoin, vérifier si
            l’intervention est possible, puis proposer une solution claire.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            <Step
              number="1"
              title="Vous appelez"
              text="Ou vous envoyez un message avec quelques explications."
            />
            <Step
              number="2"
              title="Vous envoyez des photos"
              text="Cela permet d’évaluer plus vite le type d’intervention."
            />
            <Step
              number="3"
              title="Le besoin est étudié"
              text="Je vérifie si l’intervention entre dans mon champ d’action."
            />
            <Step
              number="4"
              title="Devis au forfait"
              text="Le prix est annoncé avant intervention, selon le chantier."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eadac7] px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Réalisations</h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#5f534a]">
            Quelques photos de chantiers permettent de voir les étapes :
            préparation, intervention et résultat final.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PhotoBlock title="Avant travaux" items={photos.avant.slice(0, 3)} />
            <PhotoBlock
              title="Pendant travaux"
              items={photos.pendant.slice(0, 3)}
            />

            {photos.apres.length > 0 && (
              <PhotoBlock
                title="Après travaux"
                items={photos.apres.slice(0, 3)}
              />
            )}
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-[#6f6258] shadow-sm ring-1 ring-[#d7c0a7]">
            Les photos “après travaux” seront ajoutées progressivement pour
            montrer le résultat final des interventions.
          </p>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-md ring-1 ring-[#eadac7]">
            <h2 className="text-3xl font-black">
              Une intervention simple et claire
            </h2>

            <p className="mt-5 leading-8 text-[#6f6258]">
              MD Multiservices 83 propose des interventions de proximité dans le
              Var, avec un échange direct, une évaluation réaliste du besoin et
              un devis adapté au chantier.
            </p>

            <p className="mt-4 leading-8 text-[#6f6258]">
              L’objectif est d’éviter les mauvaises surprises : vous envoyez les
              informations utiles, les photos si possible, puis l’intervention
              est étudiée avant validation.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f261f] p-8 text-white shadow-md">
            <h2 className="text-3xl font-black">À envoyer pour un devis</h2>

            <ul className="mt-6 space-y-4 text-stone-200">
              <li>📍 Ville et adresse approximative du chantier</li>
              <li>📸 Photos du problème ou de la zone concernée</li>
              <li>🧰 Type d’intervention souhaitée</li>
              <li>⏱️ Délai souhaité</li>
              <li>📞 Disponibilités pour être rappelé</li>
            </ul>

            <p className="mt-6 rounded-2xl bg-white/10 p-4 text-stone-200">
              Vous pouvez simplement appeler si vous préférez expliquer la
              situation directement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-md ring-1 ring-[#eadac7]">
          <h2 className="text-3xl font-black">Demande de devis</h2>

          <p className="mt-4 max-w-3xl leading-8 text-[#6f6258]">
            Le bouton ci-dessous ouvre un email déjà prérempli avec les
            informations utiles. Il n’est pas obligatoire de tout remplir, mais
            plus la demande est précise, plus la réponse sera rapide.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <Step
              number="1"
              title="Décrivez le besoin"
              text="Même quelques lignes suffisent pour commencer."
            />
            <Step
              number="2"
              title="Ajoutez des photos"
              text="Photos de la panne, de la pièce ou de la zone concernée."
            />
            <Step
              number="3"
              title="Indiquez vos disponibilités"
              text="Cela permet d’organiser un rappel ou un rendez-vous."
            />
          </div>

          <div className="mt-8 rounded-[2rem] bg-[#f3eadb] p-6 text-center">
            <a
              href={`mailto:mdmultiservices83@gmail.com?subject=Demande%20de%20devis%20MD%20Multiservices%2083&body=${devisMail}`}
              className="inline-block rounded-full bg-[#b65f1a] px-7 py-4 text-lg font-black text-white shadow-md hover:bg-[#934812]"
            >
              ✉️ Envoyer une demande de devis
            </a>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6f6258]">
              Les photos ne s’ajoutent pas automatiquement au mail : vous pouvez
              les joindre ensuite depuis votre téléphone ou votre ordinateur.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Zone d’intervention</h2>

          <p className="mt-4 leading-8 text-[#6f6258]">
            Intervention dans le département du Var, notamment à La
            Seyne-sur-Mer, Toulon, Six-Fours-les-Plages, Ollioules,
            Saint-Mandrier, La Garde, La Valette-du-Var, Le Pradet et les
            communes alentours.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              "La Seyne-sur-Mer",
              "Toulon",
              "Six-Fours-les-Plages",
              "Ollioules",
              "Saint-Mandrier",
              "La Garde",
              "La Valette-du-Var",
              "Le Pradet",
              "Hyères selon intervention",
            ].map((city) => (
              <div
                key={city}
                className="rounded-2xl bg-white p-4 font-semibold text-[#5f534a] shadow-sm ring-1 ring-[#eadac7]"
              >
                📍 {city}
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-white p-5 text-[#6f6258] shadow-sm ring-1 ring-[#eadac7]">
            Pour une activité de déplacement chez les clients, il est préférable
            d’afficher une zone d’intervention plutôt qu’une adresse personnelle
            complète.
          </p>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#2f261f] p-8 text-white shadow-lg">
          <h2 className="text-3xl font-black">Google Business</h2>

          <p className="mt-4 max-w-3xl leading-8 text-stone-200">
            Retrouvez MD Multiservices 83 sur Google pour consulter les
            informations de contact, les photos et les avis clients.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-7 py-3 text-center font-bold text-[#2f261f] hover:bg-[#fff8ed]"
            >
              ⭐ Ouvrir la fiche Google
            </a>

            <a
              href="tel:0768092153"
              className="inline-block rounded-full bg-[#b65f1a] px-7 py-3 text-center font-bold text-white hover:bg-[#934812]"
            >
              📞 Appeler
            </a>
          </div>

          <p className="mt-6 text-sm leading-6 text-stone-300">
            Les avis clients et les photos de réalisations sont importants pour
            rassurer les nouveaux clients.
          </p>
        </div>
      </section>

      <section className="bg-[#2f261f] px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black">Besoin d’une intervention ?</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-300">
            Appelez directement ou envoyez quelques photos pour une première
            évaluation.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:0768092153"
              className="rounded-full bg-[#b65f1a] px-7 py-4 text-lg font-black text-white hover:bg-[#934812]"
            >
              📞 07 68 09 21 53
            </a>

            <a
              href="https://wa.me/33768092153"
              className="rounded-full bg-[#256d3b] px-7 py-4 text-lg font-black text-white hover:bg-[#1f5b31]"
            >
              💬 WhatsApp
            </a>

            <a
              href={`mailto:mdmultiservices83@gmail.com?subject=Demande%20de%20devis%20MD%20Multiservices%2083&body=${devisMail}`}
              className="rounded-full bg-white px-7 py-4 text-lg font-black text-[#2f261f] hover:bg-[#fff8ed]"
            >
              ✉️ Devis
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#f3eadb] px-5 py-10 text-center text-[#6f6258]">
        <img
          src={logoUrl}
          alt="Logo MD Multiservices 83"
          className="mx-auto mb-5 h-24 w-24 rounded-full object-cover ring-2 ring-[#d8b58a]"
        />

        <p className="font-black text-[#2f261f]">MD Multiservices 83</p>
        <p>Électricité • Dépannage • Rénovation • Petits travaux</p>
        <p className="mt-2">📞 07 68 09 21 53</p>
        <p>✉️ mdmultiservices83@gmail.com</p>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#d8b58a] bg-[#fff8ed] p-3 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:0768092153"
            className="rounded-2xl bg-[#b65f1a] px-3 py-3 text-center text-sm font-black text-white"
          >
            📞 Appeler
          </a>

          <a
            href="https://wa.me/33768092153"
            className="rounded-2xl bg-[#256d3b] px-3 py-3 text-center text-sm font-black text-white"
          >
            💬 WhatsApp
          </a>

          <a
            href={`mailto:mdmultiservices83@gmail.com?subject=Demande%20de%20devis%20MD%20Multiservices%2083&body=${devisMail}`}
            className="rounded-2xl bg-[#2f261f] px-3 py-3 text-center text-sm font-black text-white"
          >
            ✉️ Devis
          </a>
        </div>
      </nav>
    </main>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#2f261f] shadow-sm ring-1 ring-[#eadac7]">
      ✅ {text}
    </div>
  );
}

function ServiceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-md ring-1 ring-[#eadac7] transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-black text-[#b65f1a]">{title}</h3>

      <ul className="mt-4 space-y-2 text-[#6f6258]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#eadac7]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b65f1a] font-black text-white">
        {number}
      </div>
      <h3 className="mt-4 font-black">{title}</h3>
      <p className="mt-2 text-[#6f6258]">{text}</p>
    </div>
  );
}

function PhotoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] bg-white p-4 shadow-md ring-1 ring-[#d7c0a7]">
      <h3 className="mb-4 text-xl font-black text-[#b65f1a]">{title}</h3>

      <div className="grid gap-3">
        {items.map((src, index) => (
          <a key={src} href={src} target="_blank" rel="noopener noreferrer">
            <img
              src={src}
              alt={`${title} ${index + 1}`}
              className="h-52 w-full rounded-2xl object-cover transition hover:scale-[1.02]"
            />
          </a>
        ))}
      </div>
    </div>
  );
}