import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Text, Container } from '@radix-ui/themes'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from '../components/Header'
import { Chips } from '../components/Chips'
import {
  hypotheses,
  filterHypotheses,
  type Hypothesis,
  type HypothesisFilter,
} from '../data/hypotheses'
import './HypothesesList.css'

const FILTER_OPTIONS: { value: HypothesisFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'with', label: 'С проектами' },
  { value: 'without', label: 'Без проектов' },
]

export default function HypothesesList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<HypothesisFilter>('all')

  const list = useMemo(() => filterHypotheses(hypotheses, filter), [filter])

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <Header />

      <Container size="3" style={{ padding: '32px 24px 80px' }}>
        <Flex direction="column" gap="5">
          <Text size="2" color="gray">
            Гипотезы
          </Text>

          <Chips
            options={FILTER_OPTIONS}
            value={filter}
            onChange={setFilter}
            ariaLabel="Фильтр гипотез"
          />

          <Flex direction="column" gap="4">
            {list.length === 0 ? (
              <div className="hypotheses-empty">Нет гипотез по этому фильтру</div>
            ) : (
              list.map((h) => (
                <HypothesisCard
                  key={h.id}
                  hypothesis={h}
                  onOpen={() => navigate(`/hypotheses/${h.id}`)}
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
  hypothesis: Hypothesis
  onOpen: () => void
}

function HypothesisCard({ hypothesis, onOpen }: CardProps) {
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
      className="hypothesis-card"
      onClick={onOpen}
      onKeyDown={handleKey}
    >
      <div className="hypothesis-card-title">{hypothesis.title}</div>
      <div className="hypothesis-card-desc">{hypothesis.shortDescription}</div>
      <span className="hypothesis-card-cta">
        К гипотезе
        <ArrowRightIcon />
      </span>
    </div>
  )
}
