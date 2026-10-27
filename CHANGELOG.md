# CHANGELOG

Format: SemVer (MAJOR.MINOR.PATCH). Intrările mai vechi sunt copiate din README (secțiunea „History / Changelog”), neschimbate.

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Stare: stabil
Offline: complet

Recenzie (doar texte/documentare):
- **JWST** (verificat pe web la 27.10.2026): MoM-z14 z=14,44 rămâne cel mai îndepărtat confirmat spectroscopic; nota JADES-GS-z14-0 din referințe include ALMA z=14,1793 (Schouws et al. 2025, arXiv:2409.20549); PAN-z14-1 (z=13,53, Donnan et al., arXiv:2601.11515) documentat în README, neadăugat în catalog (coordonate neverificate). Textul „record” din dialog nu a fost modificat (cheie de traducere în 8 limbi).
- **Cataloage**: documentate (nu unificate) diferențele hub 112 / 1D 112 / 2D 112 (111 galaxii + CMB) / 3D 118 și conflictul 1D ↔ 2D (8 distanțe, semnul z al Andromedei), de verificat de autor.
- README (8 limbi): secțiuni noi „Mărimea cataloagelor în serie” și „Recorduri JWST reverificate”.
- Versiune în `index.html`, `sw.js`, `app.json`; CSP rehash.

---

## Istoric anterior (din README.md)

#### 2.0.0 — 2026-10-26
- User-made tours: record camera points with notes, play them back, export/import as a JSON file.

#### 1.4.11 — 2026-10-23
- Bookmarks: corrupted `localStorage` data (not a list, null/non-numeric entries) no longer breaks the app — it is ignored; the version shown in the footer/“About” and in the citation is the real one again.

#### 1.4.10 — 2026-10-23
- fff-kit 1.2.0: all browser keys (language, bookmarks, performance choice, onboarding, gentle start) now carry the `universul-observabil-3d.` prefix; the old ones (`up3_lang`, `univers_obs_bk`, `up3-perf-*`, `up3-onboarded-v2`, `up3-gentle-start`) are migrated automatically at start-up, so existing bookmarks and settings are kept, also after importing an old .fff.json backup. The “copy link” fallback no longer uses the native browser prompt but an accessible dialog.

#### 1.4.8 — 2026-10-22
- fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed

#### 1.4.7 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.

#### 1.4.6 — 2026-10-22
- Offline for real: the inline (data: URL) manifest was replaced by a real sw.js (cache-first with background revalidation), a web manifest file and icons; the app now opens without network after the first visit and can be installed.
- Accessibility: the page now has exactly one H1 (the title bar); the CSV import field and the scale-factor slider have names announced by screen readers (8 languages); the time and distance-filter sliders have 24 px touch targets.
- Mobile: interface text is at least 12 px and the landmark buttons are larger touch targets.

- **1.4.5 — 2026-10-22:** the “units” abbreviation in the proper-distance readout of the comoving-grid widget now follows the interface language.
- **1.4.4 — 2026-10-22:** all button labels in the intro guide and the distance-slider landmarks (“Reset camera”, “Fly to Andromeda”, “Towards the CMB”…) are now translated in all 8 languages.
- **1.4.3 — 2026-10-22:** the page title and meta descriptions follow the interface language; the "R reset" hint is localized in Romanian ("resetare").
- **1.4.2 — 2026-10-19:** 20 object names in the 3D labels, the panel and the search translated; the 45.6 Gly paradox dialog fully translated; the contextual glossary now works in all languages (10 terms × 7 languages, re-applied on language change); fixed "💡 DID YOU KNOW" left in Romanian in fr, plus the canvas aria-label and the "‹ Back" button.
- **1.4.1 — 2026-10-19:** the complete guide (11 tabs), the 30 tours, the "Did you know?" facts, the onboarding and the galaxy/horizon descriptions translated into en, fr, it, es, pt, de, hu; the guide/tour is redisplayed when the language changes.
- 1.3.0 — 2026-10-14: Backup and data labeling (fff-kit).
- **1.2.4 — 12 October 2026:** the version and the date of the last update are shown in the application (Guide dialog).
- **1.2.3 — 11 October 2026:** the `/` key (or Ctrl/Cmd+K) moves focus immediately into the search field, so typing is no longer lost even when 3D rendering is slow; on narrow screens (≤700 px) the welcome guide no longer opens automatically over the scene, but the "?" button pulses until you touch it; 0 errors, axe 0 violations at 1280×800 and 360×740.
- **1.2.2 — 11 October 2026:** CSP with a `sha256` hash for the four inline scripts (no `'unsafe-inline'` and no `blob:` in `script-src`); a "Accessible text catalog (no JavaScript)" link to `catalog.html`, the first focusable element on the page (visible on focus, RO/EN) and in the `noscript` message, as a textual alternative to the WebGL scene for screen readers and keyboard; version 1.2.2 (application, `catalog.html`, BibTeX citation).
- **1.2.1 — 11 October 2026:** ↑/↓/Enter/Esc now work in the search field (before, the global handler ignored events from INPUT); overlapping 3D labels are hidden automatically by priority (horizons, then galaxies in order of distance) instead of mixing together; the welcome tour is marked as seen on first opening, so it no longer reopens on every load if it was closed with ✕/Esc.
- Accessibility/cleanup: `main` / `complementary` landmarks (axe-core: 0 violations at 1280×800 and 360×740), `catalog.html`: tables scroll horizontally on narrow screens (no page overflow at 360 px); inline `onclick` handler removed (the "Export CSV" button in the citations table), build date 2026-10-11 in the application, `catalog.html` and metas, version number updated everywhere.
