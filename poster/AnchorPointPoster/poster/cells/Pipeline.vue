<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();
</script>

<template>
  <GridBox title="Two-Stage Pipeline" :accent="accent">
    <div class="flow">
      <div class="io">RS Image</div>
      <div class="arrow">&#8594;</div>
      <div class="pipeline-stage">
        <h5>Stage 1 &middot; Marigold U-Net</h5>
        <p class="role">RS correction</p>
      </div>
      <div class="arrow">&#8594;</div>
      <div class="pipeline-stage">
        <h5>Stage 2 &middot; Depth-Anything-V2</h5>
        <p class="role">Depth estimation</p>
      </div>
      <div class="arrow">&#8594;</div>
      <div class="io">Depth Map</div>
    </div>
    <div class="specs">
      <div class="spec-item">
        <h5>Trained on</h5>
        <p>SYN1 + SYN2 + REAL</p>
      </div>
      <div class="spec-item">
        <h5>Losses</h5>
        <p>MSE + scale-invariant</p>
      </div>
      <div class="spec-item">
        <h5>Inference (FP16, 10 steps)</h5>
        <p>349&nbsp;ms (from 2850&nbsp;ms)</p>
      </div>
    </div>
  </GridBox>
</template>

<style scoped>
.flow {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9mm;
  flex: 1 1 auto;
  min-height: 0;
  justify-content: flex-start;
}
.flow > * {
  flex: 0 0 auto;
}
.io {
  text-align: center;
  font-size: 0.38em;
  font-weight: 700;
  color: var(--text-2);
}
.arrow {
  text-align: center;
  font-size: 0.7em;
  color: var(--accent);
  line-height: 0.4;
}
.pipeline-stage {
  background: var(--paper-3);
  outline: 0.5mm solid var(--accent);
  border-radius: 4mm;
  padding: 1.2mm 3mm;
  text-align: center;
}
.pipeline-stage h5 {
  margin: 0;
  font-size: 0.44em;
  line-height: 1.15;
  color: var(--accent);
}
.pipeline-stage p.role {
  margin: 0.3mm 0 0 0;
  font-size: 0.38em;
  font-weight: 500;
  color: var(--text-2);
}
.specs {
  display: flex;
  flex-direction: column;
  gap: 1mm;
  margin-top: 0.5mm;
  flex: 0 0 auto;
}
.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background-color: #eee;
  outline: 0.5mm solid black;
  padding: 1.2mm 2.4mm;
  border-radius: 3mm;
  gap: 2mm;
}
.spec-item h5 {
  margin: 0;
  font-size: 0.38em;
  font-weight: bolder;
  white-space: nowrap;
}
.spec-item p {
  margin: 0;
  font-size: 0.42em;
  font-weight: 600;
  color: var(--accent);
  text-align: right;
}
</style>
