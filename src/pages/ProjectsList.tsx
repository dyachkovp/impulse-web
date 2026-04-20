import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Text, Container } from '@radix-ui/themes'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from '../components/Header'
import { Chips } from '../components/Chips'
import {
  projects,
  isVisibleToStudent,
  expandedVacancySlots,
  SPECIALIZATIONS,
  type Project,
  type Specialization,
} from '../data/projects'
import { getHypothesisById } from '../data/hypotheses'
import './ProjectsList.css'

type ProjectFilter = 'all' | Specialization

const FILTER_OPTIONS: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  ...SPECIALIZATIONS.map((s) => ({ value: s, label: s })),
]

export default function ProjectsList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const list = useMemo(() => {
    const visible = projects.filter(isVisibleToStudent)
    if (filter === 'all') return visible
    return visible.filter((p) =>
      p.vacancies.some((v) => v.specialization === filter),
    )
  }, [filter])

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <Header />

      <Container size="3" style={{ padding: '32px 24px 80px' }}>
        <Flex direction="column" gap="5">
          <Text size="2" color="gray">
            Проекты
          </Text>

          <Chips
            options={FILTER_OPTIONS}
            value={filter}
            onChange={setFilter}
            ariaLabel="Фильтр проектов по специализации"
          />

          <Flex direction="column" gap="4">
            {list.length === 0 ? (
              <div className="projects-empty">
                Нет проектов по этому фильтру
              </div>
            ) : (
              list.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onOpen={() => navigate(`/projects/${p.id}`)}
                  onOpenHypothesis={() =>
                    navigate(`/hypotheses/${p.hypothesisId}`)
                  }
                />
              ))
            )}
          </Flex>
        </Flex>
      </Container>
    </div>
  )
}

interface CardProps {
  project: Project
  onOpen: () => void
  onOpenHypothesis: () => void
}

function ProjectCard({ project, onOpen, onOpenHypothesis }: CardProps) {
  const hypothesis = getHypothesisById(project.hypothesisId)
  const slotChips = expandedVacancySlots(project)

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen()
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      className="project-list-card"
      onClick={onOpen}
      onKeyDown={handleKey}
    >
      {hypothesis && (
        <button
          type="button"
          className="project-list-hypothesis-link"
          onClick={(e) => {
            e.stopPropagation()
            onOpenHypothesis()
          }}
        >
          {hypothesis.title}
        </button>
      )}

      <div className="project-list-title">{project.title}</div>
      <div className="project-list-desc">{project.shortDescription}</div>

      <div className="project-list-status">
        <span className="project-status-badge project-status-forming">
          {project.status}
        </span>
      </div>

      <div className="project-list-footer">
        <div className="project-list-slot-chips">
          {slotChips.map((spec, i) => (
            <span key={i} className="project-slot-chip">
              {spec}
            </span>
          ))}
        </div>
        <span className="project-list-cta">
          К проекту
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  )
}
