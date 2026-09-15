import { notFound } from "next/navigation";
import { getProject, projects, publicationProjectIds, type Figure } from "../../project-data";
import { ProjectEvidence, EvidenceNavigation } from "../../project-evidence";
import { FormulaStudentDetail } from "../../formula-student-detail";
import { HoneybeeDetail } from "../../honeybee-detail";
import { OrigamiDetail } from "../../origami-detail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  if (project?.id === "origami-wall-climbing-robot") {
    return {
      title: "折纸式仿昆虫爬壁机器人 | 项宇",
      description: "折纸机身、四杆连杆腿、自适应踝与负压吸附足端的整机设计及加工装配。",
    };
  }
  if (project?.id === "honeybee-adhesion") {
    return {
      title: "极端环境可控黏附与蜜蜂爪垫界面力学 | 项宇",
      description: "蜜蜂足垫的结构形变、三相界面机制、仿生湿黏附设计及极端环境抓附研究。",
    };
  }
  if (project?.id === "formula-student") {
    return {
      title: "大学生方程式赛车设计与制造 | 项宇",
      description: "项宇在北京理工大学方程式车队的工程实践：轮胎与悬架机理、结构设计、制造装配、实车测试和团队协作。",
    };
  }
  return {
    title: project ? `${project.shortTitle} | Yu Xiang` : "Project not found | Yu Xiang",
    description: project?.summary,
  };
}

function ProjectFigure({ figure }: { figure: Figure }) {
  return (
    <figure className="project-figure">
      <a href={figure.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${figure.caption}`}>
        <img src={figure.src} alt={figure.caption} loading="lazy" />
      </a>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  if (project.id === "formula-student") return <FormulaStudentDetail />;
  if (project.id === "honeybee-adhesion") return <HoneybeeDetail />;
  if (project.id === "origami-wall-climbing-robot") return <OrigamiDetail />;
  const publication = publicationProjectIds.has(project.id);
  const homeAnchor = publication ? "/#publications" : "/#projects";
  const homeLabel = publication ? "Publications" : "Projects";
  const related = (project.related ?? []).flatMap((id) => {
    const item = getProject(id);
    return item ? [item] : [];
  });

  return (
    <main className="page project-page">
      <nav className="back-nav" aria-label="Breadcrumb"><a href={homeAnchor}>← Yu Xiang / {homeLabel}</a></nav>
      <header className="project-header">
        <p className="project-category">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="meta">{project.period}</p>
        <p>{project.role}</p>
        {project.authors && <p className="paper-authors">{project.authors.split(/(Jieliang Zhao|Yu Xiang)/).map((part, index) =>
          part === "Yu Xiang" ? <strong key={index}>{part}</strong> : part === "Jieliang Zhao" ?
            <a key={index} href="https://me.bit.edu.cn/szdw/jsml/zzgcx/jxsjjys/bssds18/011124976e4b4967affa67c6f99e2e19.htm" target="_blank" rel="noreferrer">{part}</a> : part
        )}</p>}
        {project.venue && <p className="meta">{project.venue}</p>}
        {project.authors?.includes("†") && <p className="meta">† Equal contribution. * Corresponding author.</p>}
        {project.funding && <p className="funding"><strong>Funding:</strong> {project.funding}</p>}
        {(project.paper || project.team) && <p className="project-resource-links">
          {project.paper && <a href={project.paper} target="_blank" rel="noreferrer">Read paper</a>}
          {project.team && <a href={project.team} target="_blank" rel="noreferrer">BIT Formula Student team</a>}
        </p>}
      </header>

      <EvidenceNavigation projectId={project.id} />

      <section className="project-overview" id="overview" aria-labelledby="question-heading">
        <h2 id="question-heading">Overview</h2>
        <p>{project.question}</p>
        {project.image && <div className="project-lead-figure"><ProjectFigure figure={project.image} /></div>}
      </section>

      <section className="project-contributions" id="contributions" aria-labelledby="contributions-heading">
        <h2 id="contributions-heading">My Work</h2>
        {project.work.map((item) => <div className="contribution" key={item.label}><h3>{item.label}</h3><p>{item.text}</p></div>)}
      </section>

      <ProjectEvidence projectId={project.id} />

      <section className="project-results" id="results" aria-labelledby="outcome-heading">
        <h2 id="outcome-heading">{project.category.includes("progress") || project.category.includes("preparation") ? "Current Status" : "Results"}</h2>
        <p>{project.outcome}</p>
      </section>

      {related.length > 0 && <section aria-labelledby="related-heading">
        <h2 id="related-heading">Related Research</h2>
        <ul className="related-projects">{related.map((item) => <li key={item.id}><a href={`/projects/${item.id}`}>{item.shortTitle}</a></li>)}</ul>
      </section>}

      <footer><a href={homeAnchor}>← Back to {homeLabel.toLowerCase()}</a><p>Yu Xiang · September 2026</p></footer>
    </main>
  );
}
