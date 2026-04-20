import './Chips.css'

export interface ChipOption<T extends string = string> {
  value: T
  label: string
}

interface ChipsProps<T extends string> {
  options: ChipOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
}

/**
 * Радиогруппа на чипсах — всегда выбран ровно один вариант.
 * Используется для фильтров списков и подобных one-of переключателей.
 */
export function Chips<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: ChipsProps<T>) {
  return (
    <div className="chips" role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className="chip"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
