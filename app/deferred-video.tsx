"use client";

import { useEffect, useRef } from "react";

/** Buffer ahead of the viewport, but only decode/play while visible. */
export function DeferredVideo({ src, poster, label, width, height, preloadDistance = 400 }: {
  src: string;
  poster: string;
  label: string;
  width?: number;
  height?: number;
  preloadDistance?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let nearby = false;
    let visible = false;
    let pageActive = true;
    let disposed = false;
    let playPending = false;
    let autoplayBlocked = false;
    let playRetries = 0;
    let loadRetries = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let reloadTimer: ReturnType<typeof setTimeout> | undefined;
    const shouldPlay = () => !disposed && visible && pageActive && !document.hidden;
    const resume = () => {
      if (!shouldPlay() || autoplayBlocked || playPending || !video.paused || !video.getAttribute("src")) return;
      playPending = true;
      video.muted = true;
      void video.play().then(() => {
        playRetries = 0;
        // Scrolling away can race the pending play promise.
        if (!shouldPlay()) video.pause();
      }).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "NotAllowedError") autoplayBlocked = true;
        if (error instanceof DOMException && error.name === "AbortError" && playRetries++ < 3) scheduleResume();
      }).finally(() => { playPending = false; });
    };
    const scheduleResume = () => {
      if (!shouldPlay() || autoplayBlocked || resumeTimer !== undefined) return;
      resumeTimer = setTimeout(() => { resumeTimer = undefined; resume(); }, 150);
    };
    const recoverLoad = () => {
      // Never restart a merely slow download. Retry only a failed media load,
      // with a bound so unavailable/unsupported files cannot loop forever.
      if (disposed || !nearby || !pageActive || document.hidden || !navigator.onLine ||
          !video.error || ![2, 4].includes(video.error.code) || loadRetries >= 2 || reloadTimer !== undefined) return;
      reloadTimer = setTimeout(() => {
        reloadTimer = undefined;
        if (disposed || !nearby || !pageActive || document.hidden || !navigator.onLine) return;
        loadRetries++;
        video.load();
        resume();
      }, 1000 * (loadRetries + 1));
    };
    const update = () => {
      if (nearby && pageActive && !document.hidden && !video.getAttribute("src")) {
        video.preload = "auto";
        video.src = src;
      }
      if (shouldPlay()) {
        recoverLoad();
        resume();
      } else {
        clearTimeout(resumeTimer);
        resumeTimer = undefined;
        video.pause();
      }
    };
    const preloadObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      update();
    }, { rootMargin: `${preloadDistance}px 0px` });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const restore = () => { pageActive = true; update(); };
    const suspend = () => { pageActive = false; update(); };
    const retryWithGesture = () => {
      if (autoplayBlocked) { autoplayBlocked = false; resume(); }
    };
    preloadObserver.observe(video);
    playbackObserver.observe(video);
    video.addEventListener("loadeddata", resume);
    video.addEventListener("canplay", resume);
    video.addEventListener("pause", scheduleResume);
    video.addEventListener("error", recoverLoad);
    document.addEventListener("visibilitychange", update);
    document.addEventListener("pointerdown", retryWithGesture);
    document.addEventListener("keydown", retryWithGesture);
    window.addEventListener("pageshow", restore);
    window.addEventListener("pagehide", suspend);
    window.addEventListener("online", update);
    return () => {
      disposed = true;
      clearTimeout(resumeTimer);
      clearTimeout(reloadTimer);
      preloadObserver.disconnect();
      playbackObserver.disconnect();
      video.removeEventListener("loadeddata", resume);
      video.removeEventListener("canplay", resume);
      video.removeEventListener("pause", scheduleResume);
      video.removeEventListener("error", recoverLoad);
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("pointerdown", retryWithGesture);
      document.removeEventListener("keydown", retryWithGesture);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("pagehide", suspend);
      window.removeEventListener("online", update);
      video.pause();
    };
  }, [src, preloadDistance]);

  // data-src also lets the static export validator retain deferred media assets.
  return <video ref={ref} data-src={src} poster={poster} width={width} height={height}
    muted loop playsInline preload="none" aria-label={label} />;
}
