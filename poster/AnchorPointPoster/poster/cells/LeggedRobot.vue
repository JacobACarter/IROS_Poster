<script setup lang="ts">
import GridBox from "poster/components/GridBox.vue";
import { withBase } from "lib/paths";

const { accent = "currentColor" } = defineProps<{ accent?: string }>();

const frames = ["55", "90"];
const rows: Array<{ key: string; label: string }> = [
  { key: "rs", label: "RS Input" },
  { key: "pred", label: "Prediction" },
  { key: "gt", label: "GT Depth" },
];
</script>

<template>
  <GridBox title="Legged Robot Deployment" :accent="accent">
    <div class="robot-layout">
      <figure class="fig schematic-fig">
        <img
          :src="withBase('figures/puppy-pi/schematic.png')"
          alt="Schematic of the collocated RS-GS sensor mounted on the Puppy-Pi legged robot"
        />
        <figcaption>Collocated sensor on Puppy-Pi</figcaption>
      </figure>

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
            :src="withBase(`figures/puppy-pi/${r.key}-${f}.png`)"
            :alt="`${r.label}, scene ${f}`"
          />
        </div>
      </div>

      <table class="results robot-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>AbsRel &darr;</th>
            <th>&delta;<sub>1</sub> &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Raw RS</td>
            <td>0.112</td>
            <td>0.895</td>
          </tr>
          <tr>
            <td>Ours</td>
            <td>0.096</td>
            <td>0.903</td>
          </tr>
        </tbody>
      </table>
      <p class="latency">
        1500 images, 3 outdoor scenes &mdash;
        <strong>&lt;400&nbsp;ms</strong> end-to-end on an RTX A6000
      </p>
    </div>
  </GridBox>
</template>

<style scoped>
.robot-layout {
  display: flex;
  flex-direction: column;
  gap: 2mm;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.schematic-fig {
  flex: 0 0 20%;
  min-height: 0;
}
.qual-grid {
  display: flex;
  gap: 1.2mm;
  flex: 1 1 auto;
  min-height: 0;
}
.qual-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1mm;
  min-width: 0;
  min-height: 0;
}
.qual-col.header-col {
  flex: 0 0 24mm;
}
.qual-col .head {
  flex: 0 0 auto;
  font-size: 0.5em;
  font-weight: 700;
  text-align: center;
  color: var(--accent);
}
.qual-col .cell-label {
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.32em;
  line-height: 1.1;
  color: var(--text-2);
  text-align: center;
  overflow: hidden;
}
.qual-col img {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  border-radius: 1mm;
}
.robot-table {
  flex: 0 0 auto;
  font-size: 0.48em;
}
.latency {
  flex: 0 0 auto;
  margin: 0;
  font-size: 0.46em;
  color: var(--text-2);
  text-align: center;
}
</style>
