<template>
  <div class="abstract-cell">
    <h4>Abstract</h4>
    <p>
      Ego-motion induces severe rolling-shutter (RS) distortion that
      degrades depth estimation. We introduce the
      <strong>anchor point</strong>: a temporal reference between RS and
      global-shutter observations that enables principled fine-tuning of
      depth foundation models. Using a new collocated RS-GS dataset, we
      show anchor-point selection is a primary driver of depth accuracy,
      and validate on a legged robot at under 400&nbsp;ms latency.
    </p>
  </div>
</template>

<style scoped>
.abstract-cell {
  display: flex;
  flex-direction: column;
  gap: 4mm;
  padding: 2mm 0 0 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.abstract-cell h4 {
  font-size: 1em;
  margin: 0;
}
.abstract-cell p {
  margin: 0;
  font-size: 0.52em;
  line-height: 1.3;
  color: var(--text-2);
}
</style>
