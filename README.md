# Thousif Hakkim — Luxury Editorial Portfolio Website

A high-end, luxury editorial portfolio website for **Thousif Hakkim** (AI-Assisted Digital Professional & Engineering Graduate), refined using **UI/UX Pro Max** intelligence, featuring deep velvet burgundy aesthetics, AI transparent cutout portraiture, and curated project photography.

---

## 🎨 Creative Direction & Aesthetic Identity

- **Color Palette:**
  - Obsidian Black Base: `#0B0809`
  - Dark Chocolate / Velvet Espresso Panels: `#150F12` / `#1C1418`
  - Rich Velvet Wine & Burgundy Accents: `#7A2232` / `#9E2F46` / `#3D0F17`
  - Warm Champagne & Nude Alabaster: `#E5D5C5` / `#F4EAE0`
  - Soft Gold Accents: `#D4B499`
  - Subtle Hairline Grid Borders: `rgba(229, 213, 197, 0.12)`
- **Typography (UI/UX Pro Max Luxury Stack):**
  - **Cover Display Masthead:** `Playfair Display` (weight 900, condensed high-fashion serif)
  - **Subtitles & Quotes:** `Cormorant Garamond` (classic editorial serif with italic flair)
  - **Signature Calligraphy:** `Pinyon Script` (flowing champagne script for *"Thousif Hakkim"* & *"Amazing"*)
  - **Body & Meta Labels:** `Montserrat` & `Plus Jakarta Sans` with tracked all-caps letter-spacing (`0.14em` - `0.2em`).

---

## 📸 Imagery & Media Integration

1. **AI Background Removal Cutout:**
   - `hero_portrait_transparent.png`: Background removed with AI (`rembg` + `onnxruntime`) allowing Thousif's portrait to cleanly overlay the velvet wine radial glow and intersect with the giant `PORTFOLIO` title without background gray clipping.
2. **Curated Pexels Editorial Photography:**
   - `project_qa.jpg`: High-tech code and web software QA testing interface defining the **C99 QA Suite**.
   - `project_export.jpg`: Global shipping cargo logistics at sunset defining the **ACTIF European & International Marketplace Research**.
   - `project_catalogue.jpg`: Luxury fabric rolls and apparel studio defining the **ACTIF Wholesale & Retail Catalogue System**.
   - `velvet_rose.jpg`: Dark moody velvet rose creating the circular vignette in the **Process Section**.

---

## 🏛️ Page Sections

1. **Cover Hero (`#hero`):**
   - Giant magazine masthead `PORTFOLIO` spanning behind the transparent cutout portrait.
   - Cutout editorial portrait with deep velvet wine aura and ambient lighting.
   - Left flank: *"I DESIGN DIGITAL EXPERIENCES THAT INSPIRE & CONNECT"*, gold pill CTA, flowing signature.
   - Right flank: Bio descriptor, SVG globe icon, *"BASED IN COIMBATORE 🌐 WORKING WORLDWIDE"*.
2. **Selected Projects (`#projects`):**
   - `01 VELVET STUDIO // C99` — Website QA & Software Testing with real software testing photography and live status badges.
   - `02 AURORA SHOP // ACTIF` — International E-Commerce Market Research with global trade logistics photography.
   - `03 MINDSPACE // CATALOGUE` — Wholesale & Retail Product Catalogue System with luxury textile studio photography.
3. **Process & Tools (`#process` / `#tools`):**
   - Left: 5-step process (`DISCOVER → DEFINE & PROMPT → ANALYZE & TEST → STRUCTURE → DELIVER`) with Pexels velvet rose vignette and quote *"A thoughtful process for meaningful results."*
   - Right: 8 luxury tool cards (Claude, Codex, Antigravity, Excel/Sheets, Canva, GitHub, UI/UX Design, Vibe Coding).
4. **Kind Words (`#testimonials`):**
   - 3 editorial testimonial cards from QA, e-commerce, and data operations clients.
