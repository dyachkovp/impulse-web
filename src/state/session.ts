/**
 * Сессионное состояние пользователя.
 *
 * Живёт в памяти вкладки (простой event-based store, без Redux/Zustand).
 * При перезагрузке страницы состояние сбрасывается — пользователь
 * считается неавторизованным.
 */

import type { Rating } from '../data/skills'

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

interface SessionState {
  /** true = прошёл онбординг и попадает сразу на /dashboard */
  isRegistered: boolean
  profile: UserProfile
  assessment: AssessmentStore
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

let state: SessionState = {
  isRegistered: false,
  profile: { ...defaultProfile },
  assessment: {},
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
  state = { isRegistered: false, profile: { ...defaultProfile }, assessment: {} }
  listeners.forEach((l) => l())
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
