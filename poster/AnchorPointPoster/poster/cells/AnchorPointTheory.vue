<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();
</script>

<template>
  <GridBox title="The Anchor Point" :accent="accent">
    <p class="def">
      Rolling shutter rows are captured sequentially. Any correction method
      must pick a temporal reference &mdash; the
      <strong>anchor point</strong> <em>t</em><sub>anch</sub> &mdash;
      specifying which global-shutter frame the rolling-shutter image is
      aligned to. Prior work fixes this arbitrarily; we analyze it directly.
    </p>

    <div class="row-diagram" role="img" aria-label="Rolling shutter rows 1 through N with the anchor point marked at the temporal midpoint N/2">
      <div class="row-track">
        <div class="row-cell" v-for="n in 11" :key="n" :class="{ anchor: n === 6 }"></div>
      </div>
      <div class="row-labels">
        <span>row 1</span>
        <span class="anchor-label">t<sub>anch</sub> = N/2</span>
        <span>row N</span>
      </div>
    </div>

    <div class="claims">
      <div class="claim">
        <span class="num">1</span>
        <span><strong>Discrete set.</strong> The optimal anchor is one of the
        <em>N</em> row indices &mdash; integer anchors align one row
        perfectly, no non-integer choice does.</span>
      </div>
      <div class="claim">
        <span class="num">2</span>
        <span><strong>General optimum exists.</strong> For any scene, a
        distortion-minimizing anchor <em>t</em><sup>*</sup> exists and can be
        found by grid search over the <em>N</em> rows.</span>
      </div>
      <div class="claim">
        <span class="num">3</span>
        <span><strong>Midpoint is the robust default.</strong> Under
        zero-mean, symmetric motion, the optimum coincides with the temporal
        midpoint <em>t</em><sub>anch</sub> = <em>N</em>/2.</span>
      </div>
    </div>

    <p class="evidence">
      <strong>Method-agnostic:</strong> re-centering RS-Diffusion's implicit
      anchor from the top row to <em>N</em>/2 &mdash; a one-line change, no
      retraining &mdash; substantially improves its PSNR/SSIM (teaser, right).
    </p>
  </GridBox>
</template>

<style scoped>
p.def {
  margin: 0;
  font-size: 0.5em;
  line-height: 1.3;
}
.row-diagram {
  margin: 2mm 0;
}
.row-track {
  display: flex;
  gap: 0.6mm;
  height: 10mm;
}
.row-cell {
  flex: 1;
  background: var(--paper-3);
  border: 0.2mm solid var(--line);
}
.row-cell.anchor {
  background: var(--accent);
  border-color: var(--accent);
}
.row-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.5em;
  color: var(--text-2);
  margin-top: 1mm;
}
.anchor-label {
  font-weight: 700;
  color: var(--accent);
}
.claims {
  margin: 1.5mm 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1mm;
  font-size: 0.44em;
  line-height: 1.22;
}
.claim {
  display: flex;
  gap: 1.6mm;
  align-items: baseline;
}
.claim .num {
  flex: 0 0 auto;
  font-weight: 800;
  color: var(--accent);
}
.evidence {
  margin: 2mm 0 0 0;
  font-size: 0.42em;
  line-height: 1.28;
  color: var(--text-2);
  border-top: 0.3mm dashed var(--line);
  padding-top: 1.6mm;
}
</style>
