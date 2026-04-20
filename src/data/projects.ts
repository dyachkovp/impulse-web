/**
 * Проекты в рамках гипотез.
 *
 * Источник моков — прототип мобильного приложения (impulse-app). Тут
 * нормализовано под веб-таксономию специализаций из чип-фильтра списка
 * проектов (см. `Specialization`).
 *
 * Бизнес-правила, отражённые в хелперах:
 * - Студент видит в списке только проекты в статусе «Формирование команды»
 *   и только те, где есть хотя бы одно открытое место (см. `isVisibleToStudent`).
 * - Детальная страница в стадии «Формирование команды» показывает
 *   разделы «О проекте» и «Команда» (правило применяется на уровне UI).
 */

/**
 * Канонический набор специализаций.
 *
 * Источник правды — `SPECIALIZATION_ORDER` из `data/skills.ts`: те же
 * названия используются в онбординге, самооценке, фильтрах и вакансиях.
 * Порядок здесь совпадает с порядком в онбординге (более распространённые
 * специализации идут первыми).
 */
export type Specialization =
  | 'Backend'
  | 'Frontend'
  | 'System Analyst'
  | 'QA'
  | 'Product Owner'
  | 'Business Analyst'
  | 'Designer'

export const SPECIALIZATIONS: Specialization[] = [
  'Backend',
  'Frontend',
  'System Analyst',
  'QA',
  'Product Owner',
  'Business Analyst',
  'Designer',
]

export type ProjectStatus =
  | 'Формирование команды'
  | 'Работа над прототипом'
  | 'Завершён'

export interface ProjectMember {
  name: string
  specialization: Specialization
  university: string
}

export interface ProjectVacancy {
  id: string
  specialization: Specialization
  /** Количество открытых мест по специализации. */
  count: number
}

export interface Project {
  id: string
  /** ID связанной гипотезы (`Hypothesis.id`). */
  hypothesisId: number
  title: string
  description: string
  shortDescription: string
  status: ProjectStatus
  curator: string
  startDate: string
  endDate: string
  members: ProjectMember[]
  vacancies: ProjectVacancy[]
}

