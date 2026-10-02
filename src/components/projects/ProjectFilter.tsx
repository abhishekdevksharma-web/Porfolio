import type { ProjectCategory } from '../../data/projects'

type Filter = 'All' | ProjectCategory

export function ProjectFilter({
  filters,
  selected,
  onSelect,
}: {
  filters: Filter[]
  selected: Filter
  onSelect: (filter: Filter) => void
}) {
  return (
    <div className="project-filters" role="group" aria-label="Filter projects">
      {filters.map((filter) => (
        <button
          aria-pressed={selected === filter}
          className={`project-filter rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
            selected === filter
              ? 'border-rose-400/40 bg-rose-500/10 text-rose-300'
              : 'border-white/10 bg-white/[0.025] text-zinc-400'
          } hover:bg-white/[0.06] hover:text-white`}
          key={filter}
          onClick={() => onSelect(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
