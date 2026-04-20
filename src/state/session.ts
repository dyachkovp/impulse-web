/**
 * Сессионное состояние пользователя.
 *
 * Живёт в памяти вкладки (простой event-based store, без Redux/Zustand).
 * При перезагрузке страницы состояние сбрасывается — пользователь
 * считается неавторизованным.
 */

import type { Rating } from '../data/skills'
import type { Specialization } from '../data/projects'

export interface UserProfile {
  firstName: string
  lastName: string
  regionId: number | null
  region: string
  university: string
  about: string
  specializations: string[]
}

/**
 * Оценки самооценки: specialization → skill → 1..5.
 * Неоценённые навыки в карте отсутствуют.
 */
export type AssessmentStore = Record<string, Record<string, Exclude<Rating, null>>>

/**
 * Участие в команде проекта (студент — полноценный член команды).
 * Используется в проверке «нельзя подавать заявку на специализацию,
 * по которой уже участвуешь в другом проекте».
 */
export interface Participation {
  projectId: string
  specialization: Specialization
}

/** Поданная, но ещё не принятая/отклонённая заявка на вакансию. */
export interface Application {
  projectId: string
  vacancyId: string
  specialization: Specialization
  /** Дата подачи в формате DD.MM.YYYY — для отображения. */
  appliedAt: string
}

interface SessionState {
  /** true = прошёл онбординг и попадает сразу на /dashboard */
  isRegistered: boolean
  profile: UserProfile
  assessment: AssessmentStore
  /** Проекты, в которых студент — участник команды. */
  participations: Participation[]
  /** Поданные заявки на вакансии (без ответа куратора). */
  applications: Application[]
}

const defaultProfile: UserProfile = {
  firstName: 'Павел',
  lastName: 'Дьячков',
  regionId: null,
  region: '',
  university: '',
  about: '',
  specializations: [],
}

/**
 * Демо-участие: студент уже BackEnd в проекте p4 «Трекер аномалий физической
 * активности» (стадия прототипа). Это даёт видимую ветку логики блокировки
 * при попытке податься на BackEnd в другом проекте.
 */
const defaultParticipations: Participation[] = [
  { projectId: 'p4', specialization: 'BackEnd' },
]

let state: SessionState = {
  isRegistered: false,
  profile: { ...defaultProfile },
  assessment: {},
  participations: [...defaultParticipations],
  applications: [],
}

const listeners = new Set<() => void>()

export function getSession(): SessionState {
  return state
}

export function updateProfile(patch: Partial<UserProfile>) {
  state = { ...state, profile: { ...state.profile, ...patch } }
  listeners.forEach((l) => l())
}

export function completeOnboarding() {
  state = { ...state, isRegistered: true }
  listeners.forEach((l) => l())
}

export function resetSession() {
  state = {
    isRegistered: false,
    profile: { ...defaultProfile },
    assessment: {},
    participations: [...defaultParticipations],
    applications: [],
  }
  listeners.forEach((l) => l())
}

/* ─────────── Проекты: участия и заявки ─────────── */

/** Является ли студент участником другого проекта по этой специализации. */
export function isParticipatingAs(
  specialization: Specialization,
  excludeProjectId?: string,
): boolean {
  return state.participations.some(
    (p) =>
      p.specialization === specialization && p.projectId !== excludeProjectId,
  )
}

export function findParticipationBySpec(
  specialization: Specialization,
): Participation | undefined {
  return state.participations.find((p) => p.specialization === specialization)
}

export function findApplication(
  projectId: string,
  vacancyId: string,
): Application | undefined {
  return state.applications.find(
    (a) => a.projectId === projectId && a.vacancyId === vacancyId,
  )
}

/** Подать заявку на вакансию. Повторный вызов на уже поданную — no-op. */
export function submitApplication(
  projectId: string,
  vacancyId: string,
  specialization: Specialization,
) {
  if (findApplication(projectId, vacancyId)) return
  const application: Application = {
    projectId,
    vacancyId,
    specialization,
    appliedAt: formatDateToday(),
  }
  state = { ...state, applications: [...state.applications, application] }
  listeners.forEach((l) => l())
}

export function cancelApplication(projectId: string, vacancyId: string) {
  state = {
    ...state,
    applications: state.applications.filter(
      (a) => !(a.projectId === projectId && a.vacancyId === vacancyId),
    ),
  }
  listeners.forEach((l) => l())
}

function formatDateToday(): string {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${d.getFullYear()}`
}

export function getSkillRating(specialization: string, skill: string): Rating {
  return state.assessment[specialization]?.[skill] ?? null
}

/**
 * Ставит оценку навыку. Повторный клик по той же звезде (rating === текущее)
 * снимает оценку — это ожидается UX-ом из мобильного приложения.
 */
export function setSkillRating(
  specialization: string,
  skill: string,
  rating: Rating,
) {
  const specRatings = { ...(state.assessment[specialization] ?? {}) }
  if (rating === null) {
    delete specRatings[skill]
  } else {
    specRatings[skill] = rating
  }
  state = {
    ...state,
    assessment: { ...state.assessment, [specialization]: specRatings },
  }
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