5. **Verified Resume & Credentials (`#resume`):**
   - Integrated luxury dark CV sheet with **Print / Save PDF** export (`@media print` clean A4 layout).
   - Experience (C99, ACTIF, Data Research 330+ records, AI Content), Academic Projects (Solar DC Grass-Cutting Machine Grade A+, Tinkercad), Vibe-Coded Concepts (Fitness & PropTech apps with Claude/Codex/Antigravity, Nadukal Museum Heritage), NIET Coimbatore education (CGPA 6.9), and 12-skill directory.
6. **Footer & Contact (`#contact`):**
   - *"LET'S CREATE SOMETHING Amazing"* with open availability status, direct email/phone/LinkedIn/GitHub links with SVG icons, and portrait thumbnail.

---

## ⚡ Interaction Design & Animation Engine (Adapted from Reference Repository)

Adapted from the interaction design techniques in [`gireeshkumarreddy/Software-Developer`](https://github.com/gireeshkumarreddy/Software-Developer), retaining 100% of Thousif's content and luxury dark editorial palette:

1. **Cinematic Hero Staging (`is-ready` & `is-settled`):**
   - Staged sequence begins in deep obsidian velvet night.
   - Atmospheric burgundy flare (`.portrait-ambient-glow`) expands behind Thousif's cutout portrait.
   - The cutout portrait gently breathes into life with luminous edge-glow and vertical emergence.
   - Masthead typography (`PORTFOLIO`) and headlines execute an editorial vertical mask-reveal (`translate3d(0, 110%, 0) → 0`).
   - Flowing script signature (`Thousif Hakkim`) and gold action pills settle into place.
2. **Damped Cursor Spotlight & Optical Parallax:**
   - Smooth pointer-following radial light layer using silky exponential damping:
     `lightX += (lightTX - lightX) * 0.045`, `curX += (targetX - curX) * 0.055`.
   - Subtle optical counter-parallax between portrait and velvet background aura.
   - **Performance Guard (`beyond-hero`):** When the user scrolls past the hero section, the `requestAnimationFrame` loop automatically parks, consuming zero idle GPU/CPU cycles.
3. **Interactive 3D Card Tilt & Specular Sheen:**
   - 3D perspective pitch and roll on desktop cursor hover (`perspective: 1200px; transform: rotateX(...) rotateY(...) scale3d(...)`).
   - Dynamic specular sheen highlight overlay calculating mouse coordinates (`--mouse-x`, `--mouse-y`) across the cards.
4. **Cinematic Case Study Inspector Modal (`flashTo`):**
   - Clicking *"INSPECT CASE STUDY ↗"* triggers a velvet dark flash transition before opening the deep-dive case study modal.
   - Provides full technical dossiers for C99 Website QA (65+ test cases), ACTIF Global Marketplace Expansion, and ACTIF Wholesale & Retail Catalogue Systems.
   - Supports keyboard `Escape` dismissal, close button, and backdrop click.
5. **Interactive Process Timeline Rail & Step Scrubbing:**
   - Vertical progress rail with active luminous wine-gold marker.
   - Steps highlight dynamically as the user scrolls through the 5 phases (`DISCOVER → DEFINE & PROMPT → ANALYZE & TEST → STRUCTURE → DELIVER`), or on direct click.
   - Center velvet rose vignette features smooth breathing animation.
6. **Magnetic Button Tactile Micro-Interactions:**
   - Gentle magnetic attraction pull on pill buttons (`AVAILABLE FOR PROJECTS`, `INSPECT CASE STUDY`).
7. **Accessibility & Reduced-Motion (`prefers-reduced-motion`):**
   - Rigorous CSS and JavaScript checks for `prefers-reduced-motion: reduce`.
   - Bypasses timeouts, disables transforms, pauses RAF loops, and presents content instantly and safely for users with vestibular sensitivities.

---

## 🌐 Local Live Preview

```
http://localhost:8088/index.html
```
