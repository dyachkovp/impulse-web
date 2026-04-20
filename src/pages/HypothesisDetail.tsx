import { Fragment, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Flex, Container } from '@radix-ui/themes'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from '../components/Header'
import { getHypothesisById, getAllProjectsFor } from '../data/hypotheses'
import type { Project } from '../data/projects'
import './HypothesisDetail.css'

export default function HypothesisDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const hypothesis = id ? getHypothesisById(id) : undefined
  const relatedProjects = hypothesis ? getAllProjectsFor(hypothesis.id) : []

  useEffect(() => {
    if (!hypothesis) navigate('/hypotheses', { replace: true })
  }, [hypothesis, navigate])

  if (!hypothesis) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <Header />

      <Container size="3" style={{ padding: '32px 24px 80px' }}>
        <Flex direction="column" gap="5">
          <div className="hypothesis-breadcrumb">
            <button
              type="button"
              className="hypothesis-breadcrumb-link"
              onClick={() => navigate('/hypotheses')}
            >
              Гипотезы
            </button>
            <span className="hypothesis-breadcrumb-separator">›</span>
            <span className="hypothesis-breadcrumb-current">
              {hypothesis.title}
            </span>
          </div>

          <article className="hypothesis-card-box">
            <h1 className="hypothesis-title">{hypothesis.title}</h1>
            <Markdown source={hypothesis.description} />
          </article>

          {relatedProjects.length > 0 && (
            <>
              <div className="hypothesis-projects-title">Проекты</div>
              <Flex direction="column" gap="3">
                {relatedProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onOpen={() => navigate(`/projects/${p.id}`)}
                  />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Container>
    </div>
  )
}

/* ── Минимальный markdown-рендер ──
 *
 * Поддерживает:
 * - Параграфы, разделённые пустой строкой.
 * - Маркированные списки: строки, начинающиеся с "- ".
 * - Инлайн-жирный: **текст**.
 *
 * Для прототипа этого достаточно; если потребуется таблицы/ссылки/заголовки,
 * перейдём на react-markdown.
 */

function Markdown({ source }: { source: string }) {
  const blocks = parseBlocks(source)
  return (
    <div className="markdown-body">
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block.text)}</p>
        ),
      )}
    </div>
  )
}

type Block = { type: 'paragraph'; text: string } | { type: 'list'; items: string[] }

function parseBlocks(source: string): Block[] {
  const lines = source.split('\n')
  const blocks: Block[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push({ type: 'paragraph', text: paragraph.join(' ').trim() })
    paragraph = []
  }
  const flushList = () => {
    if (list.length === 0) return
    blocks.push({ type: 'list', items: list })
    list = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line === '') {
      flushParagraph()
      flushList()
      continue
    }
    if (line.startsWith('- ')) {
      flushParagraph()
      list.push(line.slice(2).trim())
      continue
    }
    flushList()
    paragraph.push(line)
  }
  flushParagraph()
  flushList()
  return blocks
}

/** Разбивает строку на текст/жирный по `**...**`. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

interface ProjectCardProps {
  project: Project
  onOpen: () => void
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen()
    }
  }

  /** Уникальные специализации из вакансий — для бейджей в карточке. */
  const tags = Array.from(
    new Set(project.vacancies.map((v) => v.specialization)),
  )

  return (
    <div
      role="link"
      tabIndex={0}
      className="project-card"
      onClick={onOpen}
      onKeyDown={handleKey}
    >
      <div className="project-card-title">{project.title}</div>
      <div className="project-card-desc">{project.shortDescription}</div>
      <div className="project-card-footer">
        <div className="project-card-badges">
          <span className="project-card-status">{project.status}</span>
          {tags.map((tag) => (
            <span key={tag} className="project-card-tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="project-card-cta">
          К проекту
          <ArrowRightIcon />
        </span>
      </div>
    </div>
  )
}
