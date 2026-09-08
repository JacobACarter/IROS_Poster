<script setup lang="ts">
import { withBase } from "lib/paths";
</script>

<template>
  <div class="teaser-cell">
    <figure class="fig slot-figure">
      <img
        :src="withBase('figures/teaser.svg')"
        alt="Anchor point formulation for rolling shutter correction: (a) the anchor point concept, (b) PSNR/SSIM gains from re-centering a state-of-the-art method's anchor with no retraining, (c) our visual-foundation-model pipeline recovering geometrically consistent depth from severe rolling-shutter distortion"
      />
      <figcaption>
        <strong>a)</strong> the anchor point concept &nbsp;·&nbsp;
        <strong>b)</strong> a state-of-the-art method improves substantially
        when its implicit anchor is re-centered to
        <em>t</em><sub>anch</sub> = <em>N</em>/2 &mdash;
        <strong>one line of code, no retraining</strong> &nbsp;·&nbsp;
        <strong>c)</strong> our pipeline recovers geometrically consistent
        depth under severe RS distortion
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.teaser-cell {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 4mm 0 0 0;
}
.slot-figure {
  flex: 1;
  min-height: 0;
}
.fig figcaption {
  font-size: var(--fs-cap);
  color: var(--text-2);
  text-align: left;
  line-height: 1.3;
  margin-top: 2mm;
}
</style>
