import { ProjectList } from "./projects";
import { Timeline } from "./timeline";
import { newsItems } from "./news-data";
import { SectionNav } from "./section-nav";
import { HeadingIcon, IconHeading } from "./icon-heading";

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
    linkAdvisor: false,
    venue: "Advanced Science, 2026 · First student author · JCR Q1 · IF 14.1",
    image: "/research/optimized/patch-architecture.webp",
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
    image: "/research/optimized/hybrid-adhesive-design.webp",
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
    linkAdvisor: false,
    venue: "Biomimetics, 2024 · JCR Q1",
    image: "/research/gallery/PDF-16-Im0-preview.webp",
    alt: "Electrohydraulic soft robot architecture and bioinspired friction pads",
    details: "/projects/worm-like-soft-robot",
    summary:
      "A soft crawling robot combining controllable electrohydraulic actuation with bioinspired contact structures derived from tree-frog and honeybee footpads.",
    href: "https://www.mdpi.com/2313-7673/9/12/776",
  },
];

function LinkedAuthors({ text, linkAdvisor = true }: { text: string; linkAdvisor?: boolean }) {
  return (
    <>
      {text.split(/(Jieliang Zhao|Yu Xiang)/).map((part, index) => {
        if (part === "Jieliang Zhao" && linkAdvisor) {
          return (
            <a key={index} href={links.advisor} target="_blank" rel="noreferrer">
              {part}
            </a>
          );
        }

        if (part === "Yu Xiang") {
          return <u key={index}>{part}</u>;
        }

        return part;
      })}
    </>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <h1 className="site-brand">
            <a href="#" aria-label="Yu Xiang — back to top">Yu Xiang <span>「项宇」</span></a>
          </h1>
          <SectionNav />
        </div>
      </header>
      <main className="page home-page">

      <section className="bio content-panel" id="about" aria-labelledby="about-heading">
        <aside>
          <img className="portrait" src="/portrait-outdoors.webp" alt="Portrait of Yu Xiang" width="640" height="854" fetchPriority="high" decoding="async" />
          <p className="profile-role">Mechanical Engineering<br />Bioinspired Robotics</p>
          <nav className="profile-links" aria-label="Profile links">
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
          <IconHeading id="about-heading" icon="person">About</IconHeading>
          <p>
            I am a master&apos;s student in Mechanical Engineering at{" "}
            <a href={links.bit} target="_blank" rel="noreferrer">
              Beijing Institute of Technology
            </a>, supervised by{" "}
            <a href={links.advisor} target="_blank" rel="noreferrer">
              Prof. Jieliang Zhao
            </a> in BIB Lab.
          </p>
          <p>
            My research focuses on bioinspired adhesion, soft robotics and
            dexterous manipulation.
          </p>
          <p>
            I am currently seeking mechanical engineering roles in robotics,
            consumer electronics, medical devices and related fields. Please{" "}
            <a href="mailto:xyu8468@gmail.com">get in touch</a> to discuss opportunities.
          </p>
          <p className="contact-line">
            <HeadingIcon name="email" />
            <span>Email: <a href="mailto:xyu8468@gmail.com">xyu8468@gmail.com</a></span>
          </p>
          <p className="contact-line"><HeadingIcon name="wechat" /><span>Wechat：XYv6626</span></p>
        </div>
        <Timeline />
      </section>

      <section className="simple-section content-panel" id="publications" aria-labelledby="publications-heading">
        <IconHeading id="publications-heading" icon="book">Publications</IconHeading>
        <div className="entry-list">
          {publications.map((paper) => (
            <article className="entry publication" key={paper.title}>
              <a className="publication-cover" href={paper.details} aria-label={`Research details: ${paper.title}`}>
                <img src={paper.image} alt={paper.alt} loading="lazy" />
              </a>
              <div className="entry-body">
                <h3>
                  <a className="publication-title-link" href={paper.href} target="_blank" rel="noreferrer">
                    {paper.title}{" "}<span className="publication-link-hint">link <span aria-hidden="true">↗</span></span>
                  </a>
                </h3>
                <p><LinkedAuthors text={paper.authors} linkAdvisor={paper.linkAdvisor} /></p>
                <p className="venue">{paper.venue}</p>
                <p>{paper.summary}</p>
              </div>
            </article>
          ))}
        </div>
        <article className="entry publication manuscript-entry">
          <div className="publication-cover">
            <img src="/research/gallery/PDF-22-Im0-preview.webp" alt="Insect tarsal attachment and detachment sequence" loading="lazy" />
          </div>
          <div className="entry-body">
          <h3>Insect Tarsus-Inspired Variable-Stiffness Adhesion for Extreme Space Manipulation</h3>
          <p><u>Yu Xiang</u>, et al.</p>
          <p className="meta">Manuscript in preparation</p>
          </div>
        </article>
      </section>

      <section className="simple-section content-panel" id="projects" aria-labelledby="projects-heading">
        <IconHeading id="projects-heading" icon="tools">Projects</IconHeading>
        <ProjectList />
      </section>

      <section className="simple-section content-panel" id="news" aria-labelledby="news-heading">
        <IconHeading id="news-heading" icon="media">Media &amp; Activities</IconHeading>
        <ul className="dated-list news-list">
          {newsItems.map((item) => (
            <li key={item.href}>
              <span>
                {item.publishedAt ? (
                  <time dateTime={item.publishedAt}>{item.publishedAt}</time>
                ) : "日期待核实"}
              </span>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <p>Last updated October 2026 · Beijing, China</p>
      </footer>
    </main>
    </>
  );
}
