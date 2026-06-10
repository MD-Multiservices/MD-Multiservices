import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outputFile = path.join(root, "app", "photos.ts");

const folders = {
  renovationAvant: "Renovation/Avant",
  renovationPendant: "Renovation/Pendant",
  renovationApres: "Renovation/Apres",
  electricite: "Electricite",
  peinture: "Peinture",
  antenneTv: "Antenne TV",
};

const allowedExtensions = new Set([".jpg"]);

function walk(folderPath) {
  if (!fs.existsSync(folderPath)) return [];

  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

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

for (const [key, folder] of Object.entries(folders)) {
  const folderPath = path.join(publicDir, folder);

  photos[key] = walk(folderPath)
    .sort((a, b) => b.modifiedAt - a.modifiedAt)
    .map((file) => toPublicUrl(file.fullPath));
}

const fileContent = `// Fichier généré automatiquement.
// Ne pas modifier à la main.
// Pour mettre à jour les photos : npm run photos

export const photos = ${JSON.stringify(photos, null, 2)} as const;
`;

fs.writeFileSync(outputFile, fileContent, "utf8");

console.log("Photos mises à jour :");
for (const [key, items] of Object.entries(photos)) {
  console.log(`- ${key}: ${items.length} photo(s)`);
}