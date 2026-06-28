import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outputFile = path.join(root, "app", "photos.ts");

const sources = {
  electriciteDepannage: [
    "Electricite/Depannage",
    "Antenne TV",
  ],

  electriciteLuminaires: [
    "Electricite/Luminaires",
  ],

  electricitePrises: [
    "Electricite/Prises",
  ],

  electriciteTableaux: [
    "Electricite/Tableaux",
  ],

  peinture: [
    "Peinture",
  ],

  renovationPetites: [
    "Renovation/Petites-renovations",
  ],

  renovationSurMesureAvant: [
    "Renovation/Avant",
  ],

  renovationSurMesurePendant: [
    "Renovation/Pendant",
  ],

  renovationSurMesureApres: [
    "Renovation/Apres",
  ],
};

const allowedExtensions = new Set([".jpg"]);

/*
  La galerie "Pendant" est volontairement inversée,
  comme demandé précédemment.
*/
const reversedGroups = new Set([
  "renovationSurMesurePendant",
]);

function walk(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const entries = fs.readdirSync(folderPath, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const fullPath = path.join(folderPath, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (!allowedExtensions.has(extension)) {
      return [];
    }

    const stats = fs.statSync(fullPath);

    return [
      {
        fullPath,
        modifiedAt: stats.mtimeMs,
      },
    ];
  });
}

function toPublicUrl(fullPath) {
  const relativePath = path.relative(publicDir, fullPath);
  const normalizedPath = relativePath.split(path.sep).join("/");

  return encodeURI(`/${normalizedPath}`);
}

const photos = {};

for (const [key, folderList] of Object.entries(sources)) {
  let files = folderList
    .flatMap((folder) => walk(path.join(publicDir, folder)))
    .sort((a, b) => b.modifiedAt - a.modifiedAt);

  if (reversedGroups.has(key)) {
    files = files.reverse();
  }

  photos[key] = files.map((file) => toPublicUrl(file.fullPath));
}

const fileContent = `// Fichier généré automatiquement.
// Ne pas modifier à la main.

export const photos = ${JSON.stringify(photos, null, 2)} as const;
`;

fs.writeFileSync(outputFile, fileContent, "utf8");

console.log("Photos mises à jour :");

for (const [key, items] of Object.entries(photos)) {
  console.log(`- ${key}: ${items.length} photo(s)`);
}