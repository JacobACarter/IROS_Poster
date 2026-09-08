<template>
  <div class="conclusion-cell">
    <h4>Conclusion &amp; Contributions</h4>
    <ul>
      <li>
        <strong>Anchor point</strong> as a temporal reference for RS-GS
        alignment, with a systematic theory of its selection under severe
        distortion.
      </li>
      <li>
        A new <strong>collocated RS-GS dataset</strong> with explicit
        anchor-point control, capturing large ego-motion representative of
        mobile robots.
      </li>
      <li>
        Ablations across synthetic &amp; real data showing anchor-point
        choice is a <strong>first-order factor</strong> in RS correction and
        downstream depth accuracy.
      </li>
      <li>
        A two-stage foundation-model pipeline, validated on a
        <strong>legged robot</strong> at &lt;400&nbsp;ms latency under
        aggressive ego-motion.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.conclusion-cell {
  display: flex;
  flex-direction: column;
  gap: 2mm;
  min-width: 0;
  min-height: 0;
  padding-top: 2mm;
}
.conclusion-cell h4 {
  margin: 0;
  font-size: 1em;
}
.conclusion-cell ul {
  margin: 0;
  padding-left: 4mm;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 6mm;
  font-size: 0.58em;
  line-height: 1.26;
  color: var(--text-2);
}
</style>
