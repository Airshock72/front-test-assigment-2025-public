// Helper to get start of week (Monday)
import { Aggregation, Metric } from 'src/modules/home/types'

const startOfWeek = (date: Date) => {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(newDate.setDate(diff))
}

export const aggregateMetrics = (
  metrics: Array<Metric>,
  aggregation: Aggregation
) => {
  const result: Record<string, Array<Metric>> = {}

  metrics.forEach((metric) => {
    const date = new Date(metric.timestamp)
    let key = ''

    switch (aggregation) {
    case 'hourly':
      key = date.toISOString().slice(0, 13) // YYYY-MM-DDTHH
      break
    case 'daily':
      key = date.toISOString().slice(0, 10) // YYYY-MM-DD
      break
    case 'weekly':
      key = startOfWeek(date).toISOString().slice(0, 10) // week start
      break
    case 'monthly':
      key = date.toISOString().slice(0, 7) // YYYY-MM
      break
    }

    if (!result[key]) result[key] = []
    result[key]?.push(metric)
  })

  // Aggregate metrics for each key
  return Object.entries(result).map(([key, metrics]) => {
    return {
      timestamp: key,
      impressions: metrics.reduce((sum, metric) => sum + metric.impressions, 0),
      clicks: metrics.reduce((sum, metric) => sum + metric.clicks, 0),
      spend: metrics.reduce((sum, metric) => sum + metric.spend, 0)
    }
  })
}
