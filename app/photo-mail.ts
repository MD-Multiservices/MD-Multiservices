const formats: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  heic: "image/heic", heif: "image/heif",
};

export const photoAccept = Object.keys(formats).map(ext => "." + ext).join(",");

function extension(file: File) {
  return file.name.split(".").pop()?.toLowerCase() || "";
}

export function checkPhotos(files: File[]) {
  if (files.length > 3)
    return "Choisissez au maximum trois photos pour votre demande.";
  if (files.some(file => !Object.hasOwn(formats, extension(file)) || file.size === 0))
    return "Choisissez des photos JPG, PNG, WebP, HEIC ou HEIF contenant une image.";
  if (files.reduce((sum, file) => sum + file.size, 0) > 12_000_000)
    return "Les photos dépassent 12 Mo au total. Réduisez leur taille ou envoyez-en moins.";
  return "";
}

function base64(bytes: Uint8Array) {
  const chunks: string[] = [];
  for (let i = 0; i < bytes.length; i += 8192)
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + 8192)));
  return btoa(chunks.join(""));
}

function wrap(encoded: string) {
  return encoded.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

export async function photoDraft(body: string, files: File[]) {
  const error = checkPhotos(files);
  if (error) throw new Error(error);
  const boundary = "md-" + crypto.randomUUID();
  const lines = ["X-Unsent: 1", "To: mdmultiservices83@gmail.com", "Subject: Demande de devis - Travaux",
    "MIME-Version: 1.0", `Content-Type: multipart/mixed; boundary="${boundary}"`, "",
    "--" + boundary, "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "",
    wrap(base64(new TextEncoder().encode(body)))];
  for (const [index, file] of files.entries()) {
    const ext = extension(file);
    lines.push("--" + boundary, "Content-Type: " + formats[ext], "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="photo-${index + 1}.${ext}"`, "",
      wrap(base64(new Uint8Array(await file.arrayBuffer()))));
  }
  lines.push("--" + boundary + "--", "");
  return new Blob([lines.join("\r\n")], { type: "message/rfc822" });
}
