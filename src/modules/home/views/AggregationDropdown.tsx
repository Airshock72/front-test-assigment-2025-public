import { Aggregation } from 'src/modules/home/types'
import { AGG_OPTIONS } from 'src/modules/home/helpers'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import useAggregationDropdown from 'src/modules/home/hooks/useAggregationDropdown.ts'

interface AggregationDropdownProps {
    value: Aggregation
    onChange: (val: Aggregation) => void
}

const AggregationDropdown = ({ value, onChange }: AggregationDropdownProps) => {
  const {
    setOpen,
    setHighlight,
    highlight,
    buttonRef,
    panelRef,
    open
  } = useAggregationDropdown({ value })


  const selectIndex = (idx: number) => {
    const opt = AGG_OPTIONS[idx]
    if (!opt) return
    onChange(opt.value)
    setOpen(false)
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (!open) {
      // Open with keyboard from button
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
    case 'Escape':
      e.preventDefault()
      setOpen(false)
      break
    case 'ArrowDown':
      e.preventDefault()
      setHighlight(hour => Math.min(AGG_OPTIONS.length - 1, hour + 1))
      break
    case 'ArrowUp':
      e.preventDefault()
      setHighlight(hour => Math.max(0, hour - 1))
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      selectIndex(highlight)
      break
    }
  }

  const selected = AGG_OPTIONS.find(el => el.value === value)

  return (
    <div className='relative inline-block text-left'>
      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label='Aggregation'
        onClick={() => setOpen(prevState => !prevState)}
        onKeyDown={onKeyDown}
        className='appearance-none cursor-pointer rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 shadow-lg px-4 pr-10
        py-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:border-indigo-300/50 transition-colors hover:bg-white/15'
      >
        {selected?.label ?? 'Select'}
        <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-200'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          ref={panelRef}
          role='listbox'
          aria-activedescendant={`agg-opt-${highlight}`}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className='absolute z-20 mt-2 w-56 origin-top-left rounded-xl border border-white/15 bg-slate-900/70 backdrop-blur-md shadow-2xl ring-1 ring-black/5 focus:outline-none'
        >
          <ul className='py-1 max-h-64 overflow-auto'>
            {AGG_OPTIONS.map((opt, idx) => {
              const isSelected = opt.value === value
              const isActive = idx === highlight
              return (
                <li
                  id={`agg-opt-${idx}`}
                  key={opt.value}
                  role='option'
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => selectIndex(idx)}
                  className={`mx-1 my-0.5 flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer select-none transition-colors
                    ${isActive ? 'bg-white/15' : 'bg-transparent hover:bg-white/10'}
                    ${isSelected ? 'text-slate-50' : 'text-slate-200'}`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full shadow-sm ${isSelected ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : 'bg-white/40'}`}
                  />
                  <span className='flex-1 text-sm'>{opt.label}</span>
                  {isSelected && (
                    <span className='text-indigo-300'>
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                        <path d='M20 6L9 17l-5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AggregationDropdown
