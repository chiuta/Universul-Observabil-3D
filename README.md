# Universul Observabil 3D

Hartă 3D interactivă a universului observabil, într-un singur fișier HTML (WebGL / three.js): peste 115 galaxii (118 în catalogul static), 12 orizonturi cosmice, slider de timp, tururi ghidate, căutare, măsurare de distanțe, quiz, export glTF/CSV și BibTeX. Interfață RO/EN.

- `index.html` — aplicația interactivă 3D;
- `catalog.html` — versiune statică, fără JavaScript, a catalogului (accesibilitate și SEO).

## Despre date
Poziții, distanțe și mase sunt valori **aproximative și simplificate**, calculate în cadrul ΛCDM (Planck 2018) și grupate din cataloage publice (NED, SIMBAD, programele JWST CEERS/JADES/UNCOVER). Scara este logaritmică și are scop ilustrativ/educațional; nu înlocuiește cataloagele originale. Afirmații „perisabile” (de ex. „cea mai îndepărtată galaxie cunoscută”, MoM-z14, z=14,44; catalog „actualizat în mai 2026”) pot deveni depășite. Valorile cosmologice (inclusiv constanta Hubble) au incertitudini și tensiuni deschise. Lista exactă a surselor per galaxie nu este inclusă în aplicație.

### Afirmații „record” și date
Afirmațiile de tip „cea mai îndepărtată galaxie” sunt formulate **la data catalogului (mai 2026)** și pot fi depășite de observații ulterioare. Surse: MoM-z14 (z_spec = 14,44) — Naidu et al., arXiv:2505.11263 (preprint mai 2025, publicat în Open Journal of Astrophysics, ianuarie 2026); JADES-GS-z14-0 — Carniani et al. 2024, Nature; EGS-z11-R0 — arXiv:2603.15841 (intrare din martie 2026, neverificată independent de autor; statutul spectroscopic nu a fost confirmat aici). Etichetele „NOU”/„RECORD” din nume au fost înlocuite cu date explicite („adăugat mar. 2026”, „record (mai 2026)”). Sursele per galaxie nu sunt listate integral; bibliografie în curs de completare.

## Utilizare
Deschide `index.html` într-un browser cu WebGL. Tasta `R` resetează camera, `/` caută, `?` deschide ghidul și turul.

## Date și confidențialitate
Verificat prin audit: fără cereri de rețea la încărcare. Fonturile sunt incluse; limba aleasă și semnele de carte se păstrează în `localStorage`. Linkurile către arXiv/site-uri externe se deschid doar la click. Există cod (dezactivat, lista `MIRROR_URLS` este goală) pentru comparație de versiuni între oglinzi, care ar face `fetch` doar dacă este configurat. CSP-ul din `index.html` limitează acum `connect-src` la `'self'` (fiind goală lista `MIRROR_URLS`, codul de oglinzi nu poate face cereri externe; dacă o configurezi, extinde `connect-src` cu gazdele oglinzilor).

## Limitări
- Pe iOS, gesturile de pinch începute **pe canvas** sunt rezervate camerei 3D; pe panouri și texte, zoom-ul nativ al sistemului rămâne disponibil (rundă 3).
- Citațiile BibTeX ale aplicației (butonul „Citează această aplicație” și `catalog.html`) nu au câmp DOI: aplicația nu are încă un DOI Zenodo; câmpul fals a fost eliminat (rundă 2).

## Licență
CC0 1.0 (domeniu public), conform antetului din fișiere; vezi `LICENSE`. Pagina poartă și mențiuni ASFAN-România.

## Drepturi și atribuire
Aplicația și codul aparțin autorului (CC0 1.0, vezi `LICENSE`). Datele astronomice provin din publicații și cataloage publice (NED, SIMBAD, arXiv, Planck 2018); drepturile asupra materialelor terțe aparțin titularilor, iar dedicarea CC0 nu le acoperă. Dacă ești titular de drepturi sau persoană menționată și dorești corectarea sau retragerea, scrie la alexio@trom.tf; răspundem în 7 zile.

Audit: 2026-10-10; rundă 2: 2026-10-11 (eliminat DOI-ul placeholder din citații, `connect-src 'self'`).
Rundă 3: 2026-10-11 (formulări „la data catalogului”, surse pentru recorduri, gesturi iOS limitate la canvas).
