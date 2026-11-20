"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { DigitalOffers, QuoteForm, type RequestKind } from "./QuoteRequest";
import { photos } from "./photos";

const InterventionMap = dynamic(
  () => import("./InterventionMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[350px] items-center justify-center rounded-[1.5rem] bg-[#f4ecdf] text-center font-semibold text-[#6f6258] md:h-[430px]">
        Chargement de la carte…
      </div>
    ),
  },
);

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



export default function Home() {
  const [requestKind, setRequestKind] = useState<RequestKind>("travaux");
  const [activeCategory, setActiveCategory] =
    useState<MainCategory>("renovation");

  const [electricalCategory, setElectricalCategory] =
    useState<ElectricalCategory>("depannage");

  const [renovationCategory, setRenovationCategory] =
    useState<RenovationCategory>("surMesure");

  const [lightbox, setLightbox] =
    useState<LightboxState>(null);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const galleryContentRef =
    useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const electricalHasPhotos = [
    photos.electriciteDepannage,
    photos.electriciteLuminaires,
    photos.electricitePrises,
    photos.electriciteTableaux,
  ].some((items) => items.length > 0);
  const paintingHasPhotos = photos.peinture.length > 0;

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

  useEffect(() => {
    const element = mapContainerRef.current;
    if (!element || mapVisible) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setMapVisible(true);
    }, { rootMargin: "180px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [mapVisible]);

  function selectMainCategory(
    category: MainCategory,
  ) {
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
          current.index ===
          current.items.length - 1
            ? 0
            : current.index + 1,
      };
    });
  }

  const dialogRef = useRef<HTMLDivElement>(null);
  const galleryOpen = lightbox !== null;
  useEffect(() => {
    if (!galleryOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (buttons?.length) {
          const first = buttons[0], last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
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

      opener?.focus({ preventScroll: true });
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [galleryOpen]);

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
      <header className="site-head">
        <a href="#accueil" className="brand">MD Multiservices <span>83</span></a>
        <nav aria-label="Navigation principale">
          <a href="#prestations">Travaux</a><a href="#realisations">Réalisations</a>
          <a href="/sites-internet">Sites internet</a><a href="#demande-devis">Devis</a>
        </nav>
      </header>
      <section id="accueil" className="hero">
        <div className="hero-grid">
          <div>
            <p className="hero-location">La Seyne-sur-Mer · Toulon et alentours</p>
            <h1>Votre électricien à La Seyne-sur-Mer</h1>
            <p className="hero-intro">Une panne à identifier, un luminaire à poser ou une pièce à rénover ? J’interviens chez vous et vous propose un devis adapté aux travaux.</p>
            <div className="hero-actions">
              <a href="tel:0768092153">07 68 09 21 53</a>
              <a href="#demande-devis">Demander un devis</a>
            </div>
            <a className="hero-whatsapp" href="https://wa.me/33768092153">Envoyer des photos par WhatsApp</a>
            <p className="mt-4 max-w-xl border-l-4 border-[#8a431b] pl-4 text-sm leading-6 text-[#574c40]">
              Vous êtes artisan ou indépendant ? J’ai également réalisé ce site et un outil de gestion pour mon activité.
              <a className="ml-1 font-bold underline underline-offset-4" href="/sites-internet">Découvrez les solutions numériques proposées.</a>
            </p>
          </div>
          <figure><Image src="/Renovation/Pendant/Pendant-2.jpg" alt="Pièce en cours de rénovation, avec les murs et le sol en préparation" width={720} height={520} priority sizes="(min-width: 800px) 38vw, 100vw" />
            <figcaption><span>Chantier de rénovation</span><a href="#realisations">Voir les photos →</a></figcaption>
          </figure>
        </div>
      </section>

      <section id="prestations" className="bg-[#fff8ed] px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">
            Électricité, peinture et petits travaux
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

      <section id="realisations" className="bg-[#eadac7] px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">
            Réalisations
          </h2>

          <p className="mt-3 max-w-3xl leading-8 text-[#5f534a]">
            Découvrez des photos réelles de chantiers avant et pendant les travaux. Sélectionnez une image pour l’agrandir et parcourir l’album.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {electricalHasPhotos && <CategoryCard
              title="Travaux électriques"
              description="Dépannage, luminaires, prises, interrupteurs et tableaux."
              badge="Activité principale"
              active={
                activeCategory === "electricite"
              }
              onClick={() =>
                selectMainCategory("electricite")
              }
            />}

            {paintingHasPhotos && <CategoryCard
              title="Peinture"
              description="Préparation, petites reprises et finitions."
              active={
                activeCategory === "peinture"
              }
              onClick={() =>
                selectMainCategory("peinture")
              }
            />}

            <CategoryCard
              title="Rénovation"
              description="Petites rénovations et projets étudiés sur mesure."
              active={
                activeCategory === "renovation"
              }
              onClick={() =>
                selectMainCategory("renovation")
              }
            />
          </div>

          {!electricalHasPhotos && !paintingHasPhotos && (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[#5f534a]">
              Les photos présentées concernent pour le moment un chantier de rénovation en cours.
              Les réalisations électriques et de peinture seront publiées lorsqu’elles seront disponibles.
            </p>
          )}
          <div
            ref={galleryContentRef}
            className="scroll-mt-6 pt-8"
          >
            {activeCategory ===
              "electricite" && (
              <div className="rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#d7c0a7]">
                <div className="flex flex-wrap gap-2">
                  <PillButton
                    active={
                      electricalCategory ===
                      "depannage"
                    }
                    onClick={() =>
                      setElectricalCategory(
                        "depannage",
                      )
                    }
                  >
                    Dépannage
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory ===
                      "luminaires"
                    }
                    onClick={() =>
                      setElectricalCategory(
                        "luminaires",
                      )
                    }
                  >
                    Luminaires
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory ===
                      "prises"
                    }
                    onClick={() =>
                      setElectricalCategory(
                        "prises",
                      )
                    }
                  >
                    Prises et interrupteurs
                  </PillButton>

                  <PillButton
                    active={
                      electricalCategory ===
                      "tableaux"
                    }
                    onClick={() =>
                      setElectricalCategory(
                        "tableaux",
                      )
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

            {activeCategory ===
              "renovation" && (
              <div className="rounded-[2rem] bg-white p-5 shadow-md ring-1 ring-[#d7c0a7]">
                <div className="flex flex-wrap gap-2">
                  <PillButton
                    active={
                      renovationCategory ===
                      "petites"
                    }
                    onClick={() =>
                      setRenovationCategory(
                        "petites",
                      )
                    }
                  >
                    Petites rénovations
                  </PillButton>

                  <PillButton
                    active={
                      renovationCategory ===
                      "surMesure"
                    }
                    onClick={() =>
                      setRenovationCategory(
                        "surMesure",
                      )
                    }
                  >
                    Rénovations sur mesure
                  </PillButton>
                </div>

                {renovationCategory ===
                  "petites" && (
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
                        de l’état du support, des
                        fournitures et de l’ampleur des
                        travaux.
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
                          cours. Les photos du résultat
                          final seront ajoutées à son
                          achèvement.
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
              <li>📸 Photos du problème</li>
              <li>🧰 Type d’intervention</li>
              <li>⏱️ Délai souhaité</li>
              <li>
                📞 Disponibilités pour être rappelé
              </li>
            </ul>
          </div>
        </div>
      </section>

      <DigitalOffers onSelect={setRequestKind} />
      <QuoteForm kind={requestKind} onChange={setRequestKind} />

      <section className="px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-[#b65f1a]">
              Intervention locale
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Zone habituelle d’intervention
            </h2>

            <p className="mt-4 leading-8 text-[#6f6258]">
              La zone colorée représente un périmètre
              indicatif d’environ 25 kilomètres autour de
              La Seyne-sur-Mer. Le déplacement est toujours
              confirmé avant l’intervention.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-md ring-1 ring-[#eadac7]">
              <div ref={mapContainerRef}>
                {mapVisible ? <InterventionMap /> : (
                  <div className="flex h-[350px] flex-col items-center justify-center gap-4 rounded-[1.5rem] bg-[#f4ecdf] px-6 text-center text-[#574c40] md:h-[430px]">
                    <p className="font-semibold">La zone habituelle couvre environ 25 km autour de La Seyne-sur-Mer.</p>
                    <button type="button" className="rounded-xl bg-[#2f261f] px-5 py-3 font-bold text-white" onClick={() => setMapVisible(true)}>Afficher la carte interactive</button>
                  </div>
                )}
              </div>

              <p className="px-3 pb-2 pt-4 text-center text-sm leading-6 text-[#6f6258]">
                Zone indicative : le temps de trajet et la
                nature de l’intervention sont également
                pris en compte.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#2f261f] p-7 text-white shadow-md">
              <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#f5b56d]">
                Environ 25 km autour de La Seyne-sur-Mer
              </span>

              <h3 className="mt-5 text-2xl font-black">
                Communes principalement desservies
              </h3>

              <ul className="mt-5 grid gap-3 text-stone-200 sm:grid-cols-2 lg:grid-cols-1">
                <li>📍 La Seyne-sur-Mer</li>
                <li>📍 Toulon</li>
                <li>📍 Six-Fours-les-Plages</li>
                <li>📍 Ollioules</li>
                <li>📍 Saint-Mandrier-sur-Mer</li>
                <li>📍 La Garde</li>
                <li>📍 La Valette-du-Var</li>
                <li>📍 Le Pradet</li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <p className="font-black">
                  Votre commune est plus éloignée ?
                </p>

                <p className="mt-2 text-sm leading-6 text-stone-200">
                  Les déplacements hors de cette zone
                  peuvent être étudiés selon la nature,
                  la durée et le montant des travaux.
                </p>
              </div>

              <a
                href="tel:0768092153"
                className="mt-6 block rounded-full bg-[#b65f1a] px-6 py-4 text-center font-black text-white shadow-md transition hover:bg-[#934812]"
              >
                📞 Vérifier ma commune
              </a>
            </div>
          </div>
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
            className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-center font-bold text-[#2f261f] transition hover:bg-[#fff8ed]"
          >
            ⭐ Ouvrir la fiche Google
          </a>
        </div>
      </section>

      <section className="bg-[#2f261f] px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black">
            Une intervention ou un projet numérique ?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-300">
            Pour des travaux, un dépannage ou un projet numérique, décrivez votre besoin et échangeons sur les possibilités.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:0768092153"
              className="rounded-full bg-[#b65f1a] px-7 py-4 text-lg font-black text-white transition hover:bg-[#934812]"
            >
              📞 07 68 09 21 53
            </a>

            <a
              href="https://wa.me/33768092153"
              className="rounded-full bg-[#256d3b] px-7 py-4 text-lg font-black text-white transition hover:bg-[#1f5b31]"
            >
              💬 WhatsApp
            </a>

            <a
              href="#demande-devis"
              className="rounded-full bg-white px-7 py-4 text-lg font-black text-[#2f261f] transition hover:bg-[#fff8ed]"
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

        <p className="text-lg font-black text-[#2f261f]">
          MD Multiservices 83
        </p>

        <p className="mt-1">
          Électricité • Dépannage • Peinture • Petites
          rénovations
        </p>

        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y border-[#d8b58a] py-4 text-sm font-semibold">
          <span>MD Multiservices 83</span>

          <span aria-hidden="true">
            •
          </span>

          <span>Entreprise individuelle</span>

          <span aria-hidden="true">
            •
          </span>

          <span>SIREN 104 499 900</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-bold">
          <a href="/sites-internet" className="underline decoration-[#b65f1a] underline-offset-4 transition hover:text-[#b65f1a]">Sites internet &amp; gestion</a>
          <a
            href="tel:0768092153"
            className="transition hover:text-[#b65f1a]"
          >
            07 68 09 21 53
          </a>

          <a
            href="https://wa.me/33768092153"
            className="transition hover:text-[#b65f1a]"
          >
            WhatsApp
          </a>

          <a
            href="mailto:mdmultiservices83@gmail.com"
            className="transition hover:text-[#b65f1a]"
          >
            E-mail
          </a>

          <a
            href="/mentions-legales"
            className="underline decoration-[#b65f1a] decoration-2 underline-offset-4 transition hover:text-[#b65f1a]"
          >
            Mentions légales
          </a>
        </div>

        <p className="mt-6 text-xs text-[#827267]">
          © {new Date().getFullYear()} MD Multiservices
          83 — Tous droits réservés
        </p>
      </footer>

      <nav aria-label="Contact rapide" className="mobile-contact fixed bottom-0 left-0 right-0 z-50 border-t border-[#d8b58a] bg-[#fff8ed] p-3 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] md:hidden">
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
            href="#demande-devis"
            className="rounded-2xl bg-[#2f261f] px-3 py-3 text-center text-sm font-black text-white"
          >
            ✉️ Devis
          </a>
        </div>
      </nav>

      {lightbox && (
        <div
          ref={dialogRef} role="dialog" aria-modal="true" aria-label={lightbox.title}
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
                aria-label="Fermer la galerie"
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
              src={
                lightbox.items[lightbox.index]
              }
              alt={`${lightbox.title} ${
                lightbox.index + 1
              }`}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onTouchStart={(event) =>
                setTouchStartX(
                  event.changedTouches[0]
                    .clientX,
                )
              }
              onTouchEnd={(event) =>
                handleTouchEnd(
                  event.changedTouches[0]
                    .clientX,
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
                        setLightbox(
                          (current) =>
                            current
                              ? {
                                  ...current,
                                  index,
                                }
                              : current,
                        )
                      }
                      className={`h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-2 ${
                        index ===
                        lightbox.index
                          ? "ring-[#f59e0b]"
                          : "ring-white/30"
                      }`}
                      aria-label={`Aller à la photo ${
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
          <li key={item}>
            • {item}
          </li>
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
  children: ReactNode;
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

  function scroll(
    direction: "left" | "right",
  ) {
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
              onClick={() =>
                scroll("right")
              }
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
                  onOpen(
                    title,
                    items,
                    index,
                  )
                }
                className="w-[84%] shrink-0 snap-center text-left sm:w-[47%] lg:w-[31%]"
              >
                <Image width={640} height={400} sizes="(min-width: 1024px) 32vw, (min-width: 640px) 47vw, 84vw"
                  src={src}
                  alt={`${title} ${
                    index + 1
                  }`}
                  loading="lazy"
                  className="h-64 w-full rounded-2xl object-cover shadow-sm ring-1 ring-[#eadac7] transition hover:scale-[1.01]"
                />

                <p className="mt-2 text-center text-sm font-semibold text-[#6f6258]">
                  {title} · {index + 1} / {items.length}
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