"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { photos } from "./photos";

const googleBusinessUrl =
  "https://share.google/VcY2B8sPoMXdcNlpc";

const logoUrl = "/Logo/logo.jpg";

type MainCategory =
  | "electricite"
  | "peinture"
  | "renovation";

type ElectricalCategory =
  | "depannage"
  | "luminaires"
  | "prises"
  | "tableaux";

type RenovationCategory =
  | "petites"
  | "surMesure";

type LightboxState = {
  title: string;
  items: readonly string[];
  index: number;
} | null;

const devisMail = encodeURIComponent(`Bonjour,

Je souhaite vous transmettre une demande de devis.

Nom :
Téléphone :
Ville du chantier :
Adresse approximative du chantier :

Type d’intervention souhaitée :
Électricité / Dépannage / Luminaire / Prise / Tableau électrique / Peinture / Petite rénovation / Autre

Description de la demande :


Photos disponibles :
Oui / Non

Délai souhaité :


Disponibilités pour être rappelé :


Merci.`);

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState<MainCategory>("electricite");

  const [electricalCategory, setElectricalCategory] =
    useState<ElectricalCategory>("depannage");

  const [renovationCategory, setRenovationCategory] =
    useState<RenovationCategory>("petites");

  const [lightbox, setLightbox] =
    useState<LightboxState>(null);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const galleryContentRef =
    useRef<HTMLDivElement>(null);

  const electricalGalleries = {
    depannage: {
      title: "Dépannage électrique",
      description:
        "Recherche de panne, diagnostic et interventions de dépannage.",
      items: photos.electriciteDepannage,
    },

    luminaires: {
      title: "Luminaires et éclairage",
      description:
        "Pose et remplacement de luminaires, appliques et éclairages.",
      items: photos.electriciteLuminaires,
    },

    prises: {
      title: "Prises et interrupteurs",
      description:
        "Remplacement, réparation et installation de prises ou interrupteurs.",
      items: photos.electricitePrises,
    },

    tableaux: {
      title: "Tableaux électriques",
      description:
        "Interventions ponctuelles et remplacement d’éléments du tableau.",
      items: photos.electriciteTableaux,
    },
  } as const;

  const selectedElectricalGallery =
    electricalGalleries[electricalCategory];

  function selectMainCategory(category: MainCategory) {
    setActiveCategory(category);

    window.setTimeout(() => {
      galleryContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function openLightbox(
    title: string,
    items: readonly string[],
    index: number,
  ) {
    setLightbox({
      title,
      items,
      index,
    });
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function previousPhoto() {
    setLightbox((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        index:
          current.index === 0
            ? current.items.length - 1
            : current.index - 1,
      };
    });
  }

  function nextPhoto() {
    setLightbox((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        index:
          current.index === current.items.length - 1
            ? 0
            : current.index + 1,
      };
    });
  }

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [lightbox]);

  function handleTouchEnd(endX: number) {
    if (touchStartX === null) {
      return;
    }

    const difference = touchStartX - endX;

    if (difference > 50) {
      nextPhoto();
    }

    if (difference < -50) {
      previousPhoto();
    }

    setTouchStartX(null);
  }

  return (
    <main className="min-h-screen bg-[#f4ecdf] pb-24 text-[#2f261f] md:pb-0">
      <section className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#b65f1a]">
            La Seyne-sur-Mer • Toulon • Département du Var
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Dépannage, électricité et petits travaux :
            une réponse claire près de chez vous
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f534a]">
            Recherche de panne, luminaires, prises,
            interrupteurs, antenne TV, peinture et petites
            transformations à La Seyne-sur-Mer, Toulon et
            dans les communes alentour.
          </p>

          <div className="mx-auto mt-7 max-w-2xl rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#eadac7]">
            <p className="text-lg font-black">
              Besoin d’une intervention ?
            </p>

            <p className="mt-2 text-[#6f6258]">
              Appelez directement ou envoyez quelques
              photos pour une première évaluation.
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
          <h2 className="text-3xl font-black">
            Services proposés
          </h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#6f6258]">
            L’électricité et le dépannage constituent
            l’activité principale. Les autres travaux sont
            étudiés selon leur ampleur et les contraintes
            du chantier.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ServiceCard
              title="Électricité"
              badge="Activité principale"
              items={[
                "Recherche de panne électrique",
                "Prises et interrupteurs",
                "Luminaires et appliques",
                "Interventions sur tableau",
                "Dépannage sur rendez-vous",
              ]}
            />

            <ServiceCard
              title="Peinture"
              items={[
                "Préparation des supports",
                "Petites reprises",
                "Peinture murs et plafonds",
                "Finitions",
                "Interventions ponctuelles",
              ]}
            />

            <ServiceCard
              title="Petites rénovations"
              items={[
                "Réparations du quotidien",
                "Joints silicone",
                "Petites transformations",
                "Reprises d’enduit",
                "Travaux étudiés sur devis",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">
            Comment ça se passe ?
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            <Step
              number="1"
              title="Vous contactez"
              text="Par téléphone, WhatsApp ou email."
            />

            <Step
              number="2"
              title="Vous envoyez des photos"
              text="Elles permettent de mieux comprendre la demande."
            />

            <Step
              number="3"
              title="Le besoin est étudié"
              text="Je vérifie la faisabilité et les contraintes."
            />

            <Step
              number="4"
              title="Un forfait est proposé"
              text="Le prix est annoncé avant l’intervention."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eadac7] px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">
            Réalisations
          </h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#5f534a]">
            Choisissez une famille de travaux, puis une
            sous-catégorie pour consulter les photos
            correspondantes.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <CategoryCard
              title="Travaux électriques"
              description="Dépannage, luminaires, prises, interrupteurs et tableaux."
              badge="Activité principale"
              active={activeCategory === "electricite"}
              onClick={() =>
                selectMainCategory("electricite")
              }
            />

            <CategoryCard
              title="Peinture"
              description="Préparation, petites reprises et finitions."
              active={activeCategory === "peinture"}
              onClick={() =>
                selectMainCategory("peinture")
              }
            />

            <CategoryCard
              title="Rénovation"
              description="Petites rénovations et projets étudiés sur mesure."
              active={activeCategory === "renovation"}
              onClick={() =>
                selectMainCategory("renovation")
              }
            />
          </div>

          <div
            ref={galleryContentRef}
            className="scroll-mt-6 pt-8"
          >
            {activeCategory === "electricite" && (
              <div className="rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#d7c0a7]">
                <div className="flex flex-wrap gap-2">
                  <PillButton
                    active={
                      electricalCategory === "depannage"
                    }
                    onClick={() =>
                      setElectricalCategory("depannage")
                    }
                  >
                    Dépannage
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory === "luminaires"
                    }
                    onClick={() =>
                      setElectricalCategory("luminaires")
                    }
                  >
                    Luminaires
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory === "prises"
                    }
                    onClick={() =>
                      setElectricalCategory("prises")
                    }
                  >
                    Prises et interrupteurs
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory === "tableaux"
                    }
                    onClick={() =>
                      setElectricalCategory("tableaux")
                    }
                  >
                    Tableaux
                  </PillButton>
                </div>

                <div className="mt-6">
                  <GalleryCarousel
                    title={
                      selectedElectricalGallery.title
                    }
                    description={
                      selectedElectricalGallery.description
                    }
                    items={
                      selectedElectricalGallery.items
                    }
                    onOpen={openLightbox}
                  />
                </div>
              </div>
            )}

            {activeCategory === "peinture" && (
              <GalleryCarousel
                title="Travaux de peinture"
                description="Préparation, reprises et finitions réalisées lors des interventions."
                items={photos.peinture}
                onOpen={openLightbox}
              />
            )}

            {activeCategory === "renovation" && (
              <div className="rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#d7c0a7]">
                <div className="flex flex-wrap gap-2">
                  <PillButton
                    active={
                      renovationCategory === "petites"
                    }
                    onClick={() =>
                      setRenovationCategory("petites")
                    }
                  >
                    Petites rénovations
                  </PillButton>

                  <PillButton
                    active={
                      renovationCategory === "surMesure"
                    }
                    onClick={() =>
                      setRenovationCategory("surMesure")
                    }
                  >
                    Rénovations sur mesure
                  </PillButton>
                </div>

                {renovationCategory === "petites" && (
                  <div className="mt-6">
                    <GalleryCarousel
                      title="Petites rénovations"
                      description="Petites transformations et réparations réalisées ponctuellement."
                      items={
                        photos.renovationPetites
                      }
                      onOpen={openLightbox}
                    />
                  </div>
                )}

                {renovationCategory ===
                  "surMesure" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-2xl bg-[#f4ecdf] p-5 text-[#5f534a]">
                      <p className="font-black text-[#2f261f]">
                        Projets étudiés au cas par cas
                      </p>

                      <p className="mt-2 leading-7">
                        Les rénovations plus importantes
                        sont acceptées ponctuellement,
                        après visite, étude de faisabilité
                        et devis détaillé. Le budget dépend
                        de l’état du support, des fournitures
                        et de l’ampleur des travaux.
                      </p>
                    </div>

                    <GalleryCarousel
                      title="Avant travaux"
                      description="État initial du chantier avant intervention."
                      items={
                        photos.renovationSurMesureAvant
                      }
                      onOpen={openLightbox}
                    />

                    <GalleryCarousel
                      title="Pendant les travaux"
                      description="Préparation et différentes étapes du chantier."
                      items={
                        photos.renovationSurMesurePendant
                      }
                      onOpen={openLightbox}
                    />

                    {photos
                      .renovationSurMesureApres
                      .length > 0 && (
                      <GalleryCarousel
                        title="Après travaux"
                        description="Résultat final après intervention."
                        items={
                          photos
                            .renovationSurMesureApres
                        }
                        onOpen={openLightbox}
                      />
                    )}

                    {photos
                      .renovationSurMesureAvant
                      .length > 0 &&
                      photos
                        .renovationSurMesureApres
                        .length === 0 && (
                        <p className="rounded-2xl bg-[#fff8ed] p-4 text-sm leading-6 text-[#6f6258]">
                          Ce chantier est actuellement en
                          cours. Les photos du résultat final
                          seront ajoutées à son achèvement.
                        </p>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-md ring-1 ring-[#eadac7]">
            <h2 className="text-3xl font-black">
              Une intervention simple et claire
            </h2>

            <p className="mt-5 leading-8 text-[#6f6258]">
              La demande est évaluée selon l’état réel de
              l’installation ou du support. Les informations
              et les photos permettent de déterminer si
              l’intervention est réalisable.
            </p>

            <p className="mt-4 leading-8 text-[#6f6258]">
              Le prix est proposé au forfait après échange
              préalable ou diagnostic sur place.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f261f] p-8 text-white shadow-md">
            <h2 className="text-3xl font-black">
              À envoyer pour un devis
            </h2>

            <ul className="mt-6 space-y-4 text-stone-200">
              <li>
                📍 Ville et adresse approximative
              </li>
              <li>
                📸 Photos du problème
              </li>
              <li>
                🧰 Type d’intervention
              </li>
              <li>
                ⏱️ Délai souhaité
              </li>
              <li>
                📞 Disponibilités pour être rappelé
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-md ring-1 ring-[#eadac7]">
          <h2 className="text-3xl font-black">
            Demande de devis
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-[#6f6258]">
            Quelques informations et des photos suffisent
            pour commencer à évaluer votre demande.
          </p>

          <div className="mt-8 text-center">
            <a
              href={`mailto:mdmultiservices83@gmail.com?subject=Demande%20de%20devis%20MD%20Multiservices%2083&body=${devisMail}`}
              className="inline-block rounded-full bg-[#b65f1a] px-7 py-4 text-lg font-black text-white shadow-md hover:bg-[#934812]"
            >
              ✉️ Envoyer une demande de devis
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">
            Zone d’intervention
          </h2>

          <p className="mt-4 leading-8 text-[#6f6258]">
            La Seyne-sur-Mer, Toulon,
            Six-Fours-les-Plages, Ollioules,
            Saint-Mandrier, La Garde,
            La Valette-du-Var, Le Pradet et les
            communes alentour.
          </p>
        </div>
      </section>

      <section className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#2f261f] p-8 text-white shadow-lg">
          <h2 className="text-3xl font-black">
            Google Business
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-stone-200">
            Retrouvez les informations de contact et les
            photos de MD Multiservices 83 sur Google.
          </p>

          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-center font-bold text-[#2f261f] hover:bg-[#fff8ed]"
          >
            ⭐ Ouvrir la fiche Google
          </a>
        </div>
      </section>

      <section className="bg-[#2f261f] px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black">
            Besoin d’une intervention ?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-300">
            Appelez directement ou envoyez quelques photos
            pour une première évaluation.
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

        <p className="font-black text-[#2f261f]">
          MD Multiservices 83
        </p>

        <p>
          Électricité • Dépannage • Peinture •
          Petites rénovations
        </p>

        <p className="mt-2">
          📞 07 68 09 21 53
        </p>

        <p>
          ✉️ mdmultiservices83@gmail.com
        </p>
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 text-white md:p-5"
          onClick={closeLightbox}
        >
          <div
            className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-4 p-2">
              <div className="rounded-2xl bg-black/40 px-4 py-2 backdrop-blur">
                <p className="text-sm font-bold text-white/90">
                  {lightbox.title}
                </p>

                <p className="text-xs text-white/70">
                  Photo {lightbox.index + 1} /{" "}
                  {lightbox.items.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-black shadow-lg"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <button
              type="button"
              onClick={previousPhoto}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-3xl font-black text-black shadow-lg md:left-6"
              aria-label="Photo précédente"
            >
              ‹
            </button>

            <img
              src={lightbox.items[lightbox.index]}
              alt={`${lightbox.title} ${
                lightbox.index + 1
              }`}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onTouchStart={(event) =>
                setTouchStartX(
                  event.changedTouches[0].clientX,
                )
              }
              onTouchEnd={(event) =>
                handleTouchEnd(
                  event.changedTouches[0].clientX,
                )
              }
            />

            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-3xl font-black text-black shadow-lg md:right-6"
              aria-label="Photo suivante"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 w-full max-w-xl -translate-x-1/2 overflow-x-auto px-4">
              <div className="flex justify-center gap-1.5 rounded-2xl bg-black/35 px-3 py-2 backdrop-blur">
                {lightbox.items.map(
                  (src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        setLightbox((current) =>
                          current
                            ? {
                                ...current,
                                index,
                              }
                            : current,
                        )
                      }
                      className={`h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-2 ${
                        index === lightbox.index
                          ? "ring-[#f59e0b]"
                          : "ring-white/30"
                      }`}
                      aria-label={`Photo ${
                        index + 1
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function TrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-[#eadac7]">
      ✅ {text}
    </div>
  );
}

function ServiceCard({
  title,
  items,
  badge,
}: {
  title: string;
  items: string[];
  badge?: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-md ring-1 ring-[#eadac7]">
      {badge && (
        <span className="inline-block rounded-full bg-[#f4ecdf] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#b65f1a]">
          {badge}
        </span>
      )}

      <h3 className="mt-3 text-xl font-black text-[#b65f1a]">
        {title}
      </h3>

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

      <h3 className="mt-4 font-black">
        {title}
      </h3>

      <p className="mt-2 text-[#6f6258]">
        {text}
      </p>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  badge,
  active,
  onClick,
}: {
  title: string;
  description: string;
  badge?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-[2rem] p-6 text-left shadow-md transition ${
        active
          ? "bg-[#2f261f] text-white ring-4 ring-[#b65f1a]/30"
          : "bg-white text-[#2f261f] ring-1 ring-[#d7c0a7] hover:-translate-y-1"
      }`}
    >
      {badge && (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
            active
              ? "bg-white/10 text-[#f5b56d]"
              : "bg-[#f4ecdf] text-[#b65f1a]"
          }`}
        >
          {badge}
        </span>
      )}

      <h3 className="mt-3 text-2xl font-black">
        {title}
      </h3>

      <p
        className={`mt-3 leading-7 ${
          active
            ? "text-stone-200"
            : "text-[#6f6258]"
        }`}
      >
        {description}
      </p>

      <p className="mt-5 font-black">
        {active
          ? "Catégorie ouverte"
          : "Voir les photos →"}
      </p>
    </button>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-5 py-3 font-bold transition ${
        active
          ? "bg-[#b65f1a] text-white shadow-md"
          : "bg-[#f4ecdf] text-[#5f534a] hover:bg-[#eadac7]"
      }`}
    >
      {children}
    </button>
  );
}

function GalleryCarousel({
  title,
  description,
  items,
  onOpen,
}: {
  title: string;
  description: string;
  items: readonly string[];
  onOpen: (
    title: string,
    items: readonly string[],
    index: number,
  ) => void;
}) {
  const carouselRef =
    useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const element = carouselRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left:
        direction === "right"
          ? element.clientWidth * 0.8
          : -element.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-[#d7c0a7]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-[#b65f1a]">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-[#6f6258]">
            {description}
          </p>
        </div>

        {items.length > 0 && (
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecdf] text-2xl font-black text-[#2f261f] shadow-sm"
              aria-label="Défiler vers la gauche"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b65f1a] text-2xl font-black text-white shadow-sm"
              aria-label="Défiler vers la droite"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[#f4ecdf] p-6 text-center text-[#6f6258]">
          Les photos de cette catégorie seront ajoutées
          progressivement.
        </div>
      ) : (
        <>
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() =>
                  onOpen(title, items, index)
                }
                className="min-w-[84%] shrink-0 snap-center text-left sm:min-w-[47%] lg:min-w-[31%]"
              >
                <img
                  src={src}
                  alt={`${title} ${index + 1}`}
                  loading="lazy"
                  className="h-64 w-full rounded-2xl object-cover shadow-sm ring-1 ring-[#eadac7] transition hover:scale-[1.01]"
                />

                <p className="mt-2 text-center text-sm font-semibold text-[#6f6258]">
                  Photo {index + 1}
                </p>
              </button>
            ))}
          </div>

          <p className="mt-2 text-center text-xs font-semibold text-[#6f6258] sm:hidden">
            Faites glisser les photos avec le doigt
          </p>
        </>
      )}
    </div>
  );
}