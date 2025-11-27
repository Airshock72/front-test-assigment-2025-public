import { useEffect, useState } from 'react'
import { Campaign, Metric } from 'src/modules/home/types'

interface UseIndexPage {
    campaigns: Array<Campaign>
    metrics: Array<Metric>
    loading: boolean
}

const useIndexPage = (): UseIndexPage => {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([])
  const [metrics, setMetrics] = useState<Array<Metric>>([])
  const [loading, setLoading] = useState(true)

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

  return {
    campaigns,
    metrics,
    loading
  }
}

export default useIndexPage
