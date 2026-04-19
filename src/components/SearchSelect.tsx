import { useState, useMemo } from 'react'
import { Popover, TextField, Flex, Text, ScrollArea, Box } from '@radix-ui/themes'
import { MagnifyingGlassIcon, ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'
import './SearchSelect.css'

export interface SearchSelectOption {
  value: string
  label: string
}

interface Props {
  value: string | null
  onValueChange: (value: string) => void
  options: SearchSelectOption[]
  placeholder?: string
  disabled?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
}

/**
 * Combobox с поиском и ранжированием по релевантности.
 *
 * Порядок совпадений:
 *  1. Строка начинается с запроса        (score 3)
 *  2. Любое слово начинается с запроса   (score 2)
 *  3. Подстрока встречается где-то       (score 1)
 * Внутри одной группы — алфавитная сортировка.
 */
export function SearchSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Начни вводить название...',
  disabled = false,
  searchPlaceholder = 'Поиск...',
  emptyMessage = 'Ничего не найдено',
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = options.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options
      .map((o) => ({ o, score: scoreItem(o.label, q) }))
      .filter((x) => x.score > 0)
      .sort(
        (a, b) => b.score - a.score || a.o.label.localeCompare(b.o.label, 'ru')
      )
      .map((x) => x.o)
  }, [options, query])

  const handleSelect = (val: string) => {
    onValueChange(val)
    setOpen(false)
    setQuery('')
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        if (disabled) return
        setOpen(next)
        if (!next) setQuery('')
      }}
    >
      <Popover.Trigger disabled={disabled}>
        <button
          type="button"
          className="search-select-trigger"
          disabled={disabled}
        >
          <Text size="2" color={selected ? undefined : 'gray'} truncate>
            {selected?.label || placeholder}
          </Text>
          <ChevronDownIcon />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{ width: 'var(--radix-popover-trigger-width)', padding: 0 }}
      >
        <Box p="2">
          <TextField.Root
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Box style={{ borderTop: '1px solid var(--gray-a5)' }}>
          <ScrollArea style={{ maxHeight: 280 }}>
            {filtered.length === 0 ? (
              <Box p="3">
                <Text size="2" color="gray">
                  {emptyMessage}
                </Text>
              </Box>
            ) : (
              filtered.map((o) => (
                <Flex
                  key={o.value}
                  align="center"
                  justify="between"
                  px="3"
                  py="2"
                  className="search-select-item"
                  onClick={() => handleSelect(o.value)}
                >
                  <Text size="2">{o.label}</Text>
                  {o.value === value && <CheckIcon />}
                </Flex>
              ))
            )}
          </ScrollArea>
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}

function scoreItem(name: string, q: string): number {
  const n = name.toLowerCase()
  if (n.startsWith(q)) return 3
  const words = n.split(/[\s\-—.()«»,"']+/).filter(Boolean)
  if (words.some((w) => w.startsWith(q))) return 2
  if (n.includes(q)) return 1
  return 0
}
