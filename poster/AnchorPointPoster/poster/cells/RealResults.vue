<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";
import { withBase } from "lib/paths";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();

const rows: Array<{ key: string; label: string }> = [
  { key: "input", label: "Input" },
  { key: "mw", label: "MW" },
  { key: "rshomo", label: "RS-Homo" },
  { key: "rsdiff", label: "RS-Diff FT" },
  { key: "ours", label: "Ours" },
  { key: "gt", label: "GT" },
];
const frames = ["13", "65", "96"];
</script>

<template>
  <GridBox title="Real-World Results" :accent="accent">
    <div class="results-layout">
      <div class="table-block">
        <table class="results">
          <caption>
            PSNR / SSIM (intermediate RGB) &amp; AbsRel / &delta;<sub>1</sub>
            (depth), Sec.&nbsp;V-B test set
          </caption>
          <thead>
            <tr>
              <th>Architecture</th>
              <th>Method</th>
              <th>PSNR</th>
              <th>SSIM</th>
              <th>AbsRel</th>
              <th>&delta;<sub>1</sub></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="3">One Stage</td>
              <td>Marigold</td>
              <td>NA</td>
              <td>NA</td>
              <td>6.047</td>
              <td>0.257</td>
            </tr>
            <tr>
              <td>Depth-Anything-V2</td>
              <td>NA</td>
              <td>NA</td>
              <td>0.655</td>
              <td>0.757</td>
            </tr>
            <tr>
              <td>Eco-Depth</td>
              <td>NA</td>
              <td>NA</td>
              <td>0.488</td>
              <td>0.676</td>
            </tr>
            <tr>
              <td rowspan="4">Comparisons</td>
              <td>RS-Diffusion</td>
              <td>19.47</td>
              <td>0.433</td>
              <td>0.904</td>
              <td>0.190</td>
            </tr>
            <tr>
              <td>RS-Diffusion (FT)</td>
              <td>21.52</td>
              <td>0.469</td>
              <td>0.802</td>
              <td>0.214</td>
            </tr>
            <tr>
              <td>Deep RS-Homography</td>
              <td>20.75</td>
              <td>0.456</td>
              <td>0.788</td>
              <td>0.446</td>
            </tr>
            <tr>
              <td>Manhattan World</td>
              <td>21.41</td>
              <td>0.454</td>
              <td>0.621</td>
              <td>0.623</td>
            </tr>
            <tr>
              <td>Parallel 2-Stage</td>
              <td>Marigold&ndash;Marigold</td>
              <td>22.87</td>
              <td>0.494</td>
              <td>3.22</td>
              <td>0.382</td>
            </tr>
            <tr>
              <td rowspan="2">Orthogonal 2-Stage</td>
              <td>Marigold&ndash;EcoDepth</td>
              <td>22.87</td>
              <td>0.494</td>
              <td>0.506</td>
              <td>0.649</td>
            </tr>
            <tr>
              <td>Marigold&ndash;DepthAnything (base)</td>
              <td>22.87</td>
              <td>0.494</td>
              <td>0.377</td>
              <td>0.773</td>
            </tr>
            <tr>
              <td></td>
              <td>Fine-Tuned (ours)</td>
              <td>22.87</td>
              <td>0.494</td>
              <td>0.191</td>
              <td>0.842</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="qual-block">
        <p class="caption-lead">
          Qualitative comparisons on REAL &mdash; only the two-stage
          orthogonal pipeline preserves scene structure under large RS
          distortion:
        </p>
        <div class="qual-grid">
          <div class="qual-col header-col">
            <div class="head"></div>
            <div class="cell-label" v-for="r in rows" :key="r.key">
              {{ r.label }}
            </div>
          </div>
          <div class="qual-col" v-for="f in frames" :key="f">
            <div class="head">Scene {{ f }}</div>
            <img
              v-for="r in rows"
              :key="r.key + f"
              :src="withBase(`figures/qualitative/${r.key}-${f}.png`)"
              :alt="`${r.label} output, scene ${f}`"
            />
          </div>
        </div>
      </div>
    </div>
  </GridBox>
</template>

<style scoped>
.results-layout {
  display: flex;
  gap: 6mm;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.table-block {
  flex: 0 0 40%;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
.table-block table {
  font-size: 0.36em;
}
.table-block :deep(th),
.table-block :deep(td) {
  padding: 0.9mm 1.6mm;
}
.qual-block {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.caption-lead {
  margin: 0 0 2mm 0;
  font-size: 0.5em;
  color: var(--text-2);
}
.qual-grid {
  display: flex;
  gap: 1.4mm;
  flex: 1;
  min-height: 0;
}
.qual-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1mm;
  min-width: 0;
}
.qual-col.header-col {
  flex: 0 0 11mm;
}
.qual-col .head {
  font-size: 0.5em;
  font-weight: 700;
  text-align: center;
  color: var(--accent);
}
.qual-col .cell-label {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.44em;
  color: var(--text-2);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.qual-col img {
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  border-radius: 1mm;
}
</style>
