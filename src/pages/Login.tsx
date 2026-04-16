import { useNavigate } from 'react-router'
import { Box, Card, Flex, Heading, Text, TextField, Button, Separator } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
      <Card size="4" style={{ width: 400 }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Heading size="6" align="center">Вход</Heading>

            <Box>
              <Text as="label" size="2" weight="medium" mb="1">
                Email
              </Text>
              <TextField.Root placeholder="you@example.com" type="email">
                <TextField.Slot>
                  <EnvelopeClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box>
              <Text as="label" size="2" weight="medium" mb="1">
                Пароль
              </Text>
              <TextField.Root placeholder="••••••••" type="password">
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Button type="submit" size="3">
              Войти
            </Button>

            <Flex align="center" gap="3">
              <Separator size="4" style={{ flex: 1 }} />
              <Text size="2" color="gray">или</Text>
              <Separator size="4" style={{ flex: 1 }} />
            </Flex>

            <Button
              type="button"
              variant="outline"
              color="green"
              size="3"
              onClick={() => navigate('/dashboard')}
            >
              Войти по Сбер ID
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}
