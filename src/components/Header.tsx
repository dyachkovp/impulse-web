import { useNavigate, useLocation } from 'react-router'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import logoSrc from '../assets/logo-impulse.svg'
import { getSession, resetSession } from '../state/session'
import './Header.css'

const navItems = [
  { label: 'Главная', path: '/dashboard' },
  { label: 'Гипотезы', path: '/hypotheses' },
  { label: 'Проекты', path: '/projects' },
]

/** «Иванов И.» — фамилия + инициал имени. */
function formatName(firstName: string, lastName: string): string {
  if (!firstName && !lastName) return ''
  if (!firstName) return lastName
  return `${lastName} ${firstName[0]}.`
}

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = getSession()
  const displayName = formatName(profile.firstName, profile.lastName)

  const handleLogout = () => {
    resetSession()
    navigate('/')
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-3) var(--space-8)',
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--gray-a3)',
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
          style={{ height: 24, display: 'block' }}
        />
      </div>

      {/* Nav */}
      <nav className="header-nav">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <button
              key={item.path}
              type="button"
              className="header-nav-item"
              data-active={isActive}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <Flex align="center" gap="1" justify="end" style={{ width: 220 }}>
        {displayName && (
          <Text size="2" color="gray" style={{ marginRight: 4 }}>
            {displayName}
          </Text>
        )}
        <IconButton
          variant="ghost"
          size="2"
          color="gray"
          onClick={handleLogout}
          aria-label="Выйти"
        >
          <ExitIcon />
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
