---
name: RelCyber Consulting
description: Federal and DoD cybersecurity advisory, set as a topographic map sheet in the logo's navy and teal.
colors:
  navy-ink: "#0B2545"
  teal-contour: "#007C91"
  sheet-ground: "#EAF0F2"
  sheet-ground-deep: "#DDE7EB"
  slate-secondary: "#3A4F66"
  graticule-rule: "#9DB0BC"
  night-ground: "#08172B"
  night-ground-deep: "#0F2540"
  night-ink: "#E8F0F2"
  night-teal: "#3CC4D8"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.7rem, 7.6vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.02
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.02
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  none: "0px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "clamp(64px, 10vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.teal-contour}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "14px 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.sheet-ground}"
  chip:
    backgroundColor: "{colors.sheet-ground}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.none}"
    padding: "11px 16px"
---

# Design System: RelCyber Consulting

## Overview

**Creative North Star: "The Map Sheet"**

The site reads as a military topographic map sheet of cyber terrain, and the firm is the cartographer. A live contour field fills the first screen. Everything below it behaves like the sheet's marginalia: ruled legends, graticule ticks, framed data boxes, condensed caps for labels. The palette is the logo's own navy and teal on a cool pale ground, with a navy night mode.

It is formal and credentials-forward, written for federal contracting officers and prime capture leads who skim on a phone. Density is moderate, ornament is restrained, and color is used on the contour field and the single action.

**Key Characteristics:**
- Navy linework and one teal accent on a cool pale sheet; night mode inverts to deep navy.
- Condensed grotesque headings, humanist body, tabular figures in the facts box.
- Square corners, 1px ruled borders, a double rule under section titles.
- Flat surfaces; depth comes from rules and tonal bands, never shadows.
- One authored motion moment: contours drift and rise under the pointer.

## Colors

A two-color brand (navy, teal) on cool neutrals. Light mode is the default; dark follows `prefers-color-scheme`.

### Primary
- **Navy Ink** (#0B2545): text, borders, rules, headings, the contact band background.
- **Teal Contour** (#007C91): the single action color, contour index lines, legend symbols, selection.

### Neutral
- **Sheet Ground** (#EAF0F2): page background and panels.
- **Sheet Ground Deep** (#DDE7EB): tinted bands (credentials), facts box.
- **Slate Secondary** (#3A4F66): supporting text.
- **Graticule Rule** (#9DB0BC): hairline dividers between legend entries.

### Night mode
- **Night Ground** (#08172B), **Night Ground Deep** (#0F2540), **Night Ink** (#E8F0F2), **Night Teal** (#3CC4D8) replace the light roles one for one.

### Named Rules
**The One Action Rule.** Teal fills appear only on the primary email button and contour lines. Everything else is navy and neutral.

## Typography

**Display and Label Font:** Barlow Condensed (Arial Narrow fallback)
**Body Font:** Barlow (system-ui fallback)

**Character:** compressed, signage-like headings over a calm humanist body, like map marginalia over a legend.

### Hierarchy
- **Display** (700, clamp 2.7 to 5.4rem, 1.02): hero headline only, sentence case.
- **Headline** (700, clamp 2.2 to 3.6rem, 1.02, uppercase): section titles, with a 3px double rule below.
- **Title** (700, clamp 1.5 to 2rem, 1.02): legend entry headings.
- **Body** (400, 1.0625rem, 1.6): paragraphs, capped near 60 to 70ch.
- **Label** (600, 0.95rem to 1.15rem, tracking 0.04 to 0.14em): nav, chips, button text, standards lines.

### Named Rules
**The Short Caps Rule.** Uppercase and wide tracking are for short labels and section titles only, never paragraphs.

## Layout

A single-column sheet with a 1180px content measure and a fluid gutter of 16 to 48px. The hero fills the viewport (100svh) with a bordered text panel at lower left and the credential strip beneath it. Sections stack with 64 to 120px vertical padding. Legend entries are a symbol column plus text; credentials and the principal bio go two-column from 760px. A fixed header carries the logo and four section links, which wrap rather than collapse on phones. Tap targets are at least 44px.

## Elevation & Depth

Flat by default. Depth is carried by 1px navy borders, hairline rules, a double rule under titles, and a tonal band behind the credentials. There are no shadows. Header and hero panels use a near-opaque ground color (93 to 94%) so text stays legible over the contours.

## Shapes

Square corners everywhere (0px). Borders are 1px; the only heavier line is the 3px double rule under section titles. Legend symbols are authored 48px line icons (2px stroke) in navy or teal: rings, a building, a triangle, a grid, a ridge line, a document.

## Components

### Buttons
- **Primary:** teal fill, white uppercase condensed label, 52px tall (60px for the contact call to action), square.
- **Hover:** fills navy; 0.2s exponential ease. Focus shows a 3px navy ring with 3px offset.
- **Quiet:** underlined caps link with a 44px hit area.

### Chips
Bordered 1px navy boxes on the sheet ground with condensed caps labels, used for credentials and the hero strip.

### Legend entries
A 48 to 56px symbol and a text block (title, description, one line of standards references), separated by hairline rules.

### Contour field (signature)
A canvas of marching-squares isolines over a drifting height field. Every fifth line is an index contour in teal; the rest are lighter. Pointer or touch raises a peak. It pauses off-screen and under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep copy in the buyer's vocabulary: NIST SP 800-207, RMF, DCWF, PWS.
- **Do** show the logo in navy and teal on light and the white version on dark.
- **Do** keep the email button visible on first screen at every width.

### Don't:
- **Don't** use "RC" or "RC Cyber" alone as a brand name; show the full lockup.
- **Don't** add shadows, gradients, rounded cards or neon glows.
- **Don't** add a clearance level, current employer or contract names; they are deliberately omitted.
- **Don't** state claims that are not backed by the principal's records.

Not canonized: the detector's "cramped padding" notes on full-width sections and its decorative-stripes note on the graticule ticks are false positives for this design.
