import { useMemo, useState, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Text, Container } from '@radix-ui/themes'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from '../components/Header'
import { Chips } from '../components/Chips'
import {
  projects,
  isVisibleToStudent,
  rankOpenSpecializationsForCard,
  SPECIALIZATIONS,
  type Project,
  type Specialization,
} from '../data/projects'
import { getHypothesisById } from '../data/hypotheses'
import {
  getSession,
  subscribe,
  getAssessedSpecializations,
  getParticipatingSpecializations,
} from '../state/session'
import './ProjectsList.css'

function useSession() {
  return useSyncExternalStore(subscribe, getSession, getSession)
}

type ProjectFilter = 'all' | Specialization

const FILTER_OPTIONS: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  ...SPECIALIZATIONS.map((s) => ({ value: s, label: s })),
]

export default function ProjectsList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<ProjectFilter>('all')
  // Подписка на сессию — чтобы перерисовать приоритет чипов при изменении
  // самооценки или участий. Само значение не используется: берём производные
  // множества напрямую после форс-рендера.
  useSession()
  const assessedSpecs = getAssessedSpecializations()
  const participatingSpecs = getParticipatingSpecializations()

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
                  assessedSpecs={assessedSpecs}
                  participatingSpecs={participatingSpecs}
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
  assessedSpecs: ReadonlySet<string>
  participatingSpecs: ReadonlySet<string>
  onOpen: () => void
  onOpenHypothesis: () => void
}

function ProjectCard({
  project,
  assessedSpecs,
  participatingSpecs,
  onOpen,
  onOpenHypothesis,
}: CardProps) {
  const hypothesis = getHypothesisById(project.hypothesisId)
  const { shown, hiddenCount } = rankOpenSpecializationsForCard(project, {
    assessedSpecs,
    participatingSpecs,
  })

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

      <div className="project-list-footer">
        <span className="project-status-badge project-status-forming">
          {project.status}
        </span>
        <div className="project-list-slot-chips">
          {shown.map((spec) => (
            <span key={spec} className="project-slot-chip">
              {spec}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="project-slot-chip-overflow">
              ещё {hiddenCount}…
            </span>
          )}
        </div>
        <span className="project-list-cta">
          К проекту
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  )
}
