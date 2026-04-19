import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Text, Button, Checkbox, Link } from '@radix-ui/themes'
import logoSrc from '../assets/logo-impulse.svg'

export default function Login() {
  const navigate = useNavigate()
  const [consent, setConsent] = useState(false)

  const handleLogin = () => {
    if (!consent) return
    navigate('/sber-id')
  }

  return (
    <Flex
      direction="column"
      style={{ minHeight: '100vh', background: '#f9f9fb' }}
    >
      {/* Main content — centered */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ flex: 1, padding: '64px 24px' }}
      >
        <Flex direction="column" align="center" gap="6" style={{ width: '100%', maxWidth: 680 }}>
          {/* Logo */}
          <img
            src={logoSrc}
            alt="Импульс"
            style={{ height: 64, width: 'auto' }}
          />

          {/* Tagline */}
          <Text
            align="center"
            size="4"
            style={{
              fontStyle: 'italic',
              color: '#60646c',
              maxWidth: 360,
              lineHeight: '28px',
            }}
          >
            AI-driven платформа проектно-ориентированного обучения от Сбера
          </Text>

          {/* Spacer */}
          <div style={{ height: 48 }} />

          {/* Consent */}
          <Flex gap="2" align="start" style={{ width: '100%', maxWidth: 560 }}>
            <Checkbox
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              size="2"
            />
            <Text
              as="label"
              size="2"
              style={{ color: '#60646c', lineHeight: '20px', cursor: 'pointer' }}
              onClick={() => setConsent((v) => !v)}
            >
              Я даю свое{' '}
              <Link color="gray" underline="always" href="#" onClick={(e) => e.preventDefault()}>
                согласие на обработку персональных данных
              </Link>{' '}
              и принимаю условия{' '}
              <Link color="gray" underline="always" href="#" onClick={(e) => e.preventDefault()}>
                Пользовательского соглашения
              </Link>
            </Text>
          </Flex>

          {/* Sber ID button */}
          <Button
            size="4"
            color="green"
            disabled={!consent}
            onClick={handleLogin}
            style={{ width: '100%', maxWidth: 560, height: 56 }}
          >
            Войти по Сбер ID
          </Button>
        </Flex>
      </Flex>

      {/* Footer */}
      <Flex justify="center" style={{ padding: '24px 0 48px' }}>
        <Link
          color="gray"
          underline="always"
          size="2"
          href="#"
          onClick={(e) => e.preventDefault()}
          weight="medium"
        >
          Политика конфиденциальности
        </Link>
      </Flex>
    </Flex>
  )
}
