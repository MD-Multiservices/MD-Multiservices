import { execSync } from "node:child_process";

function run(command) {
  console.log(`\n> ${command}`);
  execSync(command, { stdio: "inherit", shell: true });
}

function output(command) {
  return execSync(command, { encoding: "utf8", shell: true }).trim();
}

try {
  run("node scripts/update-photos.mjs");
  run("npm run build");
  run("git add .");

  const status = output("git status --porcelain");

  if (!status) {
    console.log("\nAucune modification à envoyer.");
    process.exit(0);
  }

  const date = new Date().toISOString().slice(0, 16).replace("T", " ");
  run(`git commit -m "Mise à jour du site - ${date}"`);
  run("git push");

  console.log("\nSite envoyé sur GitHub. Vercel va se mettre à jour automatiquement.");
} catch (error) {
  console.error("\nErreur pendant la mise à jour.");
  process.exit(1);
}