import data from "./presentation-materials.json";

type Material = {
  id: string;
  source: string;
  src: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  kind: "image" | "gif" | "video" | "download";
  size?: number;
  caption?: string;
};
type MaterialGroup = { id: string; title: string; sourceType: string; items: Material[]; note?: string };
const galleries = data as Record<string, MaterialGroup[]>;

const materialIndex = new Map(Object.values(galleries).flatMap((groups) => groups.flatMap((group) => group.items)).map((item) => [item.id, item]));
const certificates = new Set(["PDF-15-Im21", "PDF-15-Im22", "PDF-18-Im0", "PDF-18-Im1"]);

function selectedPhotos(photos: [string, string][]): Material[] {
  return photos.flatMap(([id, caption]) => {
    const item = materialIndex.get(id);
    return item ? [{ ...item, caption }] : [];
  });
}

const selectedPosts: MaterialGroup[] = [
  {
    id: "formula-student-life", title: "Formula Student & Teamwork", sourceType: "Presentation PDF",
    items: selectedPhotos([
      ["PDF-26-Im12", "Formula Student car at a campus event."],
      ["PDF-26-Im13", "Team photograph with the Formula Student car."],
      ["PDF-26-Im10", "Hands-on work and team collaboration."],
    ]),
  },
  {
    id: "academic-meetings", title: "Academic Meetings", sourceType: "Presentation",
    items: selectedPhotos([
      ["PDF-08-Im16", "Presenting research on bioinspired adhesive patches."],
      ["PPT-image17", "Group photograph at an academic gathering."],
      ["PDF-26-Im0", "Bionic engineering community event."],
    ]),
  },
  {
    id: "talks-and-outreach", title: "Talks, Training & Outreach", sourceType: "Presentation PDF",
    items: selectedPhotos([
      ["PDF-26-Im4", "Classroom training and discussion."],
      ["PDF-26-Im5", "Explaining a technical problem at the blackboard."],
      ["PDF-26-Im7", "CAD and modelling training session."],
      ["PDF-26-Im16", "Presentation and audience discussion."],
    ]),
  },
];

export function getMaterialGroups(scope: string) {
  if (scope === "posts") return selectedPosts;
  return (galleries[scope] ?? []).map((group) => ({ ...group, items: group.items.filter((item) => !certificates.has(item.id)) })).filter((group) => group.items.length > 0);
}

export function getMaterialCount(scope: string) {
  return getMaterialGroups(scope).reduce((count, group) => count + group.items.length, 0);
}

export function MaterialPreview({ scope, href, limit = 4 }: { scope: string; href: string; limit?: number }) {
  const items = getMaterialGroups(scope).flatMap((group) => group.items).filter((item) => item.thumbnail).slice(0, limit);
  if (!items.length) return null;
  return (
    <a className="material-preview" href={href} aria-label={`View all ${getMaterialCount(scope)} project materials`}>
      {items.map((item) => <img key={item.id} src={item.thumbnail} alt={`${item.source} · ${item.id}`} loading="lazy" />)}
      <span>{getMaterialCount(scope)} materials · View gallery →</span>
    </a>
  );
}

export function MaterialGallery({ scope }: { scope: string }) {
  const groups = getMaterialGroups(scope);
  return <div className="material-gallery">
    <nav className="gallery-index" aria-label="Gallery topics">{groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title} ({group.items.length})</a>)}</nav>
    {groups.map((group) => <section className="material-group" key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
      <h3 id={`${group.id}-heading`}>{group.title}</h3>
      {group.note && <p className="meta">{group.note}</p>}
      <div className="material-grid">
        {group.items.map((item) => <figure className={`material-item material-${item.kind}`} key={item.id} id={item.id}>
          {item.thumbnail ? <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open original: ${item.id}`}>
            <img src={item.thumbnail} alt={`${group.title} · ${item.source} · ${item.id}`} loading="lazy" width={item.width} height={item.height} />
          </a> : item.kind === "video" ? <video controls playsInline preload="none" aria-label={`${group.title} · ${item.id}`} poster={item.id === "PPT-media2" ? "/research/ppt/honeybee-footpad.png" : undefined}>
            <source src={item.src} type="video/mp4" />
            <a href={item.src}>Download video</a>
          </video> : <a className="material-file" href={item.src} download>Download video (.mov, {item.size} MB)</a>}
          <figcaption><a href={`#${item.id}`} className="material-id">{item.id}</a><span>{item.source}{item.kind === "gif" ? " · Open original GIF" : item.kind === "video" ? " · Video" : ""}</span>{item.caption && <span>{item.caption}</span>}</figcaption>
        </figure>)}
      </div>
    </section>)}
  </div>;
}

export function PostsPreview() {
  return <div className="posts-preview-list">{getMaterialGroups("posts").map((group) => <article className="post-preview" key={group.id}>
    <h3><a href={`/posts#${group.id}`}>{group.title}</a></h3>
    <a className="post-preview-images" href={`/posts#${group.id}`} aria-label={`View ${group.title}`}>
      {group.items.slice(0, 3).map((item) => <img key={item.id} src={item.thumbnail} alt={item.caption || `${item.source} · ${item.id}`} loading="lazy" />)}
    </a>
    <p className="meta"><a href={`/posts#${group.id}`}>View {group.items.length} photos →</a></p>
  </article>)}</div>;
}
