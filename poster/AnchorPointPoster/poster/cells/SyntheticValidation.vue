<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";
import { withBase } from "lib/paths";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();

const methods: Array<{ key: string; label: string }> = [
  { key: "input", label: "Input" },
  { key: "rsdiff", label: "RS-D" },
  { key: "mw", label: "MW" },
  { key: "ours", label: "Ours" },
];
</script>

<template>
  <GridBox title="Synthetic Validation" :accent="accent">
    <div class="synth-layout">
      <div class="qual-block">
        <p class="caption-lead">
          SYN1 fan scene &mdash; each RSC method run at two anchors,
          <em>t</em><sub>anch</sub> = 0 vs. <em>N</em>/2 (top vs. bottom row):
        </p>
        <div class="qual-grid">
          <div class="qual-col header-col">
            <div class="head"></div>
            <div class="cell-label">t=0</div>
            <div class="cell-label">t=N/2</div>
          </div>
          <div class="qual-col" v-for="m in methods" :key="m.key">
            <div class="head">{{ m.label }}</div>
            <img
              :src="withBase(`figures/static/${m.key}-t0.${m.key === 'rsdiff' ? 'jpg' : 'png'}`)"
              :alt="`${m.label} at anchor t=0`"
            />
            <img
              :src="withBase(`figures/static/${m.key}-tN2.${m.key === 'rsdiff' ? 'jpg' : 'png'}`)"
              :alt="`${m.label} at anchor t=N/2`"
            />
          </div>
          <div class="qual-col">
            <div class="head">GT</div>
            <img :src="withBase('figures/static/gt.png')" alt="Ground truth" />
            <img :src="withBase('figures/static/gt.png')" alt="Ground truth" />
          </div>
        </div>
      </div>

      <div class="chart-block">
        <figure class="fig">
          <img
            :src="withBase('figures/static/psnr-curve.png')"
            alt="PSNR training curves per anchor point for the fan scene"
          />
          <figcaption>SYN1 fan &mdash; PSNR vs. training iteration</figcaption>
        </figure>
        <figure class="fig">
          <img
            :src="withBase('figures/x4k/psnr-sweep.png')"
            alt="PSNR comparison across five anchor-point choices on the X4K-based dataset"
          />
          <figcaption>SYN2 (X4K) &mdash; PSNR across anchor sweep, peaks at N/2</figcaption>
        </figure>
      </div>

      <table class="results anchor-table">
        <caption>
          Single-scene anchor comparison (intermediate RGB, PSNR / SSIM)
        </caption>
        <thead>
          <tr>
            <th>Anchor</th>
            <th>Ceiling Fan</th>
            <th>Table Fan</th>
            <th>Plane</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>t<sub>anch</sub>=0</td>
            <td>34.93 / 0.971</td>
            <td>26.82 / 0.831</td>
            <td>24.21 / 0.808</td>
          </tr>
          <tr>
            <td>t<sub>anch</sub>=N/2</td>
            <td>36.21 / 0.986</td>
            <td>27.57 / 0.842</td>
            <td>25.02 / 0.841</td>
          </tr>
        </tbody>
      </table>
    </div>
  </GridBox>
</template>

<style scoped>
.synth-layout {
  display: grid;
  grid-template-columns: 2.4fr 1.4fr 1.2fr;
  gap: 6mm;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.qual-block {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.caption-lead {
  margin: 0 0 2mm 0;
  font-size: 0.5em;
  color: var(--text-2);
}
.qual-grid {
  display: flex;
  gap: 1.2mm;
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
  flex: 0 0 9mm;
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
  font-size: 0.46em;
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
.chart-block {
  display: flex;
  flex-direction: column;
  gap: 3mm;
  min-width: 0;
  min-height: 0;
}
.chart-block .fig {
  flex: 1;
  min-height: 0;
}
.anchor-table {
  align-self: center;
}
</style>
