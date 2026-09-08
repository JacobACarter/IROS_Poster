<script setup lang="ts">
defineProps<{ title: string; accent: string }>();
</script>

<template>
  <div class="grid-box" :style="{ '--accent': accent }">
    <div class="grid-title">{{ title }}</div>
    <div class="grid-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.grid-box {
  --accent: var(--line);
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 0.8em;
  min-width: 0;
  min-inline-size: 0;
  min-height: 0;
  border-radius: 16mm;
  background: var(--paper);
}

.grid-box::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 2mm solid var(--accent);
  border-radius: 16mm;
  pointer-events: none;
  z-index: 2;
}

.grid-title {
  position: absolute;
  top: 0;
  left: 16mm;
  padding: 0 0.2em;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.8;
  color: var(--accent);
  background: var(--paper);
  white-space: nowrap;
  transform: translateY(-80%);
  z-index: 3;
}

.grid-body {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding: 0;
  margin: 8mm;
  border-radius: 8mm;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
</style>
