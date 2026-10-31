"use client";

import { useEffect, useRef } from "react";

/** Keep the poster visible; fetch and autoplay only near the viewport. */
export function DeferredVideo({ src, poster, label, width, height }: {
  src: string;
  poster: string;
  label: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let nearby = false;
    const update = () => {
      if (nearby && !document.hidden) {
        if (!video.getAttribute("src")) video.src = src;
        video.muted = true;
        void video.play().catch(() => { /* Browser autoplay preferences may take precedence. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      update();
    }, { rootMargin: "200px 0px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [src]);

  // data-src also lets the static export validator retain deferred media assets.
  return <video ref={ref} data-src={src} poster={poster} width={width} height={height}
    autoPlay muted loop playsInline preload="none" aria-label={label} />;
}
