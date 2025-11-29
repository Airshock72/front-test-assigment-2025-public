import { useEffect, useMemo, useState, useCallback, Dispatch, SetStateAction } from 'react'
import { AggregatedData, Aggregation, Metric, SortByType } from 'src/modules/home/types'
import { aggregateMetrics } from 'src/modules/home/helpers'

interface UseIndexPage {
    loading: boolean
    sorted: AggregatedData[]
    aggregation: Aggregation
    setAggregation: Dispatch<SetStateAction<Aggregation>>
    setSortBy: Dispatch<SetStateAction<SortByType>>
    setSortAsc: Dispatch<SetStateAction<boolean>>
    sortBy: SortByType
    sortAsc: boolean
}

const useIndexPage = (): UseIndexPage => {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)

  const [aggregation, setAggregation] = useState<Aggregation>('hourly')
  const [sortBy, setSortBy] = useState<SortByType>('date')
  const [sortAsc, setSortAsc] = useState(true)

  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data.json')
        const data = await res.json()
        setMetrics(data.metrics)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData().then()
  }, [])

  // Aggregation
  const aggregated = useMemo(
    () => aggregateMetrics(metrics, aggregation),
    [metrics, aggregation]
  )

  // Sort accessor
  const getSortValue = useCallback(
    (item: AggregatedData) =>
      sortBy === 'date'
        ? new Date(item.periodStart).getTime()
        : item.totalRevenue,
    [sortBy]
  )

  // Sorting
  const sorted = useMemo(() => {
    return [...aggregated].sort((a, b) => {
      const valA = getSortValue(a)
      const valB = getSortValue(b)
      return sortAsc ? valA - valB : valB - valA
    })
  }, [aggregated, getSortValue, sortAsc])

  return {
    loading,
    sorted,
    aggregation,
    setAggregation,
    setSortAsc,
    setSortBy,
    sortAsc,
    sortBy
  }
}

export default useIndexPage
