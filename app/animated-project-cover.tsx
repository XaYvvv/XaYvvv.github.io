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
          <video src={cover.src} poster={cover.poster} autoPlay muted loop playsInline preload="auto" aria-label={cover.alt} />
        ) : (
          <img src={cover.src} alt={cover.alt} decoding="async" />
        )}
      </a>
    </div>
  );
}
