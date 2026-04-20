import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Heading, RadioCards, Text, Button } from '@radix-ui/themes'
import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'
import OnboardingHeader from '../components/OnboardingHeader'
import { getOrderedSpecializations } from '../data/skills'
import { updateProfile } from '../state/session'
import './OnboardingSpecialization.css'

export default function OnboardingSpecialization() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string>('')

  const canContinue = selected.length > 0

  const handleContinue = () => {
    if (!canContinue) return
    updateProfile({ specializations: [selected] })
    navigate('/onboarding/assessment')
  }

  return (
    <Flex direction="column" style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <OnboardingHeader />

      <Flex justify="center" style={{ flex: 1, padding: '48px 24px 80px' }}>
        <Flex direction="column" gap="6" style={{ width: '100%', maxWidth: 560 }}>
          <Heading size="7" weight="bold">Выбери свою специализацию</Heading>

          <RadioCards.Root
            value={selected}
            onValueChange={setSelected}
            columns="1"
            gap="3"
          >
            {getOrderedSpecializations().map((spec) => (
              <RadioCards.Item key={spec.specialization} value={spec.specialization}>
                <Flex align="center" justify="between" style={{ width: '100%' }}>
                  <Text size="3" weight={selected === spec.specialization ? 'medium' : 'regular'}>
                    {spec.specialization}
                  </Text>
                  <CheckIcon className="spec-check" />
                </Flex>
              </RadioCards.Item>
            ))}
          </RadioCards.Root>

          <Flex justify="center" mt="4">
            <Button
              size="4"
              highContrast
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Продолжить
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
