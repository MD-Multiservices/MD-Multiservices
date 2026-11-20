const fs=require("node:fs");
const assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const quote=read("app/QuoteRequest.tsx");
const digital=read("app/sites-internet/page.tsx");
const home=read("app/page.tsx");
const photos=read("app/photo-mail.ts");
const sitemap=read("app/sitemap.ts");
for(const price of ["590 €","1 090 €","2 490 €","39 €","79 €","120 €"]){
  assert.ok(quote.includes(price.replace("1 090","1 090").replace("2 490","2 490"))||quote.includes(price),"tarif accueil : "+price);
}
for(const price of ["590 €","1 090 €","2 490 €","39 €","79 €","120 €"])assert.ok(digital.includes(price),"tarif page dédiée : "+price);
assert.match(home,/href="\/sites-internet"/);
assert.match(home,/photos\.renovationSurMesureAvant/);
assert.match(home,/photos\.renovationSurMesurePendant/);
assert.match(sitemap,/\/sites-internet/);
assert.match(photos,/files\.length > 3/);
assert.match(photos,/12_000_000/);
console.log("PASS: tarifs, page dédiée, galerie, sitemap et limites photos");
