import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
  TextArea,
  Button,
} from '@radix-ui/themes'
import { CheckIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import OnboardingHeader from '../components/OnboardingHeader'
import { SearchSelect } from '../components/SearchSelect'
import { regions } from '../data/regions'
import { universities } from '../data/universities'
import { getSession, updateProfile } from '../state/session'

export default function OnboardingAbout() {
  const navigate = useNavigate()
  const session = getSession()

  const [regionId, setRegionId] = useState<number | null>(session.profile.regionId)
  const [university, setUniversity] = useState<string>(session.profile.university)
  const [about, setAbout] = useState<string>(session.profile.about)

  const regionOptions = useMemo(
    () => regions.map((r) => ({ value: String(r.id), label: r.name })),
    []
  )

  const universityOptions = useMemo(() => {
    if (regionId === null) return []
    return (universities[regionId] ?? []).map((u) => ({ value: u, label: u }))
  }, [regionId])

  const canContinue = regionId !== null && university.trim().length > 0

  const handleRegionChange = (value: string) => {
    const id = Number(value)
    setRegionId(id)
    setUniversity('') // reset on region change — см. docs/onboarding.md §2.1
  }

  const handleContinue = () => {
    if (!canContinue) return
    const region = regions.find((r) => r.id === regionId)?.name ?? ''
    updateProfile({ regionId, region, university, about })
    navigate('/onboarding/specialization')
  }

  return (
    <Flex direction="column" style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <OnboardingHeader />

      <Flex justify="center" style={{ flex: 1, padding: '48px 24px 80px' }}>
        <Flex direction="column" gap="6" style={{ width: '100%', maxWidth: 560 }}>
          <Heading size="7" weight="bold">Расскажите о себе</Heading>

          {/* Info banner — данные из Сбер ID */}
          <Flex
            align="center"
            gap="2"
            style={{
              padding: '14px 16px',
              background: '#f0f0f3',
              borderRadius: 8,
              color: '#60646c',
            }}
          >
            <CheckIcon />
            <Text size="2">Данные загружены из Сбер ID</Text>
          </Flex>

          {/* Имя / Фамилия — readonly */}
          <Grid columns="2" gap="4">
            <Box>
              <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: 6 }}>
                Имя
              </Text>
              <TextField.Root value={session.profile.firstName} readOnly disabled>
                <TextField.Slot>
                  <CheckIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: 6 }}>
                Фамилия
              </Text>
              <TextField.Root value={session.profile.lastName} readOnly disabled>
                <TextField.Slot>
                  <CheckIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>
          </Grid>

          {/* Регион */}
          <Box>
            <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: 6 }}>
              В каком регионе ты учишься?
            </Text>
            <SearchSelect
              value={regionId === null ? null : String(regionId)}
              onValueChange={handleRegionChange}
              options={regionOptions}
              placeholder="Начни вводить название..."
              searchPlaceholder="Поиск региона"
            />
          </Box>

          {/* Учебное заведение */}
          <Box>
            <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: 6 }}>
              Учебное заведение
            </Text>
            <SearchSelect
              value={university || null}
              onValueChange={setUniversity}
              options={universityOptions}
              placeholder="Начни вводить название..."
              searchPlaceholder="Поиск ВУЗа"
              emptyMessage={
                regionId === null
                  ? 'Сначала выбери регион'
                  : 'Нет данных по этому региону'
              }
              disabled={regionId === null}
            />
          </Box>

          {/* О себе */}
          <Box>
            <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: 6 }}>
              Чем увлекаешься?
            </Text>
            <TextArea
              placeholder="Например, увлекаюсь биологией и медициной, люблю горные лыжи"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
            />
          </Box>

          {/* Продолжить */}
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
