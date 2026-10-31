import { projects, publicationProjectIds, type Project } from "./project-data";
import { AnimatedProjectCover } from "./animated-project-cover";
import { IconHeading, type HeadingIconName } from "./icon-heading";

const projectIcons: Record<string, HeadingIconName> = {
  "formula-student": "car",
  "parallel-waist": "mechanism",
  "insect-dexterous-grasping": "gripper",
  "honeybee-adhesion": "leaf",
  "origami-wall-climbing-robot": "fold",
};

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
        <IconHeading as="h3" icon={projectIcons[project.id] ?? "tools"}><a href={href}>{project.shortTitle}</a></IconHeading>
        <p className="meta">{[project.period, project.role].filter(Boolean).join(" · ")}</p>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}

export function ProjectList() {
  const featuredOrder = [
    "formula-student",
    "parallel-waist",
    "insect-dexterous-grasping",
    "honeybee-adhesion",
    "origami-wall-climbing-robot",
  ];
  const rank = (id: string) => {
    const index = featuredOrder.indexOf(id);
    return index === -1 ? featuredOrder.length : index;
  };
  const visibleProjects = projects
    .filter((project) => !publicationProjectIds.has(project.id))
    .sort((a, b) => rank(a.id) - rank(b.id));

  return (
    <div className="project-list">
      {visibleProjects.map((project) => <ProjectPreview project={project} key={project.id} />)}
    </div>
  );
}
