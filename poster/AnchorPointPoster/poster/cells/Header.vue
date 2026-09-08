<script setup lang="ts">
import Focus from "assets/focus.svg";
import QRCode from "poster/components/QRCode.vue";
import { withBase } from "lib/paths";
</script>

<template>
  <!-- left: title · subtitle · byline -->
  <div class="title-block">
    <h1 class="title">
      Anchor Points for Monocular Depth Estimation Under Severe Rolling
      Shutter Ego-motion
    </h1>
    <p class="subtitle">
      Jacob Carter, Vaishnav Ramesh, Md Jahidul Islam, Sanjeev J. Koppal
      <span class="badge">IROS 2026</span>
    </p>
  </div>
  <div class="h-div"></div>
  <div class="funding">
    <h4>Funding Sources</h4>
    <div class="funding-logos">
      <img
        :src="withBase('logos/nsf-dark.webp')"
        alt="National Science Foundation"
        class="funding-logo"
      />
      <img
        :src="withBase('logos/onr.webp')"
        alt="Office of Naval Research"
        class="funding-logo"
      />
    </div>
  </div>
  <div class="h-div"></div>
  <div class="logos">
    <a
      href="https://z-yx.cc/FOCUS"
      class="focus-lab-logo"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Focus role="img" aria-label="FOCUS Lab" />
      <span class="focus-lab-suffix">Lab</span>
      <QRCode
        url="z-yx.cc/FOCUS"
        role="img"
        aria-label="Lab website QR code"
        class="focus-lab-qr"
      />
    </a>
    <div class="v-div"></div>
    <img
      :src="withBase('logos/uf-ece.webp')"
      alt="University of Florida ECE"
      class="uf-ece-logo"
    />
  </div>
</template>

<style scoped>
.title-block {
  min-width: 0;
}
.title {
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.01em;
  margin-bottom: 6mm;
}
.subtitle {
  margin: 0;
  padding: 0;
  font-size: 0.86em;
  font-weight: bold;
  opacity: 0.85;
  margin-top: 0.4em;
  display: flex;
  align-items: center;
  gap: 1em;
}
.badge {
  background: hsl(0 0% 100% / 0.8);
  color: black;
  font-size: 0.8em;
  font-weight: 600;
  padding: 0.1em 0.3em;
  border-radius: 4mm;
  white-space: nowrap;
}
h4 {
  font-size: 0.9em;
  font-weight: 700;
  font-style: italic;
  padding: 0;
  margin: 0;
}
.funding-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7mm;
}
.funding-logo {
  height: 24mm;
  width: auto;
}
.logos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8mm;
}
.focus-lab-logo {
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  gap: 0.8ch;
  user-select: none;
}
.focus-lab-suffix {
  line-height: 80%;
}
.focus-lab-qr {
  height: 1em;
  width: 1em;
}
.uf-ece-logo {
  filter: brightness(0) invert(1);
  width: 150mm;
}
div.h-div {
  width: 1mm;
  height: 100%;
  background: hsl(0 0% 100% / 0.5);
}
div.v-div {
  width: 100%;
  height: 1mm;
  background: hsl(0 0% 100% / 0.8);
}
</style>
