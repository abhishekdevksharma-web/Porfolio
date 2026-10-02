import { Link, useParams } from 'react-router-dom'
import { getProjectById, projects } from '../data/projects'
import { ProjectPreview } from '../components/projects/ProjectPreview'

function ProjectNotFound() {
  return (
    <main className="project-not-found container">
      <p className="eyebrow">PROJECT NOT FOUND</p>
      <h1>This project isn’t here.</h1>
      <Link className="button button-primary" to="/#projects">Back to all projects</Link>
    </main>
  )
}

export function ProjectDetails() {
  const { projectId } = useParams()
  const project = getProjectById(projectId)

  if (!project) return <ProjectNotFound />

  const projectIndex = projects.findIndex((item) => item.id === project.id)
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main className="project-detail-page">
      <section className={`project-detail-hero project-${project.type === 'Mobile' ? 'coral' : 'violet'}`}>
        <div className="container">
          <Link className="project-back-link" to="/#projects">← Back to featured projects</Link>
          <div className="project-detail-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{project.category}</p>
              <h1>{project.title}<span>.</span></h1>
              <p>{project.shortDescription}</p>
              <div className="project-stack">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <div className="project-actions project-detail-links">
                {project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noopener noreferrer">GitHub UI ↗</a>}
                {project.apiGithub && <a className="button button-secondary" href={project.apiGithub} target="_blank" rel="noopener noreferrer">GitHub API ↗</a>}
                {project.liveDemo && <a className="button button-primary" href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
              </div>
            </div>
            <div className="project-detail-preview project-visual">
              <div className="project-visual-grid" />
              <ProjectPreview project={project} />
            </div>
          </div>
        </div>
      </section>

      <div className={`container project-detail-content project-${project.type === 'Mobile' ? 'coral' : 'violet'}`}>
        <section className="detail-overview">
          <div>
            <p className="eyebrow">01 — OVERVIEW</p>
            <h2>Built to solve a<br /><span>real product problem.</span></h2>
          </div>
          <div className="detail-copy">
            <p>{project.description}</p>
            <h3>Purpose</h3>
            <p>{project.purpose}</p>
          </div>
        </section>

        <section className="detail-section">
          <p className="eyebrow">02 — WHAT IT DOES</p>
          <h2>Product <span>features</span></h2>
          <div className="detail-feature-grid">
            {project.features.map((feature, index) => (
              <article className="detail-feature" key={feature}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{feature}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-section detail-workflow-section">
          <div>
            <p className="eyebrow">03 — HOW IT FITS TOGETHER</p>
            <h2>Workflow &amp; <span>architecture</span></h2>
            <p className="detail-section-intro">A high-level view of the product flow and the systems it brings together.</p>
          </div>
          <ol className="detail-workflow">
            {project.workflow.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>
            ))}
          </ol>
        </section>

        <section className="detail-section detail-implementation-section">
          <div>
            <p className="eyebrow">04 — BUILD NOTES</p>
            <h2>What I <span>implemented</span></h2>
          </div>
          <div className="detail-build-columns">
            <div><h3>Implementation</h3><ul>{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Challenges</h3><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>

        <section className="detail-section">
          <p className="eyebrow">05 — PRODUCT PREVIEW</p>
          <h2>Interface <span>direction</span></h2>
          {project.screenshots.length > 0 ? (
            <div className="detail-screenshots">{project.screenshots.map((screenshot) => <img src={screenshot} alt={`${project.title} application screen`} key={screenshot} loading="lazy" />)}</div>
          ) : (
            <div className="detail-placeholder">Add your real project screenshots to <code>public/images/projects/{project.id}/</code> and list their paths in <code>src/data/projects.ts</code>.</div>
          )}
        </section>

        <nav className="project-pagination" aria-label="Other projects">
          {projectIndex > 0
            ? <Link to={`/projects/${previousProject.id}`}><span>← PREVIOUS PROJECT</span><strong>{previousProject.title}</strong></Link>
            : <Link to="/#projects"><span>← BACK TO PROJECTS</span><strong>All projects</strong></Link>}
          {projectIndex < projects.length - 1
            ? <Link to={`/projects/${nextProject.id}`}><span>NEXT PROJECT →</span><strong>{nextProject.title}</strong></Link>
            : <Link to="/#projects"><span>BACK TO PROJECTS →</span><strong>All projects</strong></Link>}
        </nav>
      </div>
    </main>
  )
}
