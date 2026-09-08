<script setup lang="ts">
import { usePosterFrame, type PosterFrameProps } from "./composables/usePosterFrame";

defineOptions({ name: "Poster" });

const props = withDefaults(defineProps<PosterFrameProps>(), {
  pageWidthMm: 1189,
  pageHeightMm: 841,
});

const {
  stageRef,
  scalerRef,
  scalerStyle,
  posterStyle,
  zoomPct,
  zoomIn,
  zoomOut,
  fit,
  actual,
  print,
} = usePosterFrame(props);
</script>

<template>
  <div class="toolbar">
    <button @click="zoomOut" title="Zoom out">−</button>
    <span class="zoom-val">{{ zoomPct }}%</span>
    <button @click="zoomIn" title="Zoom in">+</button>
    <button @click="fit">Fit</button>
    <button @click="actual">100%</button>
    <button @click="print">Print / PDF</button>
  </div>

  <div ref="stageRef" class="stage">
    <div ref="scalerRef" class="sheet-scaler" :style="scalerStyle">
      <div class="poster" :style="posterStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
