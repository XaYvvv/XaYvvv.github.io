import { projects, publicationProjectIds, type Project } from "./project-data";
import { AnimatedProjectCover } from "./animated-project-cover";

function ProjectPreview({ project }: { project: Project }) {
  const href = `/projects/${project.id}`;
  return (
    <article className={`project project-preview${project.image ? "" : " project-text-only"}`} id={project.id}>
      {project.animatedCover ? (
        <AnimatedProjectCover cover={project.animatedCover} href={href} title={project.shortTitle} />
      ) : project.image && (
        <a className="project-thumbnail" href={href} aria-label={`Read project: ${project.shortTitle}`}>
          <img src={project.image.src} alt={project.image.caption} loading="lazy" />
        </a>
      )}
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3><a href={href}>{project.shortTitle}</a></h3>
        <p className="meta">{project.period} · {project.role}</p>
        <p>{project.summary}</p>
        <p className="project-links"><a href={href}>Project details →</a></p>
      </div>
    </article>
  );
}

export function ProjectList() {
  const visibleProjects = projects
    .filter((project) => !publicationProjectIds.has(project.id))
    .sort((a, b) =>
      Number(b.id === "insect-dexterous-grasping") - Number(a.id === "insect-dexterous-grasping")
    );

  return (
    <div className="project-list">
      {visibleProjects.map((project) => <ProjectPreview project={project} key={project.id} />)}
    </div>
  );
}
