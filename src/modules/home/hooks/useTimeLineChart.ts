import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AggregatedData } from 'src/modules/home/types'

interface UseTimeLineChart {
    containerRef: RefObject<HTMLDivElement | null>
    height: number
    width: number
    padding: number
    areaPath: string
    path: string
    xScale: (value: number) => number
    yScale: (value: number) => number
    range: number
}

interface UseTimeLineChartProps {
    data: Array<AggregatedData>
}

const useTimeLineChart = ({ data }: UseTimeLineChartProps): UseTimeLineChart => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(800)

  // Internal padding for axes and labels
  const padding: number = 40

  // Maximum Y value in the dataset
  const maxRevenue = useMemo(() => (
    data.length ? Math.max(...data.map(d => d.totalRevenue)) : 0
  ), [data])

  // Dynamic chart height based on width (clamped between 260–520)
  const height = useMemo(() => {
    const h = Math.round(width * 0.45)
    return Math.max(260, Math.min(520, h))
  }, [width])

  // Range ensures Y-scale never divides by 0
  const range = Math.max(maxRevenue, 1)

  // Y-axis scale function translating values → SVG Y positions
  const yScale = useCallback((value: number) => (
    height - padding - (value / range) * (height - 2 * padding)
  ), [height, range])

  // X-axis scale function mapping index → SVG X positions
  const xScale = useCallback((i: number) => (
    padding + (i / Math.max(data.length - 1, 1)) * (width - 2 * padding)
  ), [data.length, width])

  // The SVG line path connecting all points
  const path = useMemo(() => (
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)} ${yScale(d.totalRevenue)}`).join(' ')
  ), [data, xScale, yScale])

  // Path describing the filled area under the line
  const areaPath = useMemo(() => {
    if (data.length < 2) return ''

    const head = `M${xScale(0)} ${yScale(data[0]!.totalRevenue)}`
    const lines = data.map((d, i) => `L${xScale(i)} ${yScale(d.totalRevenue)}`).join(' ')
    const tail = `L${xScale(data.length - 1)} ${height - padding} L${xScale(0)} ${height - padding} Z`

    return `${head} ${lines} ${tail}`
  }, [data, xScale, yScale, height])

  // Resize observer: updates width when container changes or window resizes
  useEffect(() => {
    const resize = () => {
      const el = containerRef.current
      if (el?.clientWidth) setWidth(el.clientWidth)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return {
    path,
    yScale,
    height,
    xScale,
    areaPath,
    padding,
    range,
    width,
    containerRef
  }
}

export default useTimeLineChart
