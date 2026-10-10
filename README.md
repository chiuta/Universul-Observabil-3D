# Universul Observabil 3D

Hartă 3D interactivă a universului observabil, într-un singur fișier HTML (WebGL / three.js): peste 115 galaxii (118 în catalogul static), 12 orizonturi cosmice, slider de timp, tururi ghidate, căutare, măsurare de distanțe, quiz, export glTF/CSV și BibTeX. Interfață RO/EN.

- `index.html` — aplicația interactivă 3D;
- `catalog.html` — versiune statică, fără JavaScript, a catalogului (accesibilitate și SEO).

## Despre date
Poziții, distanțe și mase sunt valori **aproximative și simplificate**, calculate în cadrul ΛCDM (Planck 2018) și grupate din cataloage publice (NED, SIMBAD, programele JWST CEERS/JADES/UNCOVER). Scara este logaritmică și are scop ilustrativ/educațional; nu înlocuiește cataloagele originale. Afirmații „perisabile” (de ex. „cea mai îndepărtată galaxie cunoscută”, MoM-z14, z=14,44; catalog „actualizat în mai 2026”) pot deveni depășite. Valorile cosmologice (inclusiv constanta Hubble) au incertitudini și tensiuni deschise. Lista exactă a surselor per galaxie nu este inclusă în aplicație.

## Utilizare
Deschide `index.html` într-un browser cu WebGL. Tasta `R` resetează camera, `/` caută, `?` deschide ghidul și turul.

## Date și confidențialitate
Verificat prin audit: fără cereri de rețea la încărcare. Fonturile sunt incluse; limba aleasă și semnele de carte se păstrează în `localStorage`. Linkurile către arXiv/site-uri externe se deschid doar la click. Există cod (dezactivat, lista `MIRROR_URLS` este goală) pentru comparație de versiuni între oglinzi, care ar face `fetch` doar dacă este configurat. CSP-ul din `index.html` permite `connect-src https:` (mai larg decât necesar).

## Limitări
- Pagina blochează zoom-ul nativ pe canvas (gesturi proprii de pinch) — vezi nota de accesibilitate din raportul de audit.
- DOI-ul Zenodo din BibTeX-ul din `catalog.html` este un placeholder (`10.5281/zenodo.PLACEHOLDER`) până la prima publicare.

## Licență
CC0 1.0 (domeniu public), conform antetului din fișiere; vezi `LICENSE`. Pagina poartă și mențiuni ASFAN-România.

Audit: 2026-10-10
