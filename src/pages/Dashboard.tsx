import { useNavigate } from 'react-router'
import { Flex, Text, Button } from '@radix-ui/themes'
import Header from '../components/Header'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <Header />

      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3"
        style={{ flex: 1, minHeight: 'calc(100vh - 57px)', padding: '64px 0 80px' }}
      >
        <Text size="5" weight="regular" style={{ color: '#1c2024' }}>
          Здравствуйте, Николай
        </Text>

        <Text
          size="3"
          align="center"
          style={{
            color: 'rgba(0,7,20,0.62)',
            maxWidth: 480,
            lineHeight: '24px',
          }}
        >
          Выберите проекты, отправьте заявку в команду или получите приглашение
          и приступайте к работе!
        </Text>

        <Button
          size="2"
          variant="solid"
          highContrast
          onClick={() => navigate('/projects')}
          style={{ marginTop: 4 }}
        >
          Выбрать проект
        </Button>
      </Flex>
    </div>
  )
}
