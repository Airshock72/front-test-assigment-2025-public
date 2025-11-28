import { groupBy } from 'lodash'
import { AggregatedData, Aggregation, Metric } from 'src/modules/home/types'

/**
 * Normalizes the date to the beginning of the hour/day/week/month
 * and returns { start, label }
 */
const getPeriod = (date: Date, type: Aggregation) => {
  const newDate = new Date(date)
  const year = newDate.getUTCFullYear()
  const month = newDate.getUTCMonth()
  const day = newDate.getUTCDate()
  const hour = newDate.getUTCHours()

  if (type === 'hourly') {
    const start = new Date(Date.UTC(year, month, day, hour))
    return { start, label: `${start.toISOString().slice(0, 13)}:00` }
  }

  if (type === 'daily') {
    const start = new Date(Date.UTC(year, month, day))
    return { start, label: start.toISOString().slice(0, 10) }
  }

  if (type === 'weekly') {
    // Convert JS Sunday=0 to ISO Monday=1
    const isoDow = ((newDate.getUTCDay() + 6) % 7) + 1

    // Monday of the week
    const monday = new Date(Date.UTC(year, month, day - (isoDow - 1)))

    // ISO uses Thursday to determine the year/week
    const thursday = new Date(Date.UTC(
      monday.getUTCFullYear(),
      monday.getUTCMonth(),
      monday.getUTCDate() + 3
    ))

    const isoYear = thursday.getUTCFullYear()
    const jan4 = new Date(Date.UTC(isoYear, 0, 4))

    const weekNo = Math.round(
      ((monday.getTime() - jan4.getTime()) / 86400000 +
                ((jan4.getUTCDay() + 6) % 7) + 1) / 7
    )

    return {
      start: monday,
      label: `${isoYear}-W${String(weekNo).padStart(2, '0')}`
    }
  }

  // monthly
  const start = new Date(Date.UTC(year, month, 1))
  return { start, label: start.toISOString().slice(0, 7) }
}

/**
 * Groups metrics by normalized time period and calculates:
 * - unique campaign count
 * - total impressions
 * - total clicks
 * - total revenue
 */
export const aggregateMetrics = (
  metrics: Metric[],
  aggregation: Aggregation
): AggregatedData[] => {

  const grouped = groupBy(metrics, m => {
    const { start } = getPeriod(new Date(m.timestamp), aggregation)
    return start.toISOString()
  })

  return Object.entries(grouped)
    .map(([periodStart, items]) => {
      const { label } = getPeriod(new Date(periodStart), aggregation)

      return {
        periodStart,
        label,
        campaignsActive: new Set(items.map(i => i.campaignId)).size,
        totalImpressions: items.reduce((a, metric) => a + metric.impressions, 0),
        totalClicks: items.reduce((a, metric) => a + metric.clicks, 0),
        totalRevenue: items.reduce((a, metric) => a + metric.revenue, 0)
      }
    })
    .sort((a, b) => +new Date(a.periodStart) - +new Date(b.periodStart))
}

export const AGG_OPTIONS: Array<{ label: string; value: Aggregation }> = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]
