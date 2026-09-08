<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";
import { withBase } from "lib/paths";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();

const pairs = ["05", "129", "209"];
</script>

<template>
  <GridBox title="Datasets" :accent="accent">
    <div class="datasets-layout">
      <div class="blurbs">
        <div class="blurb">
          <h5>SYN1 &mdash; Synthetic Benchmark</h5>
          <p>
            Blender-rendered single-view scenes (fan, plane); 8 RS variants +
            2 GS anchors per scene, 2000 images/scene.
          </p>
        </div>
        <div class="blurb">
          <h5>SYN2 &mdash; Realistic RS Simulation</h5>
          <p>
            RS frames synthesized from X4K1000FPS by row-wise stitching;
            22,040 GS frames / 4,408 RS images with selectable anchors.
          </p>
        </div>
        <div class="blurb">
          <h5>REAL &mdash; Collocated RS-GS Capture</h5>
          <p>
            Beam-splitter-aligned, hardware-synced dual-camera rig with
            controllable trigger delay; ~40k pairs at 300&times;300.
          </p>
        </div>
      </div>

      <div class="visuals">
        <figure class="fig collage-fig">
          <div class="collage-grid">
            <template v-for="f in pairs" :key="f">
              <img
                :src="withBase(`figures/dataset/rs-${f}.png`)"
                :alt="`Rolling shutter frame ${f}`"
              />
            </template>
            <template v-for="f in pairs" :key="'gs' + f">
              <img
                :src="withBase(`figures/dataset/gs-${f}.png`)"
                :alt="`Global shutter frame ${f}`"
              />
            </template>
          </div>
          <figcaption>RS (top) / GS (bottom) collocated pairs</figcaption>
        </figure>

        <figure class="fig motion-fig">
          <img
            :src="withBase('figures/motion/flow-bar.png')"
            alt="Optical-flow motion statistics comparing REAL against other rolling shutter datasets"
          />
          <figcaption>
            REAL exhibits &gt;2&times; the large-flow pixels of prior RS
            datasets &mdash; matching legged-robot ego-motion.
          </figcaption>
        </figure>

        <figure class="fig rig-fig">
          <img
            :src="withBase('figures/camera/camera-diagram.png')"
            alt="Collocated RS-GS beam-splitter camera rig"
          />
          <figcaption>Collocated capture rig, explicit anchor control</figcaption>
        </figure>
      </div>
    </div>
  </GridBox>
</template>

<style scoped>
.datasets-layout {
  display: flex;
  gap: 6mm;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.blurbs {
  flex: 0 0 34%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2mm;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.blurb h5 {
  margin: 0;
  font-size: 0.5em;
  color: var(--accent);
}
.blurb p {
  margin: 0.5mm 0 0 0;
  font-size: 0.42em;
  line-height: 1.24;
  color: var(--text-2);
}
.visuals {
  flex: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3mm;
  min-width: 0;
  min-height: 0;
}
.collage-fig {
  grid-column: 1;
  grid-row: 1 / span 2;
}
.motion-fig {
  grid-column: 2;
  grid-row: 1;
}
.rig-fig {
  grid-column: 2;
  grid-row: 2;
}
.collage-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 1mm;
}
.collage-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5mm;
}
</style>