export const projects: Project[] = [
  {
    id: 'p1',
    hypothesisId: 5,
    title: 'GraphRAG в ЦПФ',
    description:
      'Фармацевт цифровой аптеки в режиме чата консультирует клиентов по различным вопросам, связанным с лекарственными препаратами, которыми торгует аптека. Для оптимизации работы фармацевта ему предоставлен инструмент в виде цифрового помощника, реализованного в парадигме RAG. Узким местом классического RAG является обработка запросов с большим количеством параметров.',
    shortDescription:
      'Обогащение LLM знаниями из корпоративной графовой базы знаний ЦПФ для точных ответов.',
    status: 'Формирование команды',
    curator: 'ЧЕРМЕНИН АРТЕМ НИКОЛАЕВИЧ',
    startDate: '31.03.2026',
    endDate: '29.09.2026',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 2 },
      { id: 'v2', specialization: 'Frontend', count: 2 },
      { id: 'v3', specialization: 'System Analyst', count: 2 },
    ],
  },
  {
    id: 'p2',
    hypothesisId: 8,
    title: 'Система генетического риск-анализа и профилирования',
    description:
      'Определение предрасположенностей пользователя к различным заболеваниям и возможным медицинским проблемам на основе анализа анамнеза семьи, данных ДНК-тестов и образа жизни. Платформа строит персональные рекомендации по снижению рисков и интегрируется с лабораторными партнёрами и кабинетами врачей-генетиков.',
    shortDescription:
      'Определение предрасположенностей пользователя к различным заболеваниям и возможным медицинским проблемам на основе анализа анамнеза семьи, данных ДНК-тестов и…',
    status: 'Формирование команды',
    curator: 'БЕЛОЗЁРОВ ПАВЕЛ АНДРЕЕВИЧ',
    startDate: '01.10.2025',
    endDate: '15.01.2026',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 2 },
      { id: 'v2', specialization: 'Frontend', count: 2 },
      { id: 'v3', specialization: 'System Analyst', count: 2 },
    ],
  },
  {
    id: 'p3',
    hypothesisId: 9,
    title: 'Решение для повышения операционной эффективности частной клиники',
    description:
      'Повышение операционной эффективности и управляемости частными клиниками за счёт внедрения специализированных решений, ассистентов и моделей, автоматизирующих потоки пациентов, расписание врачей и сбор операционных метрик.',
    shortDescription:
      'Повышение операционной эффективности и управляемости частными клиниками за счёт внедрения специализированных решений, ассистентов и моделей, автоматизирующих…',
    status: 'Формирование команды',
    curator: 'ОРЛОВА АННА СЕРГЕЕВНА',
    startDate: '20.09.2025',
    endDate: '25.12.2025',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'System Analyst', count: 2 },
      { id: 'v2', specialization: 'Backend', count: 3 },
      { id: 'v3', specialization: 'Frontend', count: 2 },
    ],
  },
  {
    id: 'p4',
    hypothesisId: 6,
    title: 'Трекер аномалий физической активности',
    description:
      'Сервис собирает данные с носимых устройств, выявляет отклонения в режиме физической активности пациента и уведомляет лечащего врача. Сейчас ведётся работа над MVP для iOS и Android.',
    shortDescription:
      'Сервис для выявления аномалий физической активности пациентов по данным с носимых устройств.',
    status: 'Работа над прототипом',
    curator: 'МЕЛЬНИКОВ ДМИТРИЙ ОЛЕГОВИЧ',
    startDate: '10.09.2025',
    endDate: '15.12.2025',
    members: [
      { name: 'Петров Александр Михайлович', specialization: 'Backend', university: 'НИУ ВШЭ' },
      { name: 'Соколова Мария Дмитриевна', specialization: 'Frontend', university: 'МГУ им. М.В. Ломоносова' },
      { name: 'Кузнецов Иван Алексеевич', specialization: 'QA', university: 'МФТИ' },
    ],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 2 },
      { id: 'v2', specialization: 'Frontend', count: 1 },
      { id: 'v3', specialization: 'QA', count: 1 },
    ],
  },
  {
    id: 'p5',
    hypothesisId: 2,
    title: 'Анализатор питания по фото',
    description:
      'Мобильное приложение, которое по фотографии блюда определяет состав, калорийность и ведёт дневник питания пользователя. Используется CV-модель и база продуктов партнёра.',
    shortDescription:
      'Мобильный сервис для анализа ежедневного рациона пользователя по фотографиям блюд.',
    status: 'Работа над прототипом',
    curator: 'ГРИГОРЬЕВ НИКОЛАЙ ПЕТРОВИЧ',
    startDate: '05.10.2025',
    endDate: '10.01.2026',
    members: [
      { name: 'Волкова Екатерина Сергеевна', specialization: 'Backend', university: 'СПбГУ' },
      { name: 'Новиков Артём Павлович', specialization: 'Designer', university: 'НИУ ВШЭ' },
    ],
    vacancies: [
      { id: 'v1', specialization: 'Frontend', count: 2 },
    ],
  },
  {
    id: 'p6',
    hypothesisId: 7,
    title: 'Фотоанализатор прогресса похудения',
    description:
      'Мобильное приложение для отслеживания прогресса похудения по серии фотографий. Система автоматически измеряет изменения фигуры пользователя и строит график динамики.',
    shortDescription:
      'Автоматическое отслеживание прогресса похудения по серии фотографий пользователя.',
    status: 'Формирование команды',
    curator: 'КОВАЛЁВ АРТЁМ ВИКТОРОВИЧ',
    startDate: '25.09.2025',
    endDate: '30.12.2025',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 1 },
      { id: 'v2', specialization: 'QA', count: 1 },
      { id: 'v3', specialization: 'Product Owner', count: 1 },
    ],
  },
  {
    id: 'p7',
    hypothesisId: 10,
    title: 'ИИ-распознавание таблеток по фото',
    description:
      'Мобильный ассистент определяет препарат по фотографии таблетки или упаковки, подсказывает назначение, дозировку и правила приёма. CV-модель обучается на открытых датасетах и базе партнёрской аптечной сети.',
    shortDescription:
      'Распознавание лекарственного препарата по фото с подсказками по приёму и совместимости.',
    status: 'Формирование команды',
    curator: 'КОЛЕСНИКОВА ОЛЬГА ИГОРЕВНА',
    startDate: '10.04.2026',
    endDate: '10.10.2026',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 2 },
      { id: 'v2', specialization: 'Frontend', count: 1 },
      { id: 'v3', specialization: 'QA', count: 1 },
      { id: 'v4', specialization: 'Designer', count: 1 },
    ],
  },
  {
    id: 'p8',
    hypothesisId: 13,
    title: 'Медицинский советник для путешествий',
    description:
      'Сервис подбирает рекомендации по прививкам, состав дорожной аптечки и памятку по медицинской безопасности в зависимости от страны поездки, сезона и состояния здоровья путешественника. Источники — ВОЗ, Роспотребнадзор, авторизованные клиники.',
    shortDescription:
      'Персональные медицинские рекомендации под страну поездки и состояние здоровья путешественника.',
    status: 'Формирование команды',
    curator: 'ЛАЗАРЕВ КИРИЛЛ ВЯЧЕСЛАВОВИЧ',
    startDate: '05.05.2026',
    endDate: '20.11.2026',
    members: [],
    vacancies: [
      { id: 'v1', specialization: 'Backend', count: 1 },
      { id: 'v2', specialization: 'Frontend', count: 1 },
      { id: 'v3', specialization: 'System Analyst', count: 1 },
      { id: 'v4', specialization: 'Product Owner', count: 1 },
      { id: 'v5', specialization: 'Designer', count: 1 },
    ],
  },
]

