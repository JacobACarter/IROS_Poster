<script setup lang="ts">
import Poster from "framework/src/Poster.vue";
import Header from "poster/cells/Header.vue";
import Abstract from "poster/cells/Abstract.vue";
import Teaser from "poster/cells/Teaser.vue";
import Pipeline from "poster/cells/Pipeline.vue";
import AnchorPointTheory from "poster/cells/AnchorPointTheory.vue";
import Datasets from "poster/cells/Datasets.vue";
import SyntheticValidation from "poster/cells/SyntheticValidation.vue";
import RealResults from "poster/cells/RealResults.vue";
import LeggedRobot from "poster/cells/LeggedRobot.vue";
import Conclusion from "poster/cells/Conclusion.vue";
import Links from "poster/cells/Links.vue";
</script>

<template>
  <Poster>
    <header>
      <Header />
    </header>
    <main class="poster-body">
      <Abstract class="cell-abstract" />
      <Teaser class="cell-teaser" />
      <Pipeline class="cell-pipeline" accent="hsl(0, 0%, 32%)" />

      <AnchorPointTheory class="cell-theory" accent="hsl(212, 100%, 30%)" />
      <Datasets class="cell-datasets" accent="hsl(212, 60%, 24%)" />

      <SyntheticValidation class="cell-synth" accent="hsl(28, 85%, 40%)" />
      <LeggedRobot class="cell-robot" accent="hsl(300, 55%, 32%)" />

      <RealResults class="cell-results" accent="hsl(160, 60%, 28%)" />

      <Conclusion class="cell-conclusion" />
      <Links class="cell-links" />
    </main>
  </Poster>
</template>

<style scoped>
header {
  height: 92mm;
  padding: 12mm 16mm;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    110deg,
    hsl(214 88% 12%) 0%,
    hsl(209 70% 27%) 100%
  );
  color: white;
}
main {
  height: 100%;
  padding: 14mm 16mm;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 5fr 6fr 5.5fr 6fr 2.5fr;
  grid-template-areas:
    "abstract teaser     teaser   pipeline"
    "theory   theory     datasets datasets"
    "synth    synth      synth    robot"
    "results  results    results  results"
    "conclusion conclusion conclusion links";
  gap: 10mm;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
/* Safety net: clip each cell's overflow at its own grid track instead of
   letting it visually bleed into a neighboring cell (overflow:hidden also
   forces the item's auto-minimum size to 0, so grid tracks don't blow out
   to fit oversized content). Listed per-class rather than via `main > *`
   since scoped-CSS handling of a universal-selector child combinator
   reaching into child-component roots isn't guaranteed the way named
   class selectors are.
   NOTE: GridBox-wrapped cells (pipeline/theory/datasets/synth/results/robot)
   are deliberately excluded — GridBox's own root (the same element this
   class lands on) positions its title *above* its border via a negative
   transform, and already clips its body internally via `.grid-body`.
   Adding overflow:hidden here would clip that floating title off. */
.cell-abstract,
.cell-teaser,
.cell-conclusion,
.cell-links {
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}
.cell-pipeline,
.cell-theory,
.cell-datasets,
.cell-synth,
.cell-results,
.cell-robot {
  min-width: 0;
  min-height: 0;
}
.cell-abstract {
  grid-area: abstract;
}
.cell-teaser {
  grid-area: teaser;
}
.cell-pipeline {
  grid-area: pipeline;
}
.cell-theory {
  grid-area: theory;
}
.cell-datasets {
  grid-area: datasets;
}
.cell-synth {
  grid-area: synth;
}
.cell-results {
  grid-area: results;
}
.cell-robot {
  grid-area: robot;
}
.cell-conclusion {
  grid-area: conclusion;
}
.cell-links {
  grid-area: links;
}
</style>
