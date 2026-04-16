import { useNavigate, useLocation } from 'react-router'
import { Flex, Button, IconButton, Text } from '@radix-ui/themes'
import logoSrc from '../assets/logo-impulse.svg'
import './Header.css'

const navItems = [
  { label: 'Главная', path: '/dashboard' },
  { label: 'Гипотезы', path: '/hypotheses' },
  { label: 'Проекты', path: '/projects' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 48px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(8px)',
        background: 'rgba(255,255,255,0.4)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ width: 220 }}>
        <img
          src={logoSrc}
          alt="Импульс"
          style={{ height: 16, display: 'block' }}
        />
      </div>

      {/* Nav */}
      <Flex align="center" gap="2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="2"
              color="gray"
              highContrast={isActive}
              className={isActive ? 'nav-item nav-item-active' : 'nav-item'}
              style={{
                fontWeight: isActive ? 510 : 400,
                backgroundColor: isActive ? 'rgba(0,0,51,0.06)' : 'transparent',
              }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          )
        })}
      </Flex>

      {/* User */}
      <Flex align="center" gap="1" justify="end" style={{ width: 240 }}>
        <Button variant="ghost" size="2" color="gray">
          <Text size="2">Николай Иванов</Text>
        </Button>
        <IconButton variant="ghost" size="2" color="gray">
          <ExitIcon />
        </IconButton>
        <IconButton variant="ghost" size="2" color="gray">
          <HelpIcon />
        </IconButton>
      </Flex>
    </header>
  )
}

function ExitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.33 2H3.33C2.6 2 2 2.6 2 3.33v9.34C2 13.4 2.6 14 3.33 14h2M10.67 11.33L14 8l-3.33-3.33M14 8H5.33"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 14.13A6.13 6.13 0 1 0 8 1.87a6.13 6.13 0 0 0 0 12.26ZM6.09 6.03a1.91 1.91 0 0 1 3.71.64c0 1.27-1.91 1.91-1.91 1.91M8 11.39h.01"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
