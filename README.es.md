# Universul Observabil 3D

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 1.3.0 · **Última actualización:** 2026-10-14

**En línea / demo:** https://chiuta.github.io/Universul-Observabil-3D/

![Universul-Observabil-3D — captura de pantalla](screenshot.png)

Mapa 3D interactivo del universo observable, en un solo archivo HTML (WebGL / three.js): más de 115 galaxias (118 en el catálogo estático), 12 horizontes cósmicos, control deslizante de tiempo, visitas guiadas, búsqueda, medición de distancias, cuestionario, exportación glTF/CSV y BibTeX. Interfaz RO/EN.

- `index.html` — la aplicación 3D interactiva;
- `catalog.html` — versión estática, sin JavaScript, del catálogo (accesibilidad y SEO).

## Sobre los datos
Las posiciones, distancias y masas son valores **aproximados y simplificados**, calculados en el marco ΛCDM (Planck 2018) y reunidos a partir de catálogos públicos (NED, SIMBAD, los programas JWST CEERS/JADES/UNCOVER). La escala es logarítmica y tiene fines ilustrativos/educativos; no sustituye a los catálogos originales. Las afirmaciones «perecederas» (p. ej. «la galaxia conocida más lejana», MoM-z14, z=14,44; catálogo «actualizado en mayo de 2026») pueden quedar obsoletas. Los valores cosmológicos (incluida la constante de Hubble) tienen incertidumbres y tensiones abiertas. La lista exacta de fuentes por galaxia no está incluida en la aplicación.

### Afirmaciones de «récord» y fechas
Las afirmaciones del tipo «la galaxia más lejana» están formuladas **a la fecha del catálogo (mayo de 2026)** y pueden ser superadas por observaciones posteriores. Reverificado el 11.10.2026: en las fuentes públicas consultadas (STScI/NASA, Wikipedia, prensa) MoM-z14 sigue siendo la galaxia más lejana confirmada espectroscópicamente; no se encontró ningún récord nuevo. Fuentes: MoM-z14 (z_spec = 14,44) — Naidu et al., arXiv:2505.11263 (preprint de mayo de 2025, publicado en el Open Journal of Astrophysics, enero de 2026); JADES-GS-z14-0 — Carniani et al. 2024, Nature; EGS-z11-R0 — arXiv:2603.15841 (entrada de marzo de 2026, no verificada de forma independiente por el autor; el estado espectroscópico no se confirmó aquí). Las etiquetas «NUEVO»/«RÉCORD» de los nombres se sustituyeron por fechas explícitas («añadida mar. 2026», «récord (may. 2026)»). Las fuentes por galaxia no se enumeran íntegramente; la bibliografía está en proceso de completarse.

## Uso
Abre `index.html` en un navegador con WebGL. La tecla `R` restablece la cámara, `/` busca, `?` abre la guía y la visita.

## Datos y privacidad
Verificado mediante auditoría: sin solicitudes de red al cargar. Las fuentes tipográficas están incluidas; el idioma elegido y los marcadores se guardan en `localStorage`. Los enlaces a arXiv/sitios externos solo se abren al hacer clic. Existe código (desactivado, la lista `MIRROR_URLS` está vacía) para comparar versiones entre espejos, que haría un `fetch` solo si se configurara. La CSP de `index.html` limita ahora `connect-src` a `'self'` (al estar vacía la lista `MIRROR_URLS`, el código de espejos no puede hacer solicitudes externas; si la configuras, amplía `connect-src` con los hosts de los espejos). Los scripts en línea solo se permiten mediante un hash `sha256` en `script-src`: **tras cualquier modificación de un script, recalcula los hashes** en el meta CSP, de lo contrario el script modificado no se ejecuta.

