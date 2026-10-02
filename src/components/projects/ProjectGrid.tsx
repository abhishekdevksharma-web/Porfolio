import type { Project } from '../../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="project-empty">No projects in this category yet.</p>
  }

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <ProjectCard index={index} key={project.id} project={project} />
      ))}
    </div>
  )
}
