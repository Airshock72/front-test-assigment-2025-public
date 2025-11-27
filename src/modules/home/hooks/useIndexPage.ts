import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { AggregatedData, Aggregation, Campaign, Metric, SortByType } from 'src/modules/home/types'
import { aggregateMetrics } from 'src/modules/home/helpers'

interface UseIndexPage {
    loading: boolean
    sorted: Array<AggregatedData>
    aggregation: Aggregation
    setAggregation: Dispatch<SetStateAction<Aggregation>>
    setSortBy: Dispatch<SetStateAction<SortByType>>
    setSortAsc: Dispatch<SetStateAction<boolean>>
    sortBy: SortByType
    sortAsc: boolean
}

const useIndexPage = (): UseIndexPage => {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([])
  const [metrics, setMetrics] = useState<Array<Metric>>([])
  const [loading, setLoading] = useState(true)
  const [aggregation, setAggregation] = useState<Aggregation>('hourly')
  const [sortBy, setSortBy] = useState<SortByType>('date')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data.campaigns)
        setMetrics(data.metrics)
      })
      .catch(err => console.error('Failed to fetch data:', err))
      .finally(() => setLoading(false))
  }, [])

  const aggregated: Array<AggregatedData> = useMemo(() => {
    return aggregateMetrics(metrics, aggregation)
  }, [metrics, aggregation])

  const sorted = useMemo(() => {
    return [...aggregated].sort((a, b) => {
      const valA = sortBy === 'date' ? new Date(a.date).getTime() : a.totalRevenue
      const valB = sortBy === 'date' ? new Date(b.date).getTime() : b.totalRevenue
      return sortAsc ? valA - valB : valB - valA
    })
  }, [aggregated, sortBy, sortAsc])

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
