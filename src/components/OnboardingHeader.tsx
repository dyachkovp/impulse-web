import { useNavigate } from 'react-router'
import { Flex, Button } from '@radix-ui/themes'
import logoSrc from '../assets/logo-impulse.svg'

export default function OnboardingHeader() {
  const navigate = useNavigate()

  return (
    <Flex
      align="center"
      justify="between"
      style={{ padding: '32px 48px' }}
    >
      <img src={logoSrc} alt="Импульс" style={{ height: 24 }} />

      <Button
        variant="ghost"
        size="2"
        color="gray"
        onClick={() => navigate('/')}
      >
        Выйти
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M5.33 2H3.33C2.6 2 2 2.6 2 3.33v9.34C2 13.4 2.6 14 3.33 14h2M10.67 11.33L14 8l-3.33-3.33M14 8H5.33"
            stroke="currentColor"
            strokeWidth="1.33"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Flex>
  )
}
