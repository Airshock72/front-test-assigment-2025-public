import { groupBy } from 'lodash'
import { AggregatedData, Aggregation, Metric } from 'src/modules/home/types'

// Helper to format Date objects
const formatDate = (date: Date, type: Aggregation) => {
  switch (type) {
  case 'hourly':
    return date.toISOString().slice(0, 13) // "2025-11-24T12"
  case 'daily':
    return date.toISOString().slice(0, 10) // "2025-11-24"
  case 'weekly':
  { const firstDayOfWeek = new Date(date)
    firstDayOfWeek.setDate(date.getDate() - date.getDay())
    return firstDayOfWeek.toISOString().slice(0, 10) }
  case 'monthly':
    return date.toISOString().slice(0, 7) // "2025-11"
  }
}

export const aggregateMetrics = (
  metrics: Array<Metric>,
  aggregation: Aggregation
): Array<AggregatedData> => {
  // Group metrics by aggregation key
  const grouped = groupBy(metrics, m => formatDate(new Date(m.timestamp), aggregation))

  return Object.entries(grouped).map(([date, items]) => ({
    date,
    campaignsActive: new Set(items.map(i => i.campaignId)).size,
    totalImpressions: items.reduce((sum, i) => sum + i.impressions, 0),
    totalClicks: items.reduce((sum, i) => sum + i.clicks, 0),
    totalRevenue: items.reduce((sum, i) => sum + i.revenue, 0)
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
