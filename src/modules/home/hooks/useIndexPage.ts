import { useEffect, useState } from 'react'
import { Aggregation, Campaign, Metric } from 'src/modules/home/types'

interface UseIndexPage {
    campaigns: Array<Campaign>
    metrics: Array<Metric>
}

const useIndexPage = (): UseIndexPage => {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([])
  const [metrics, setMetrics] = useState<Array<Metric>>([])
  const [aggregation, setAggregation] = useState<Aggregation>('daily')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data.json')
        const data = await res.json()
        setCampaigns(data.campaigns)
        setMetrics(data.metrics)
      } catch (error) {
        console.error('Error fetching data.json:', error)
      }
    }
    fetchData().then()
  }, [])

  return {
    campaigns,
    metrics
  }
}

export default useIndexPage
