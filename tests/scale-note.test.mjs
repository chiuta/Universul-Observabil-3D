// 53c: nota „RA/Dec observate; distanța din z; scara log este ilustrativă” în panoul de detalii, tradusă.
// Rulare: node tests/scale-note.test.mjs
import {launch, check, summary} from "./_lib.mjs";
for (const [loc, re] of [["ro-RO", /RA\/Dec observate/], ["en-US", /Observed RA\/Dec/], ["de-DE", /Beobachtete RA\/Dec/]]) {
  const {browser, page, st} = await launch({locale: loc, hash: loc === "ro-RO" ? "" : "?lang=" + loc.slice(0, 2)});
  await page.waitForTimeout(3500);
  const txt = await page.evaluate(() => document.getElementById("pnlScaleNote") && document.getElementById("pnlScaleNote").textContent);
  check(loc + ": nota există și e în limba potrivită", !!txt && re.test(txt), txt);
  check(loc + ": fără erori JS", st.errs.length === 0, st.errs);
  await browser.close();
}
summary();
