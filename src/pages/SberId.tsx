import { useNavigate } from 'react-router'
import { Flex, Text, Button } from '@radix-ui/themes'

/**
 * /sber-id — мок страницы авторизации Сбер ID.
 *
 * Имитация внешнего сервиса: намеренно оформлена в фирменном зелёном,
 * чтобы визуально отличаться от Impulse. Реальной аутентификации нет —
 * кнопки просто переключают маршрут.
 */
export default function SberId() {
  const navigate = useNavigate()

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(115deg, #2ab7ca 0%, #1fa560 45%, #7cc06b 75%, #e0d24b 100%)',
        padding: '48px 24px',
      }}
    >
      {/* Auth card */}
      <Flex
        style={{
          width: '100%',
          maxWidth: 880,
          minHeight: 480,
          background: '#f5f5f7',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left — content */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="5"
          style={{ flex: 1, padding: '48px 40px' }}
        >
          <Text size="5" weight="bold" style={{ color: '#1c2024' }}>
            Это вы, Павел Д.?
          </Text>

          {/* Avatar placeholder */}
          <Flex
            align="center"
            justify="center"
            style={{
              width: 80,
              height: 80,
              background: '#ffffff',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Text size="5" weight="bold" style={{ color: '#8b8d96' }}>
              ПД
            </Text>
          </Flex>

          <Text size="2" align="center" style={{ color: '#60646c', maxWidth: 280 }}>
            Если мы угадали, давайте продолжим вход по Сбер ID
          </Text>

          <Flex gap="3">
            <Button
              size="3"
              variant="soft"
              color="gray"
              onClick={() => navigate('/')}
              style={{ background: '#e8e9ec', color: '#2d8f4e' }}
            >
              Это не я
            </Button>
            <Button
              size="3"
              color="green"
              onClick={() => navigate('/dashboard')}
              style={{ background: '#21a038' }}
            >
              Продолжить
            </Button>
          </Flex>

          <Text size="1" align="center" style={{ color: '#8b8d96', maxWidth: 240 }}>
            Продолжая использовать Сбер ID, я принимаю{' '}
            <span style={{ color: '#21a038', fontWeight: 500 }}>условия оферты</span>
          </Text>
        </Flex>

        {/* Right — brand area (skeleton) */}
        <Flex
          direction="column"
          justify="between"
          style={{
            flex: 1,
            padding: '48px 40px',
            background: '#ececef',
          }}
        >
          {/* Phone skeleton illustration */}
          <Flex align="center" justify="center" style={{ flex: 1 }}>
            <div
              style={{
                width: 110,
                height: 160,
                border: '2px solid #cfd1d6',
                borderRadius: 18,
                background: '#ffffff',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -12,
                  right: -12,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#21a038',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                ✓
              </div>
            </div>
          </Flex>

          {/* Сбер ID logo */}
          <Flex justify="end" align="center" gap="2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#21a038" strokeWidth="2" />
              <path d="M7 12l3 3 7-7" stroke="#21a038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Text size="2" weight="bold" style={{ color: '#8b8d96', letterSpacing: 1 }}>
              СБЕР ID
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
