import { useState } from 'react'
import { projects, projectFilters, type ProjectCategory } from '../../data/projects'
import { ProjectFilter } from './ProjectFilter'
import { ProjectGrid } from './ProjectGrid'

type Filter = 'All' | ProjectCategory

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All')
  const visibleProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.categories.includes(filter))

  return (
    <section className="projects section-pad" id="projects">
      <div className="container">
        <div className="section-heading reveal">
          <span className="section-number">03</span>
          <div className="section-heading-copy">
            <p className="eyebrow"><span className="eyebrow-line" />Selected work</p>
            <h2>Featured <span>Projects.</span></h2>
            <p className="section-intro">Some of the applications I’ve designed and built.</p>
          </div>
        </div>
        <ProjectFilter filters={projectFilters} onSelect={setFilter} selected={filter} />
        <ProjectGrid projects={visibleProjects} />
      </div>
    </section>
  )
}
