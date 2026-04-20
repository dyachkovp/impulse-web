import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Heading, Button } from '@radix-ui/themes'
import {
  ArrowRightIcon,
  ChevronDownIcon,
  StarFilledIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import OnboardingHeader from '../components/OnboardingHeader'
import {
  findSpecialization,
  countSkills,
  getRatingLabel,
  type Rating,
  type SkillGroup,
  type Specialization,
} from '../data/skills'
import {
  getSession,
  getSkillRating,
  setSkillRating,
  completeOnboarding,
  subscribe,
} from '../state/session'
import './OnboardingAssessment.css'

function useSession() {
  return useSyncExternalStore(subscribe, getSession, getSession)
}

function groupProgress(spec: string, group: SkillGroup) {
  let rated = 0
  let sum = 0
  for (const skill of group.skills) {
    const r = getSkillRating(spec, skill)
    if (r != null) {
      rated += 1
      sum += r
    }
  }
  const avg = rated === group.skills.length && rated > 0 ? sum / rated : null
  return { rated, total: group.skills.length, avg }
}

function formatAvg(avg: number): string {
  // "2,8" — русская запятая, один знак после
  return avg.toFixed(1).replace('.', ',')
}

export default function OnboardingAssessment() {
  const navigate = useNavigate()
  const session = useSession()
  const specName = session.profile.specializations[0] ?? ''

  const spec: Specialization | undefined = useMemo(
    () => findSpecialization(specName),
    [specName],
  )

  // Первая группа раскрыта по умолчанию — как в референсе Figma.
  const [openGroup, setOpenGroup] = useState<string | null>(
    spec?.groups[0]?.group ?? null,
  )

  // Ручной клик по хедеру группы отключает автопереход на весь сеанс:
  // дальше пользователь сам управляет, какая группа раскрыта.
  const [autoAdvanceDisabled, setAutoAdvanceDisabled] = useState(false)

  const handleHeaderClick = (groupName: string) => {
    setAutoAdvanceDisabled(true)
    setOpenGroup((prev) => (prev === groupName ? null : groupName))
  }

  // Автопереход при 100%-заполненной группе: через 1 секунду схлопнуть
  // текущую и раскрыть следующую (последнюю — просто схлопнуть).
  useEffect(() => {
    if (autoAdvanceDisabled || !spec || !openGroup) return
    const idx = spec.groups.findIndex((g) => g.group === openGroup)
    if (idx === -1) return
    const group = spec.groups[idx]
    const { rated, total } = groupProgress(specName, group)
    if (total > 0 && rated === total) {
      const next = spec.groups[idx + 1]
      const timer = setTimeout(
        () => setOpenGroup(next ? next.group : null),
        1000,
      )
      return () => clearTimeout(timer)
    }
    // `session.assessment` в зависимостях — чтобы эффект перезапускался
    // при изменении оценок.
  }, [session.assessment, spec, specName, openGroup, autoAdvanceDisabled])

  if (!spec) {
    // Нет специализации — возвращаем на предыдущий шаг онбординга.
    navigate('/onboarding/specialization', { replace: true })
    return null
  }

  const totalSkills = countSkills(spec)
  const ratedTotal = spec.groups.reduce(
    (n, g) => n + groupProgress(specName, g).rated,
    0,
  )
  const percent = totalSkills === 0 ? 0 : Math.round((ratedTotal / totalSkills) * 100)
  const allRated = totalSkills > 0 && ratedTotal === totalSkills

  const handleContinue = () => {
    completeOnboarding()
    navigate('/dashboard')
  }

  const handleSkip = () => {
    completeOnboarding()
    navigate('/dashboard')
  }

  return (
    <Flex direction="column" style={{ minHeight: '100vh', background: '#fff' }}>
      <OnboardingHeader />

      <Flex justify="center" style={{ flex: 1, padding: '48px 24px 80px' }}>
        <Flex direction="column" gap="5" style={{ width: '100%', maxWidth: 640 }}>
          <Flex align="center" justify="between" gap="3" wrap="wrap">
            <Heading size="7" weight="bold">
              Оцени свои компетенции
            </Heading>
            <span className="assessment-spec-badge">{specName}</span>
          </Flex>

          <div
            className="assessment-progress-track"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Заполнено ${ratedTotal} из ${totalSkills}`}
          >
            <div
              className="assessment-progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div>
            {spec.groups.map((group) => {
              const isOpen = openGroup === group.group
              const { avg } = groupProgress(specName, group)
              return (
                <div key={group.group} className="assessment-group">
                  <button
                    type="button"
                    className="assessment-group-header"
                    onClick={() => handleHeaderClick(group.group)}
                  >
                    <span className="assessment-group-title">
                      {group.group}
                      <ChevronDownIcon
                        className="assessment-group-chevron"
                        data-open={isOpen}
                      />
                    </span>
                    <span className="assessment-group-right">
                      {avg != null ? (
                        <span className="assessment-group-avg">
                          <StarFilledIcon width="14" height="14" />
                          {formatAvg(avg)}
                        </span>
                      ) : (
                        !isOpen && (
                          <span
                            className="assessment-group-rate-btn"
                            aria-hidden="true"
                          >
                            <StarIcon width="14" height="14" />
                            Оценить
                          </span>
                        )
                      )}
                    </span>
                  </button>

                  <div
                    className="assessment-group-collapse"
                    data-open={isOpen}
                  >
                    <div className="assessment-group-collapse-inner">
                      <div className="assessment-group-body">
                        {group.skills.map((skill) => (
                          <SkillRow
                            key={skill}
                            specialization={specName}
                            skill={skill}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Flex direction="column" align="center" gap="3" mt="4">
            <Button size="4" highContrast onClick={handleContinue}>
              Сохранить и продолжить
              <ArrowRightIcon />
            </Button>
            <button
              type="button"
              className="assessment-later-link"
              data-hidden={allRated}
              aria-hidden={allRated}
              tabIndex={allRated ? -1 : 0}
              onClick={handleSkip}
            >
              Оценить позже
            </button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface SkillRowProps {
  specialization: string
  skill: string
}

function SkillRow({ specialization, skill }: SkillRowProps) {
  const rating = getSkillRating(specialization, skill)
  const [hover, setHover] = useState<Exclude<Rating, null> | null>(null)

  // При наведении на звезду показываем её лейбл — даже если уже есть оценка.
  const displayValue = hover ?? rating
  const label = getRatingLabel(displayValue)

  const handleStarClick = (value: Exclude<Rating, null>) => {
    // Оценку нельзя снять кликом — только изменить.
    setSkillRating(specialization, skill, value)
  }

  return (
    <div className="assessment-skill-row">
      <div className="assessment-skill-name">{skill}</div>
      <div className="assessment-skill-right">
        <div
          className="assessment-stars"
          role="radiogroup"
          aria-label={skill}
          onMouseLeave={() => setHover(null)}
        >
          {[1, 2, 3, 4, 5].map((v) => {
            const value = v as Exclude<Rating, null>
            const filled = displayValue != null && displayValue >= value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value}`}
                className="assessment-star"
                data-filled={filled}
                onMouseEnter={() => setHover(value)}
                onFocus={() => setHover(value)}
                onBlur={() => setHover(null)}
                onClick={() => handleStarClick(value)}
              >
                {filled ? (
                  <StarFilledIcon width="20" height="20" />
                ) : (
                  <StarIcon width="20" height="20" />
                )}
              </button>
            )
          })}
        </div>
        <div className="assessment-skill-label">{label}</div>
      </div>
    </div>
  )
}
