// Universul Observabil 3D 2.0.0 — tururi create de utilizator (înregistrare, redare, export/import JSON).
// Rulare: node tests/tour.test.mjs
import {launch, check, summary, HERE} from "./_lib.mjs";
import fs from "fs"; import os from "os"; import path from "path";
const {browser, ctx, page, st} = await launch();
await page.waitForTimeout(4000);
const ev = (fn, arg) => page.evaluate(fn, arg);
check("secțiunea „Tururile mele” există în sertar", await ev(() => !!document.getElementById("utSec") && !!document.getElementById("utRecBtn")));
const base = await ev(() => TOURS.length);
check("tururile încorporate sunt intacte (≥ 1, fără tururi proprii)", base >= 1 && await ev(() => TOURS.every(t => !t.user)));
// --- validare
const V = await ev(() => {
  const big = {title: "A".repeat(200) + "<b>x</b>", steps: Array.from({length: 100}, (_, i) => ({t: 1e9, p: -5, r: 1e9, dur: 1, txt: "<img src=x onerror=1>nota " + i}))};
  const c = utClean(big);
  return {
    big: c && {title: c.title, n: c.steps.length, t: c.steps[0].t, p: c.steps[0].p, r: c.steps[0].r, dur: c.steps[0].dur, txt: c.steps[0].txt},
    empty: utClean({steps: []}), nosteps: utClean({}), nan: utClean({steps: [{t: "x", p: 1, r: 5}]}), nul: utClean(null),
    maxR: CONFIG.CAM.MAX_R, minR: CONFIG.CAM.MIN_R
  };
});
check("utClean: titlu ≤ 60 fără <>, ≤ 60 de puncte", V.big && V.big.title.length <= 60 && !/[<>]/.test(V.big.title) && V.big.n === 60, V.big);
check("utClean: unghiuri/rază/durată limitate la intervale sigure", V.big.t === 100 && V.big.p >= 0.08 && V.big.r === V.maxR && V.big.dur === 1500, V.big);
check("utClean: fără caractere < > în note", !/[<>]/.test(V.big.txt), V.big.txt);
check("utClean: respinge gol / fără pași / valori nenumerice / null", V.empty === null && V.nosteps === null && V.nan === null && V.nul === null);
// --- înregistrare
await ev(() => document.getElementById("utRecBtn").click());
check("bara de înregistrare vizibilă", await ev(() => document.getElementById("utBar").classList.contains("show")));
await ev(() => { theta = 1.0; phi = 1.2; camR = 60; updateCam(); });
await page.fill("#utName", "Turul meu <b>test</b>");
await page.fill("#utTxt", "Primul punct <img src=x onerror=window.__xss=1>");
await ev(() => document.getElementById("utAdd").click());
check("după „Adaugă punct”: 1 punct, nota golită", await ev(() => utRec.steps.length === 1 && document.getElementById("utTxt").value === "") && /1/.test(await ev(() => document.getElementById("utCnt").textContent)));
await ev(() => { theta = 2.2; phi = 0.9; camR = 25; updateCam(); });
await ev(() => document.getElementById("utAdd").click());
await ev(() => { theta = 3.0; phi = 1.5; camR = 90; updateCam(); });
await page.fill("#utTxt", "Al treilea");
await ev(() => document.getElementById("utAdd").click());
await ev(() => document.getElementById("utUndo").click());
check("„Elimină ultimul”: 2 puncte", await ev(() => utRec.steps.length) === 2);
await ev(() => { theta = 3.0; phi = 1.5; camR = 90; updateCam(); });
await page.fill("#utTxt", "Punctul final");
await ev(() => document.getElementById("utAdd").click());
await ev(() => document.getElementById("utSave").click());
const saved = await ev(() => ({all: JSON.parse(localStorage.getItem("universul-observabil-3d.tours")), user: TOURS.filter(t => t.user).length, rows: document.querySelectorAll("#utList .utRow").length, bar: document.getElementById("utBar").classList.contains("show")}));
check("turul salvat în localStorage (prefix aplicație), 3 puncte, titlu curat", saved.all.length === 1 && saved.all[0].steps.length === 3 && !/[<>]/.test(saved.all[0].title) && /Turul meu/.test(saved.all[0].title), saved.all);
check("turul apare în listă și în TOURS (după cele încorporate); bara închisă", saved.user === 1 && saved.rows === 1 && !saved.bar && await ev(() => TOURS[TOURS.length - 1].user === true));
check("notele sunt păstrate ca text simplu (fără < >)", saved.all[0].steps[0].txt.indexOf("<") < 0 && /Primul punct/.test(saved.all[0].steps[0].txt), saved.all[0].steps[0]);
// salvare cu < 2 puncte
await ev(() => document.getElementById("utRecBtn").click());
await ev(() => document.getElementById("utSave").click());
check("salvare cu 0 puncte: refuzată cu mesaj", await ev(() => !!utRec && document.getElementById("utToast").textContent.length > 5 && utLoad().length === 1));
await page.keyboard.press("Escape");
check("Esc anulează înregistrarea", await ev(() => utRec === null && !document.getElementById("utBar").classList.contains("show")));
// --- redare
await ev(() => document.querySelector("#utList .utRow .tdrwBtn").click());
await page.waitForTimeout(400);
const play = await ev(() => ({act: tourSt.active, idx: tourSt.idx, narr: document.getElementById("tourNarr").textContent, kids: document.getElementById("tourNarr").children.length, lbl: document.getElementById("tourLbl").textContent, xss: window.__xss, show: getComputedStyle(document.getElementById("tourPnl")).display}));
check("redare: panoul de tur pornit cu titlul turului propriu", play.act && play.show !== "none" && /Turul meu/.test(play.lbl), play);
check("redare: nota apare ca text (fără element HTML injectat, fără XSS)", /^Primul punct/.test(play.narr) && play.kids === 0 && play.xss === undefined, play);
await page.waitForTimeout(1500);
const cam1 = await ev(() => ({t: theta, p: phi, r: camR}));
check("redare: camera zboară spre primul punct (r ≈ 60)", Math.abs(cam1.r - 60) < 25 || tourSt.step >= 1, cam1);
await ev(() => document.getElementById("tcPause").click());
await ev(() => document.getElementById("tcNext").click()); await page.waitForTimeout(500);
check("pasul următor: nota 2 (text implicit „Punct 2”)", await ev(() => document.getElementById("tourNarr").textContent) === "Punct 2");
await ev(() => document.getElementById("tcStop").click());
// --- export
const dlP = page.waitForEvent("download", {timeout: 8000});
await ev(() => document.querySelector("#utList .utRow button[aria-label^='Exportă']").click());
const dl = await dlP;
const tmp = path.join(os.tmpdir(), "uo3d-" + Date.now() + ".json");
await dl.saveAs(tmp);
const exp = JSON.parse(fs.readFileSync(tmp, "utf8"));
check("export: nume .json, schema aplicației, 3 pași", /^uo3d-tur-.*\.json$/.test(dl.suggestedFilename()) && exp.app === "universul-observabil-3d" && exp.format === "tour" && exp.steps.length === 3, [dl.suggestedFilename(), exp.app]);
// --- import
await page.setInputFiles("#utFile", tmp);
await page.waitForFunction(() => utLoad().length === 2, null, {timeout: 20000}).catch(() => {});
check("import: al doilea tur în listă", await ev(() => utLoad().length) === 2);
const bad1 = path.join(os.tmpdir(), "uo3d-bad1-" + Date.now() + ".json"); fs.writeFileSync(bad1, JSON.stringify({app: "altceva", format: "tour", steps: [{t: 1, p: 1, r: 5}]}));
await ev(() => { document.getElementById("utToast").textContent = ""; });
await page.setInputFiles("#utFile", bad1);
await page.waitForFunction(() => document.getElementById("utToast").textContent.length > 0, null, {timeout: 20000}).catch(() => {});
check("import: fișier străin respins, mesaj afișat", await ev(() => utLoad().length === 2 && /invalid/i.test(document.getElementById("utToast").textContent)));
const bad2 = path.join(os.tmpdir(), "uo3d-bad2-" + Date.now() + ".json"); fs.writeFileSync(bad2, "{nu e json");
await ev(() => { document.getElementById("utToast").textContent = ""; });
await page.setInputFiles("#utFile", bad2);
await page.waitForFunction(() => document.getElementById("utToast").textContent.length > 0, null, {timeout: 20000}).catch(() => {});
check("import: JSON stricat respins", await ev(() => utLoad().length) === 2);
const bad3 = path.join(os.tmpdir(), "uo3d-bad3-" + Date.now() + ".json"); fs.writeFileSync(bad3, JSON.stringify({app: "universul-observabil-3d", format: "tour", title: "<script>alert(1)</script>Rău", steps: [{t: 1, p: 1, r: 5, dur: 3000, txt: "<img src=x onerror=window.__xss=2>ok"}]}));
await page.setInputFiles("#utFile", bad3);
await page.waitForFunction(() => utLoad().length === 3, null, {timeout: 20000}).catch(() => {});
const imp = await ev(() => ({n: utLoad().length, t: utLoad()[2] && utLoad()[2].title, x: utLoad()[2] && utLoad()[2].steps[0].txt, rows: document.querySelectorAll("#utList .utRow").length, html: document.getElementById("utList").innerHTML.indexOf("<script"), img: document.querySelectorAll("#utList img").length, xss: window.__xss}));
check("import: titlul/nota sanitizate, fără injecție în listă", imp.n === 3 && imp.rows === 3 && !/[<>]/.test(imp.t) && !/[<>]/.test(imp.x) && imp.html < 0 && imp.img === 0 && imp.xss === undefined, imp);
// --- persistență
await page.reload(); await page.waitForTimeout(3500);
check("după reîncărcare: tururile persistă (3 rânduri, 3 în TOURS)", await ev(() => document.querySelectorAll("#utList .utRow").length === 3 && TOURS.filter(t => t.user).length === 3));
// --- ștergere în doi pași
await ev(() => document.querySelector("#utList .utRow button[aria-label^='Șterge']").click());
check("ștergere: primul clic doar armează", await ev(() => utLoad().length) === 3);
await ev(() => document.querySelector("#utList .utRow button.armed").click());
check("ștergere: al doilea clic șterge", await ev(() => utLoad().length) === 2);
// --- limbă
await ev(() => uiSetLang("en")); await page.waitForTimeout(500);
const en = await ev(() => ({h: document.querySelector("#utSec .drsec-title").textContent, b: document.querySelector("#utRecBtn .shareName").textContent, ph: document.getElementById("utName").placeholder, a: document.getElementById("utAdd").textContent}));
check("EN: titlu, buton, placeholder, buton bară traduse", /My tours/.test(en.h) && /Record a new tour/.test(en.b) && /Tour name/.test(en.ph) && /Add point/.test(en.a), en);
await ev(() => uiSetLang("de")); await page.waitForTimeout(400);
check("DE: titlul tradus", /Meine Touren/.test(await ev(() => document.querySelector("#utSec .drsec-title").textContent)));
await ev(() => uiSetLang("ro")); await page.waitForTimeout(300);
check("0 erori", st.errs.length === 0, st.errs);
check("0 cereri de rețea", st.net.length === 0, st.net);
check("0 violări CSP", (await ev(() => window.__csp)).length === 0);
await browser.close();
// --- mobil
{
  const m = await launch({w: 390, h: 740}); await m.page.waitForTimeout(4000);
  await m.page.evaluate(() => document.getElementById("utRecBtn").click()); await m.page.waitForTimeout(400);
  const g = await m.page.evaluate(() => { const r = document.getElementById("utBar").getBoundingClientRect(); return {l: r.left, r: r.right, w: innerWidth, sw: document.documentElement.scrollWidth}; });
  check("390 px: bara încape în ecran, fără defilare orizontală", g.l >= 0 && g.r <= g.w + 0.5 && g.sw <= g.w + 1, g);
  check("390 px: 0 erori", m.st.errs.length === 0, m.st.errs);
  await m.browser.close();
}
summary();
