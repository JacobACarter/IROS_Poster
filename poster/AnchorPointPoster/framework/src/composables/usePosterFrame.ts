import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";

export interface PosterFrameProps {
  pageWidthMm?: number;
  pageHeightMm?: number;
}

const MM_TO_PX = 96 / 25.4;
const ZOOM_STEP = 0.4;

export function usePosterFrame(props: PosterFrameProps) {
  const stageRef = ref<HTMLElement | null>(null);
  const scalerRef = ref<HTMLElement | null>(null);

  const fitScale = ref(1);
  const pageWpx = computed(() => (props.pageWidthMm ?? 0) * MM_TO_PX);
  const pageHpx = computed(() => (props.pageHeightMm ?? 0) * MM_TO_PX);

  const zoomExp = ref(0);
  const clampZoom = (exp: number) =>
    Math.min(Math.max(exp, Math.log(0.3)), -Math.log(fitScale.value));
  const zoom = computed(() => Math.exp(zoomExp.value));
  const scale = computed(() => fitScale.value * zoom.value);

  function computeFit() {
    if (typeof window === "undefined") return;
    const pad = 40;
    fitScale.value = Math.min(
      (window.innerWidth - pad) / pageWpx.value,
      (window.innerHeight - pad) / pageHpx.value,
    );
  }

  const scalerStyle = computed<CSSProperties>(() => ({
    width: `${pageWpx.value * scale.value}px`,
    height: `${pageHpx.value * scale.value}px`,
  }));
  const posterStyle = computed<CSSProperties>(() => ({
    "--fs-base": "16mm",
    "--page-w": `${props.pageWidthMm ?? 0}`,
    "--page-h": `${props.pageHeightMm ?? 0}`,
    fontSize: "var(--fs-base)",
    transform: `scale(${scale.value})`,
  }));

  const zoomPct = computed(() => Math.round(scale.value * 100));
  const zoomIn = () => (zoomExp.value = clampZoom(zoomExp.value + ZOOM_STEP));
  const zoomOut = () => (zoomExp.value = clampZoom(zoomExp.value - ZOOM_STEP));
  const fit = () => (zoomExp.value = 0);
  const actual = () => (zoomExp.value = clampZoom(-Math.log(fitScale.value)));
  const print = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  let pinchStartDistance = 0;
  let pinchStartZoomExp = 0;
  let pinchActive = false;
  let pinchAnchorX = 0;
  let pinchAnchorY = 0;
  let pinchAnchorFx = 0.5;
  let pinchAnchorFy = 0.5;

  const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
  const touchDistance = (a: Touch, b: Touch) =>
    Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  const touchCenter = (a: Touch, b: Touch) => ({
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
  });
  const contentOffsets = (stage: HTMLElement, width: number, height: number) => ({
    left: Math.max((stage.clientWidth - width) / 2, 0),
    top: Math.max((stage.clientHeight - height) / 2, 0),
  });

  function onWheelZoom(e: WheelEvent) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    const stage = stageRef.value;
    const scaler = scalerRef.value;
    const before = scaler?.getBoundingClientRect();
    const fx = before ? (e.clientX - before.left) / before.width : 0.5;
    const fy = before ? (e.clientY - before.top) / before.height : 0.5;

    zoomExp.value = clampZoom(zoomExp.value - e.deltaY * 0.005);

    if (stage && scaler) {
      nextTick(() => {
        const after = scaler.getBoundingClientRect();
        stage.scrollLeft += after.left + fx * after.width - e.clientX;
        stage.scrollTop += after.top + fy * after.height - e.clientY;
      });
    }
  }

  function onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    pinchActive = true;
    pinchStartDistance = touchDistance(e.touches[0], e.touches[1]);
    pinchStartZoomExp = zoomExp.value;
    stageRef.value?.style.setProperty("touch-action", "none");

    const stage = stageRef.value;
    if (!stage || pinchStartDistance <= 0) return;
    const center = touchCenter(e.touches[0], e.touches[1]);
    const stageRect = stage.getBoundingClientRect();
    pinchAnchorX = center.x - stageRect.left;
    pinchAnchorY = center.y - stageRect.top;

    const currentScale = scale.value;
    const currentWidth = pageWpx.value * currentScale;
    const currentHeight = pageHpx.value * currentScale;
    const currentOffsets = contentOffsets(stage, currentWidth, currentHeight);
    pinchAnchorFx = clamp01(
      (pinchAnchorX + stage.scrollLeft - currentOffsets.left) / currentWidth,
    );
    pinchAnchorFy = clamp01(
      (pinchAnchorY + stage.scrollTop - currentOffsets.top) / currentHeight,
    );
  }

  function onTouchMove(e: TouchEvent) {
    if (!pinchActive || e.touches.length !== 2) return;
    e.preventDefault();

    const stage = stageRef.value;
    if (!stage) return;

    const distance = touchDistance(e.touches[0], e.touches[1]);
    if (pinchStartDistance <= 0 || distance <= 0) return;
    const ratio = distance / pinchStartDistance;
    const nextZoomExp = clampZoom(pinchStartZoomExp + Math.log(ratio));
    zoomExp.value = nextZoomExp;

    const nextScale = fitScale.value * Math.exp(nextZoomExp);
    const nextWidth = pageWpx.value * nextScale;
    const nextHeight = pageHpx.value * nextScale;
    const nextOffsets = contentOffsets(stage, nextWidth, nextHeight);

    stage.scrollLeft = nextOffsets.left + pinchAnchorFx * nextWidth - pinchAnchorX;
    stage.scrollTop = nextOffsets.top + pinchAnchorFy * nextHeight - pinchAnchorY;
  }

  function onTouchEnd(e: TouchEvent) {
    if (e.touches.length < 2) {
      pinchActive = false;
      pinchAnchorFx = 0.5;
      pinchAnchorFy = 0.5;
      stageRef.value?.style.removeProperty("touch-action");
    }
  }

  onMounted(() => {
    computeFit();
    if (typeof window === "undefined") return;
    const stage = stageRef.value;
    window.addEventListener("resize", computeFit);
    window.addEventListener("wheel", onWheelZoom, { passive: false });
    stage?.addEventListener("touchstart", onTouchStart, { passive: false });
    stage?.addEventListener("touchmove", onTouchMove, { passive: false });
    stage?.addEventListener("touchend", onTouchEnd, { passive: true });
    stage?.addEventListener("touchcancel", onTouchEnd, { passive: true });
  });
  onBeforeUnmount(() => {
    if (typeof window === "undefined") return;
    const stage = stageRef.value;
    window.removeEventListener("resize", computeFit);
    window.removeEventListener("wheel", onWheelZoom);
    stage?.removeEventListener("touchstart", onTouchStart);
    stage?.removeEventListener("touchmove", onTouchMove);
    stage?.removeEventListener("touchend", onTouchEnd);
    stage?.removeEventListener("touchcancel", onTouchEnd);
  });

  watch(() => [props.pageWidthMm, props.pageHeightMm], computeFit);

  return {
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
  };
}