/* ─────────── Хелперы ─────────── */

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectsForHypothesis(hypothesisId: number): Project[] {
  return projects.filter((p) => p.hypothesisId === hypothesisId)
}

/** Суммарное число открытых мест в проекте. */
export function countOpenSlots(project: Project): number {
  return project.vacancies.reduce((sum, v) => sum + v.count, 0)
}

/** Суммарное число участников (заполненные места). */
export function countFilledSlots(project: Project): number {
  return project.members.length
}

/**
 * Видим ли проект студенту в общем списке:
 * статус «Формирование команды» + есть хотя бы одна открытая специализация.
 */
export function isVisibleToStudent(project: Project): boolean {
  return (
    project.status === 'Формирование команды' && countOpenSlots(project) > 0
  )
}

/** Уникальные специализации с открытыми местами в проекте, в порядке SPECIALIZATIONS. */
export function getOpenSpecializations(project: Project): Specialization[] {
  const seen = new Set<Specialization>()
  for (const v of project.vacancies) {
    if (v.count > 0) seen.add(v.specialization)
  }
  return SPECIALIZATIONS.filter((s) => seen.has(s))
}

/**
 * Ранжирует открытые специализации проекта для показа в карточке списка.
 *
 * Приоритеты:
 *   1. Специализации, по которым у студента пройдена самооценка и он ещё не
 *      участвует ни в одном другом проекте по этой специализации — самое
 *      релевантное для подачи заявки.
 *   2. Остальные специализации в каноническом порядке (`SPECIALIZATIONS`) —
 *      совпадает с порядком в онбординге.
 *
 * Возвращает max `limit` специализаций плюс число «скрытых» для лейбла
 * «ещё N...».
 */
export function rankOpenSpecializationsForCard(
  project: Project,
  {
    assessedSpecs,
    participatingSpecs,
    limit = 3,
  }: {
    assessedSpecs: ReadonlySet<string>
    participatingSpecs: ReadonlySet<string>
    limit?: number
  },
): { shown: Specialization[]; hiddenCount: number } {
  const open = getOpenSpecializations(project)

  const priority: Specialization[] = []
  const rest: Specialization[] = []
  for (const spec of open) {
    if (assessedSpecs.has(spec) && !participatingSpecs.has(spec)) {
      priority.push(spec)
    } else {
      rest.push(spec)
    }
  }

  const ordered = [...priority, ...rest]
  return {
    shown: ordered.slice(0, limit),
    hiddenCount: Math.max(0, ordered.length - limit),
  }
}
