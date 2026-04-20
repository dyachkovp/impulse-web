import { useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Flex, Container, Dialog, Button } from '@radix-ui/themes'
import Header from '../components/Header'
import {
  getProjectById,
  countOpenSlots,
  type Project,
  type ProjectMember,
  type ProjectVacancy,
  type Specialization,
} from '../data/projects'
import { getHypothesisById } from '../data/hypotheses'
import {
  getSession,
  subscribe,
  findApplication,
  findParticipationBySpec,
  submitApplication,
  cancelApplication,
} from '../state/session'
import './ProjectDetail.css'

function useSession() {
  return useSyncExternalStore(subscribe, getSession, getSession)
}

interface BlockInfo {
  specialization: Specialization
  blockingProjectTitle: string
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = id ? getProjectById(id) : undefined
  // Подписка на сессию — чтобы перерисовать строки вакансий, когда
  // меняется список поданных заявок.
  useSession()
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null)

  useEffect(() => {
    if (!project) navigate('/projects', { replace: true })
  }, [project, navigate])

  if (!project) return null

  const hypothesis = getHypothesisById(project.hypothesisId)
  const showVacancies =
    project.status === 'Формирование команды' && countOpenSlots(project) > 0

  const handleApplyClick = (v: ProjectVacancy) => {
    // Блокировка: студент уже участник другого проекта по этой же специализации.
    const participation = findParticipationBySpec(v.specialization)
    if (participation && participation.projectId !== project.id) {
      const blockingProject = getProjectById(participation.projectId)
      setBlockInfo({
        specialization: v.specialization,
        blockingProjectTitle: blockingProject?.title ?? '(другой проект)',
      })
      return
    }
    submitApplication(project.id, v.id, v.specialization)
  }

  const handleCancel = (v: ProjectVacancy) => {
    cancelApplication(project.id, v.id)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <Header />

      <Container size="3" style={{ padding: '32px 24px 80px' }}>
        <Flex direction="column" gap="4">
          <div className="project-breadcrumb">
            <button
              type="button"
              className="project-breadcrumb-link"
              onClick={() => navigate('/projects')}
            >
              Проекты
            </button>
            <span className="project-breadcrumb-separator">›</span>
            <span className="project-breadcrumb-current">{project.title}</span>
          </div>

          {/* ── «О проекте» ── */}
          <article className="project-card-box">
            <span
              className={`project-status-badge ${statusClass(project.status)}`}
            >
              {project.status}
            </span>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-desc">{project.description}</p>

            <div className="project-meta">
              <MetaRow label="Куратор" value={project.curator} />
              <MetaRow
                label="Гипотеза"
                value={
                  hypothesis ? (
                    <button
                      type="button"
                      className="project-meta-link"
                      onClick={() =>
                        navigate(`/hypotheses/${project.hypothesisId}`)
                      }
                    >
                      {hypothesis.title}
                    </button>
                  ) : (
                    '—'
                  )
                }
              />
              <MetaRow label="Старт проекта" value={project.startDate} />
              <MetaRow label="Завершение работ" value={project.endDate} />
            </div>
          </article>

          {/* ── «Команда» ── */}
          <article className="project-card-box">
            <h2 className="project-section-title">Команда проекта</h2>

            {project.members.length > 0 && (
              <div className="project-members-list">
                {project.members.map((m, i) => (
                  <MemberRow key={i} member={m} />
                ))}
              </div>
            )}

            {showVacancies && (
              <>
                <h3 className="project-subsection-title">
                  В команду требуются:
                </h3>
                <div className="project-vacancies-list">
                  {project.vacancies.map((v) => {
                    const app = findApplication(project.id, v.id)
                    return (
                      <VacancyRow
                        key={v.id}
                        vacancy={v}
                        applied={!!app}
                        onApply={() => handleApplyClick(v)}
                        onCancel={() => handleCancel(v)}
                      />
                    )
                  })}
                </div>
              </>
            )}

            {project.members.length === 0 && !showVacancies && (
              <div className="project-team-empty">
                Команда не сформирована.
              </div>
            )}
          </article>
        </Flex>
      </Container>

      <Dialog.Root
        open={!!blockInfo}
        onOpenChange={(open) => !open && setBlockInfo(null)}
      >
        <Dialog.Content maxWidth="460px">
          <Dialog.Title>Нельзя отправить заявку</Dialog.Title>
          <Dialog.Description size="2" mb="3">
            {blockInfo && (
              <>
                Вы уже участник проекта{' '}
                <strong>«{blockInfo.blockingProjectTitle}»</strong> по
                специализации <strong>{blockInfo.specialization}</strong>. На
                одну и ту же специализацию можно податься только в один проект.
              </>
            )}
          </Dialog.Description>
          <Flex justify="end">
            <Dialog.Close>
              <Button variant="solid">Понятно</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}

function statusClass(status: Project['status']): string {
  switch (status) {
    case 'Формирование команды':
      return 'project-status-forming'
    case 'Работа над прототипом':
      return 'project-status-prototype'
    case 'Завершён':
      return 'project-status-done'
  }
}

function MetaRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="project-meta-row">
      <div className="project-meta-label">{label}</div>
      <div className="project-meta-value">{value}</div>
    </div>
  )
}

function MemberRow({ member }: { member: ProjectMember }) {
  return (
    <div className="project-member">
      <div
        className="project-member-avatar"
        style={{ background: avatarColor(member.name) }}
      >
        {initials(member.name)}
      </div>
      <div className="project-member-info">
        <div className="project-member-name">{member.name}</div>
        <div className="project-member-uni">{member.university}</div>
      </div>
      <span className="project-member-spec">{member.specialization}</span>
    </div>
  )
}

interface VacancyRowProps {
  vacancy: ProjectVacancy
  applied: boolean
  onApply: () => void
  onCancel: () => void
}

function VacancyRow({ vacancy, applied, onApply, onCancel }: VacancyRowProps) {
  const countSuffix =
    vacancy.count > 1 ? ` · ${vacancy.count} ${peopleWord(vacancy.count)}` : ''
  return (
    <div className="project-vacancy">
      <div className="project-vacancy-text">
        <div className="project-vacancy-spec">
          {vacancy.specialization}
          {countSuffix}
        </div>
        {applied && (
          <div className="project-vacancy-state">Заявка отправлена</div>
        )}
      </div>
      {applied ? (
        <button
          type="button"
          className="project-vacancy-btn project-vacancy-btn-text"
          onClick={onCancel}
        >
          Отменить
        </button>
      ) : (
        <button
          type="button"
          className="project-vacancy-btn project-vacancy-btn-primary"
          onClick={onApply}
        >
          Отправить заявку
        </button>
      )}
    </div>
  )
}

/* ─────────── Утилиты отображения ─────────── */

function peopleWord(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'место'
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'места'
  return 'мест'
}

function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/**
 * Стабильный цвет аватара от имени — hash → hue.
 * Saturation/lightness фиксированные, чтобы не выбиваться из фирменной палитры.
 */
function avatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  const hue = hash % 360
  return `hsl(${hue}, 55%, 78%)`
}