## Limitaciones
- En iOS, los gestos de pellizco iniciados **sobre el lienzo** están reservados a la cámara 3D; en paneles y textos, el zoom nativo del sistema sigue disponible (ronda 3).
- Las citas BibTeX de la aplicación (botón «Citar esta aplicación» y `catalog.html`) no tienen campo DOI: la aplicación aún no tiene un DOI de Zenodo; el campo falso se eliminó (ronda 2).

## Licencia
MIT, según la cabecera de los archivos; véase `LICENSE`. La página también lleva menciones de ASFAN-România.

## Derechos y atribución
La aplicación y el código pertenecen al autor (licencia MIT, véase `LICENSE`). Los datos astronómicos proceden de publicaciones y catálogos públicos (NED, SIMBAD, arXiv, Planck 2018); los derechos sobre materiales de terceros pertenecen a sus titulares, y la licencia MIT no los cubre. Si eres titular de derechos o una persona mencionada y deseas la corrección o la retirada, escribe a alexio@trom.tf; respondemos en 7 días.

Auditoría: 2026-10-10; ronda 2: 2026-10-11 (eliminado el DOI de relleno de las citas, `connect-src 'self'`).
Ronda 3: 2026-10-11 (formulaciones «a la fecha del catálogo», fuentes para los récords, gestos iOS limitados al lienzo).

## Fuentes verificadas el 11.10.2026
- El récord de distancia MoM-z14: https://www.stsci.edu/contents/news-releases/2026/news-2026-107 (comunicado del 28 de enero de 2026), https://en.wikipedia.org/wiki/MoM-z14 y https://en.wikipedia.org/wiki/List_of_the_most_distant_astronomical_objects — no se encontró ningún récord espectroscópico más lejano. Los datos del catálogo siguen siendo los de mayo de 2026 (EGS-z11-R0 sigue sin verificarse de forma independiente).

## Historial / Changelog

- 1.3.0 — 2026-10-14: Copia de respaldo y etiquetado de datos (fff-kit).
- **1.2.4 — 12 de octubre de 2026:** la versión y la fecha de la última actualización se muestran en la aplicación (cuadro de diálogo Guía).
- **1.2.3 — 11 de octubre de 2026:** la tecla `/` (o Ctrl/Cmd+K) mueve el foco de inmediato al campo de búsqueda, por lo que lo que se escribe ya no se pierde ni cuando el renderizado 3D es lento; en pantallas estrechas (≤700 px) la guía de bienvenida ya no se abre automáticamente sobre la escena, sino que el botón «?» parpadea hasta que lo toques; 0 errores, axe 0 infracciones a 1280×800 y 360×740.
- **1.2.2 — 11 de octubre de 2026:** CSP con hash `sha256` para los cuatro scripts en línea (sin `'unsafe-inline'` ni `blob:` en `script-src`); enlace «Catálogo de texto accesible (sin JavaScript)» a `catalog.html`, primer elemento enfocable de la página (visible al recibir el foco, RO/EN) y en el mensaje `noscript`, como alternativa textual a la escena WebGL para lectores de pantalla y teclado; versión 1.2.2 (aplicación, `catalog.html`, cita BibTeX).
- **1.2.1 — 11 de octubre de 2026:** en el campo de búsqueda funcionan ahora ↑/↓/Intro/Esc (antes el manejador global ignoraba los eventos de INPUT); las etiquetas 3D que se solapan se ocultan automáticamente por prioridad (horizontes, luego galaxias por orden de distancia) en lugar de mezclarse; la visita de bienvenida se marca como vista en la primera apertura, por lo que ya no se reabre en cada carga si se cerró con ✕/Esc.
- Accesibilidad/limpieza: puntos de referencia `main` / `complementary` (axe-core: 0 infracciones a 1280×800 y 360×740), `catalog.html`: las tablas se desplazan horizontalmente en pantallas estrechas (sin desbordamiento de la página a 360 px); manejador `onclick` en línea eliminado (el botón «Exportar CSV» de la tabla de citas), fecha de compilación 2026-10-11 en la aplicación, `catalog.html` y metas, número de versión actualizado en todas partes.
