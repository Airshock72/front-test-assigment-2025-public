import { AGG_OPTIONS } from 'src/modules/home/helpers'
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { Aggregation } from 'src/modules/home/types'

interface UseAggregationDropdown {
    setOpen: Dispatch<SetStateAction<boolean>>
    setHighlight: Dispatch<SetStateAction<number>>
    highlight: number
    buttonRef: RefObject<HTMLButtonElement | null>
    panelRef: RefObject<HTMLDivElement | null>
    open: boolean
}

interface UseAggregationDropdownProps {
    value: Aggregation

}

const useAggregationDropdown = ({
  value
}: UseAggregationDropdownProps): UseAggregationDropdown => {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(() => Math.max(0, AGG_OPTIONS.findIndex(el => el.value === value)))
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!open) return
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Sync highlight with current value when opening
  useEffect(() => {
    if (open) {
      const idx = AGG_OPTIONS.findIndex(el => el.value === value)
      setHighlight(Math.max(0, idx))
    }
  }, [open, value])


  return {
    setOpen,
    setHighlight,
    highlight,
    buttonRef,
    panelRef,
    open
  }
}

export default useAggregationDropdown
