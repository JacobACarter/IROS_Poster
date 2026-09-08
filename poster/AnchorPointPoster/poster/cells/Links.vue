<script setup lang="ts">
import QRCode from "poster/components/QRCode.vue";
</script>

<template>
  <div class="links-row">
    <a href="https://z-yx.cc/FOCUS" target="_blank" rel="noopener noreferrer">
      <QRCode url="z-yx.cc/FOCUS" class="qr-code" />
      <h5>
        <div class="link-label">FOCUS<br />Lab</div>
      </h5>
    </a>
    <div class="placeholder" title="Add the paper's short link, then swap this for a QRCode like the one above">
      <div class="qr-code placeholder-box">?</div>
      <h5>
        <div class="link-label muted">Paper PDF<br />(add link)</div>
      </h5>
    </div>
    <div class="placeholder" title="Add the project page's short link">
      <div class="qr-code placeholder-box">?</div>
      <h5>
        <div class="link-label muted">Project Page<br />(add link)</div>
      </h5>
    </div>
  </div>
</template>

<style scoped>
.links-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4mm;
  min-width: 0;
  border-radius: 8mm;
  background: #efefef;
  padding: 6mm 8mm;
  height: 100%;
}
.links-row a,
.links-row .placeholder {
  display: flex;
  align-items: center;
  gap: 4mm;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  user-select: none;
}
.qr-code {
  width: 20mm;
  height: 20mm;
  color: var(--text-2);
  flex: 0 0 auto;
}
.placeholder-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5mm dashed var(--text-2);
  border-radius: 2mm;
  color: var(--text-2);
  font-size: 1.4em;
  font-weight: 700;
}
.links-row h5 {
  min-width: 0;
  margin: 0;
}
.link-label {
  font-size: 0.62em;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.link-label.muted {
  color: var(--text-2);
  font-weight: 600;
}
</style>
