import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-${project.type === 'Mobile' ? 'coral' : 'violet'} reveal`}>
      <div className="project-visual">
        <div className="project-visual-grid" />
        <ProjectPreview project={project} />
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-info">
        <p className="eyebrow"><span className="eyebrow-line" />{project.category}</p>
        <h3>{project.title}<span className="project-title-dot">.</span></h3>
        <p className="project-short-description">{project.shortDescription}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-stack">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
        <div className="project-actions">
          <Link
            className={`project-detail-button inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
              project.type === 'Mobile' ? 'text-rose-100 hover:text-rose-400' : 'text-violet-100 hover:text-violet-300'
            }`}
            to={`/projects/${project.id}`}
          >
            View Details <span aria-hidden="true">↗</span>
          </Link>
          {project.github && <a className="project-link-placeholder" href={project.github} target="_blank" rel="noopener noreferrer">GitHub UI ↗</a>}
          {project.apiGithub && <a className="project-link-placeholder" href={project.apiGithub} target="_blank" rel="noopener noreferrer">GitHub API ↗</a>}
          {project.liveDemo && <a className="project-link-placeholder" href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
        </div>
      </div>
    </article>
  )
}
