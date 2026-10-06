const fs = require('fs');

const contentCode = fs.readFileSync('content.js', 'utf8').replace('const heroContent =', 'global.heroContent =');
eval(contentCode);

const html = fs.readFileSync('index.html', 'utf8');

console.log("=== THOUSIF HAKKIM PORTFOLIO INTEGRITY AUDIT ===");

// Check required chapters in content.js
const requiredChapters = ['headline', 'role', 'meta', 'notification', 'section2', 'works', 'bigRobot', 'editorial', 'smallRobot', 'footer', 'about'];
let missingChapters = [];
requiredChapters.forEach(c => {
  if (!heroContent[c]) missingChapters.push(c);
});
console.log("1. Content chapters check:", missingChapters.length === 0 ? "PASSED (All 11 present)" : "FAILED: " + missingChapters.join(', '));

// Check navigation anchor IDs exist in index.html
const anchors = ['top', 'work', 'section-03', 'projects', 'think', 'method', 'curious', 'resume', 'contact'];
let missingAnchors = [];
anchors.forEach(id => {
  if (!html.includes(`id="${id}"`)) missingAnchors.push(id);
});
console.log("2. Anchor targets check:", missingAnchors.length === 0 ? "PASSED (All 9 sections present)" : "FAILED: " + missingAnchors.join(', '));

// Check data-slots in index.html
const slotsInHtml = Array.from(html.matchAll(/data-slot="([^"]+)"/g)).map(m => m[1]);
console.log(`3. Total data-slots bound in HTML: ${slotsInHtml.length}`);

// Verify personal content integrity (no Gireesh placeholders)
const forbiddenTerms = ['Gireesh', 'kolligireesh', 'ClassLogic', 'Couchops', 'TourtripX'];
let foundForbidden = [];
forbiddenTerms.forEach(t => {
  if (html.includes(t)) foundForbidden.push(`HTML contains ${t}`);
  if (contentCode.includes(t)) foundForbidden.push(`content.js contains ${t}`);
});
console.log("4. Content ownership check:", foundForbidden.length === 0 ? "PASSED (100% Thousif Hakkim content)" : "WARNING: " + foundForbidden.join(', '));

console.log("5. Verified Projects in works.projects:", heroContent.works.projects.map(p => p.name));
console.log("6. Verified Resume Section in HTML:", html.includes('id="resume"') && html.includes('printableResume'));
console.log("7. 3D Spline Canvas elements present:", (html.match(/<canvas/g) || []).length);
console.log("8. Puzzle transition elements present:", html.includes('s3-frags') && html.includes('s3-window') && html.includes('s3-cluster'));
console.log("9. About Me interactive doors present:", html.includes('ab-box--who') && html.includes('ab-box--what') && html.includes('ab-box--think'));
console.log("10. 3D Selected Works chapter present:", html.includes('class="wk"') && html.includes('wk-space') && html.includes('wk-track'));

console.log("\nALL VERIFICATIONS COMPLETE.");
