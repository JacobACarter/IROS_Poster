# Anchor Points for RS Depth Estimation — A0 poster

Starting-point poster built with the same architecture as
[FoveaCamDuoPoster](https://github.com/uf-focus-lab/FoveaCamDuoPoster): a
Vue 3 + Vite single page, pan/zoom on screen, true-size A0 (1189×841mm) on
print/export via the vendored `reactive-poster` framework.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173 — live preview, scales to fit
npm run check      # type-check only (vue-tsc --noEmit)
npm run build      # type-check + bundle to dist/
npm run preview    # render preview.png (A0 @ 96 dpi) — quick visual check
npm run serve      # serve the production build (vite preview)
```

> Node 18–22 recommended (built and verified here with Node 24 LTS). Type
> checks, `npm run build`, and a full `npm run preview` render all pass —
> `preview.png` (gitignored) is the last verified snapshot. Re-run
> `npm run preview` after any content/CSS change to catch overflow before
> it reaches print: GridBox cells clip silently (`.grid-body{overflow:hidden}`),
> so content that's too tall just disappears rather than erroring.

## Print / export (PDF + PNG)

```bash
npm run export                 # → poster.pdf + poster.png (both)
npm run export -- -o out.pdf   # PDF only
npm run export -- -o out.png   # PNG only
npm run export -- --dpi 600    # raster DPI for PNG (default 300)
```

Same mechanism as the template: Puppeteer's bundled Chromium renders
`dist/` in-process (no server, no system browser). `@page { size: 1189mm
841mm }` in `poster/index.css` is the single source of truth for the PDF.

## Structure

```
lib/sizes.ts, lib/paths.ts   ← same helpers as the template
scripts/                     ← svg-loader, export.mjs, check.sh (unchanged)
framework/                   ← vendored copy of reactive-poster (pan/zoom + print)
assets/                      ← focus.svg (FOCUS Lab mark, reused)
poster/
  index.vue                  ← header + CSS-grid body (grid-template-areas)
  index.css                  ← A0 canvas, type scale, shared .fig/table.results styles
  cells/                     ← one component per poster section (see below)
  components/                ← GridBox.vue, QRCode.vue (unchanged from template)
public/
  logos/                     ← NSF, ONR, UF ECE (reused — same funders/university)
  figures/                   ← figures pulled from reference_material, by section
```

### Cells (`poster/cells/`)

| Cell                    | Content                                                            | Source in paper |
|--------------------------|---------------------------------------------------------------------|------------------|
| `Header.vue`             | Title, authors, IROS 2026 badge, funding + lab logos                | title/authors, `src/conclusion.tex` acks |
| `Abstract.vue`           | Abstract paragraph                                                   | `src/abstract.tex` |
| `Teaser.vue`             | Hero 3-panel figure (concept / one-line-fix evidence / pipeline output) | `Figures/Rolling Shutter.svg` |
| `Pipeline.vue`           | Two-stage VFM diagram + training/inference specs                     | `src/methods.tex` §Integration of VFMs |
| `AnchorPointTheory.vue`  | Anchor-point definition, row diagram, 3 claims                       | `src/anchor_point.tex` |
| `Datasets.vue`           | SYN1/SYN2/REAL blurbs, RS/GS collage, motion-flow chart, rig diagram | `src/methods.tex` §Dataset Creation |
| `SyntheticValidation.vue`| SYN1 fan-scene qualitative (2 anchors), PSNR curves, anchor tables    | `src/experiments.tex` §Controlled Synthetic Scenes |
| `RealResults.vue`        | Sec. V-B comparison table + qualitative grid (3 scenes × 6 methods)   | `src/experiments.tex`, `Figures/collocated_results_table.tex` |
| `LeggedRobot.vue`        | Puppy-Pi schematic, RS/pred/GT rows, AbsRel/δ1 table, latency         | `src/experiments.tex` §Effectiveness on Legged Robots |
| `Conclusion.vue`         | Contribution bullets                                                 | `src/intro.tex`, `src/conclusion.tex` |
| `Links.vue`              | FOCUS Lab QR (real) + **placeholder** slots for paper/project links  | — |

## Known gaps / next steps

- **Rasters are plain PNG/JPG**, not WebP — run
  `bash scripts/png-to-webp.sh public/figures/<dir>` per folder (needs
  `cwebp`) and update the `withBase(...)` paths, or leave as PNG for now.
- `public/figures/teaser.svg` is the original 6MB Illustrator export with
  embedded raster panels — works as a static `<img>`, but is heavy; a
  cropped/recompressed version would print just as well and load faster.
- **`Links.vue` has two placeholder QR slots** (paper PDF, project page) —
  no fabricated URLs were inserted. Fill in real short links (and swap the
  placeholder `<div>` for a `<QRCode>` like the FOCUS Lab one) before
  printing.
- Only 3 representative frames were pulled into `RealResults.vue`'s
  qualitative grid and 1 scene into `SyntheticValidation.vue` — swap in
  whichever frames tell the story best; more are already sitting in
  `poster/reference_material/Anchor_Point_IROS_Cut/`.
- Verify author order/affiliations and the IROS 2026 venue line against
  the camera-ready paper before printing.

## Sizing gotcha (read before editing font sizes)

The poster's actual base font size is **16mm**, not the `--fs-body: 4.4mm`
etc. tokens defined in `:root` in `index.css`. The framework
(`usePosterFrame.ts`) sets `--fs-base: 16mm; font-size: var(--fs-base)`
*inline* on `.poster`, which wins over the stylesheet's `font-size:
var(--fs-body)` regardless of load order — so every `em` in a cell is
relative to 16mm (this matches the original template's actual behavior
too; its `--fs-*` tokens appear to be unused). Concretely: `0.5em` ≈ 8mm,
a fairly large, legible poster body size. Each dense cell in this project
had its font sizes tuned by rendering `npm run preview` and cropping the
PNG to check for clipping — when adding content, budget roughly: cell
track height (see `grid-template-rows`/`-columns` in `index.vue`) minus
~29mm of GridBox chrome (title margin + body margin) minus ~5–8mm per
text line at whatever `em` you pick.
