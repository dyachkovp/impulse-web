/**
 * Сессионное состояние пользователя.
 *
 * Живёт в памяти вкладки (простой event-based store, без Redux/Zustand).
 * При перезагрузке страницы состояние сбрасывается — пользователь
 * считается неавторизованным.
 */

export interface UserProfile {
  firstName: string
  lastName: string
  regionId: number | null
  region: string
  university: string
  about: string
  specializations: string[]
}

interface SessionState {
  /** true = прошёл онбординг и попадает сразу на /dashboard */
  isRegistered: boolean
  profile: UserProfile
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
  state = { isRegistered: false, profile: { ...defaultProfile } }
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
