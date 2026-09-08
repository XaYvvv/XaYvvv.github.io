import materials from "./presentation-materials.json";
import { projectSections } from "./project-sections";

type Material = { id: string; source: string; src: string; thumbnail?: string; kind: string; size?: number };
const index = new Map(Object.values(materials).flatMap((groups) => groups.flatMap((group) => group.items)).map((item) => [item.id, item as Material]));

function getMaterial(id: string) {
  const item = index.get(id);
  if (!item) throw new Error(`Missing selected project material: ${id}`);
  return item;
}

export function EvidenceNavigation({ projectId }: { projectId: string }) {
  return <nav className="evidence-nav" aria-label="On this project page">
    <a href="#overview">Overview</a>
    <a href="#contributions">My work</a>
    {(projectSections[projectId] ?? []).map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
    <a href="#results">Results & status</a>
  </nav>;
}

export function ProjectEvidence({ projectId }: { projectId: string }) {
  let number = 0;
  return <div className="project-evidence" id="presentation-gallery">
    {(projectSections[projectId] ?? []).map((section) => <section className="evidence-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
      <h2 id={`${section.id}-heading`}>{section.title}</h2>
      <p className="evidence-intro">{section.description}</p>
      <div className="evidence-grid">
        {section.figures.map((figure) => {
          const item = getMaterial(figure.id);
          const label = `Fig. ${++number}`;
          return <figure className={`evidence-figure${figure.wide ? " evidence-wide" : ""}`} id={item.id} key={item.id}>
            <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open full-size ${label}: ${figure.caption}`}>
              <img src={item.thumbnail || item.src} alt={figure.caption} loading="lazy" />
            </a>
            <figcaption><strong>{label}.</strong> {figure.caption}<span className="evidence-source" title={item.id}>{item.source}</span></figcaption>
          </figure>;
        })}
      </div>
      {section.video && (() => {
        const video = getMaterial(section.video);
        return video.kind === "video" ? <figure className="evidence-video">
          <video controls playsInline preload="none" poster="/research/ppt/honeybee-footpad.png" aria-label="Honeybee footpad experimental recording">
            <source src={video.src} type="video/mp4" />
            <a href={video.src}>Download experimental video</a>
          </video>
          <figcaption>Experimental recording of footpad contact.<span className="evidence-source">{video.source}</span></figcaption>
        </figure> : <p className="evidence-download"><a href={video.src} download>Download the liquid-transport comparison video (.mov, {video.size} MB)</a></p>;
      })()}
    </section>)}
  </div>;
}
