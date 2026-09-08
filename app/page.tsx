import { ProjectList } from "./projects";
import { Timeline } from "./timeline";

const links = {
  bit: "https://english.bit.edu.cn/",
  advisor:
    "https://me.bit.edu.cn/szdw/jsml/zzgcx/jxsjjys/bssds18/011124976e4b4967affa67c6f99e2e19.htm",
  byteDance: "https://seed.bytedance.com/zh/direction/robotics",
  formulaStudent: "https://www.bitfsae.com/",
};

const publications = [
  {
    title:
      "Bioinspired Hierarchical Architecture with Water Transport Channels for Strong Adhesion at the Sweating Interface",
    authors: "Jieliang Zhao†,*, Yu Xiang†, et al.",
    venue: "Advanced Science, 2026 · First student author / Co-first author · CAS Zone 1 Top · JCR Q1 · IF 14.1",
    image: "/research/ppt/patch-architecture.png",
    alt: "Bioinspired hierarchical patch architecture and water-transport channels",
    details: "/projects/sweat-managing-patch",
    summary:
      "A hierarchical adhesive interface that combines conformal contact with directional water transport for stable adhesion on sweating skin.",
    href: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202524043",
  },
  {
    title:
      "Bionic Wet Adhesive Surface with Micronano Hierarchical Structure for Robust Biosignal Monitoring",
    authors: "Zhiyun Ma, Lulu Liang, Chenyang Zhang, Yu Xiang, et al.",
    venue: "ACS Applied Materials & Interfaces, 2025 · JCR Q1",
    image: "/research/ppt/hybrid-adhesive-design.png",
    alt: "Honeybee and tree-frog inspired wet adhesive surface",
    details: "/projects/hybrid-wet-adhesive",
    summary:
      "A micro-nano structured wet adhesive surface designed to maintain attachment and electrophysiological signal quality under perspiration.",
    href: "https://pubs.acs.org/doi/10.1021/acsami.5c02890",
  },
  {
    title:
      "A Worm-like Soft Robot Based on Adhesion-Controlled Electrohydraulic Actuators",
    authors: "Yangzhuo Wu, Zhe Sun, Yu Xiang, Jieliang Zhao",
    venue: "Biomimetics, 2024 · JCR Q1",
    image: "/research/gallery/PDF-16-Im0-preview.webp",
    alt: "Electrohydraulic soft robot architecture and bioinspired friction pads",
    details: "/projects/worm-like-soft-robot",
    summary:
      "A soft crawling robot combining controllable electrohydraulic actuation with bioinspired contact structures derived from tree-frog and honeybee footpads.",
    href: "https://www.mdpi.com/2313-7673/9/12/776",
  },
];

function LinkedAuthors({ text }: { text: string }) {
  const parts = text.split("Jieliang Zhao");

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts[0]}
      <a href={links.advisor} target="_blank" rel="noreferrer">
        Jieliang Zhao
      </a>
      {parts[1]}
    </>
  );
}

export default function Home() {
  return (
    <main className="page home-page">
      <h1>
        Yu Xiang <span>「项宇」</span>
      </h1>

      <nav className="section-nav" aria-label="Main sections">
        <a href="#about">About</a>
        <a href="#publications">Publications</a>
        <a href="#projects">Projects</a>
      </nav>

      <section className="bio" id="about" aria-labelledby="about-heading">
        <aside>
          <img className="portrait" src="/portrait.webp" alt="Portrait of Yu Xiang" />
          <p className="profile-role">Mechanical Engineering<br />Bioinspired Robotics</p>
          <nav className="profile-links" aria-label="Profile links">
            <a href="mailto:xyu8468@gmail.com">Email</a>
            <a
              href="https://scholar.google.com/citations?hl=zh-CN&user=AHiCmowAAAAJ"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar
            </a>
          </nav>
        </aside>

        <div className="bio-text">
          <h2 id="about-heading">About</h2>
          <p>
            I am a master&apos;s student in Mechanical Engineering at{" "}
            <strong>
              <a href={links.bit} target="_blank" rel="noreferrer">
                Beijing Institute of Technology
              </a>
            </strong>, working in the
            Laboratory of Biological Intelligence and Biomimetics under the
            supervision of{" "}
            <a href={links.advisor} target="_blank" rel="noreferrer">
              Prof. Jieliang Zhao
            </a>. I am currently a Robotics Hardware Intern at{" "}
            <strong>
              <a href={links.byteDance} target="_blank" rel="noreferrer">
                ByteDance Seed Robotics
              </a>
            </strong>.
          </p>
          <p>
            My work spans biological observation, interfacial mechanics, structural
            design and robotic hardware. I have also worked on soft robots,
            dexterous hands and{" "}
            <a href={links.formulaStudent} target="_blank" rel="noreferrer">
              Formula Student vehicle systems
            </a>.
          </p>
          <p>
            <strong>Research Interest:</strong> Bioinspired adhesion, biomechanics,
            soft actuators and dexterous manipulation.
          </p>
          <p>
            <strong>Research Question:</strong> How can biological attachment
            strategies be translated into robust interfaces and mechanisms for
            wearable devices and robots?
          </p>
          <p>
            Email: <a href="mailto:xyu8468@gmail.com">xyu8468@gmail.com</a>
          </p>
        </div>
        <Timeline />
      </section>

      <hr />

      <section className="simple-section" id="publications" aria-labelledby="publications-heading">
        <h2 id="publications-heading">Publications</h2>
        <div className="entry-list">
          {publications.map((paper) => (
            <article className="entry publication" key={paper.title}>
              <a className="publication-cover" href={paper.details} aria-label={`Research details: ${paper.title}`}>
                <img src={paper.image} alt={paper.alt} loading="lazy" />
              </a>
              <div className="entry-body">
                <h3>
                  <a href={paper.href} target="_blank" rel="noreferrer">
                    {paper.title}
                  </a>
                </h3>
                <p><LinkedAuthors text={paper.authors} /></p>
                <p className="venue">
                  {paper.venue} ·{" "}
                  <a href={paper.href} target="_blank" rel="noreferrer">[paper]</a>
                  {" · "}<a href={paper.details}>[research details]</a>
                </p>
                <p>{paper.summary}</p>
              </div>
            </article>
          ))}
        </div>
        <article className="entry publication manuscript-entry">
          <a className="publication-cover" href="/projects/space-adhesion" aria-label="Research details: variable-stiffness adhesion for space manipulation">
            <img src="/research/gallery/PDF-22-Im0-preview.webp" alt="Insect tarsal attachment and detachment sequence" loading="lazy" />
          </a>
          <div className="entry-body">
          <h3><a href="/projects/space-adhesion">Insect Tarsus-Inspired Variable-Stiffness Adhesion for Extreme Space Manipulation</a></h3>
          <p>Yu Xiang, et al.</p>
          <p className="meta">Manuscript in preparation</p>
          </div>
        </article>
        <p className="small-note">† Equal contribution. * Corresponding author.</p>
      </section>

      <hr />

      <section className="simple-section" id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ProjectList />
      </section>

      <footer>
        <p>Last updated September 2026 · Beijing, China</p>
      </footer>
    </main>
  );
}
