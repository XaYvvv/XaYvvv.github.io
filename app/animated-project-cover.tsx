import { DeferredVideo } from "./deferred-video";

export type AnimatedCover = {
  src: string;
  poster: string;
  alt: string;
  type: "video" | "image";
};

export function AnimatedProjectCover({ cover, href, title }: { cover: AnimatedCover; href: string; title: string }) {
  return (
    <div className="project-thumbnail animated-project-cover">
      <a href={href} aria-label={`Read project: ${title}`}>
        {cover.type === "video" ? (
          <DeferredVideo src={cover.src} poster={cover.poster} label={cover.alt} preloadDistance={1000} />
        ) : (
          <img src={cover.src} alt={cover.alt} decoding="async" loading="lazy" />
        )}
      </a>
    </div>
  );
}
