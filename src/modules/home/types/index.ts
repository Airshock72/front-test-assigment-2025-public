
export interface Campaign  {
    id: string
    name: string
    platform: string
}

export interface Metric {
    campaignId: string
    timestamp: string
    impressions: number
    clicks: number
    revenue: number
}


export type AggregatedData = {
    // ISO string representing the start of the period (hour/day/week/month) in UTC
    periodStart: string
    // Human-friendly label for display (e.g., 2025-11-24 12:00, 2025-11-24, 2025-W48, 2025-11)
    label: string
    campaignsActive: number
    totalImpressions: number
    totalClicks: number
    totalRevenue: number
}

export type Aggregation = 'hourly' | 'daily' | 'weekly' | 'monthly';

export type SortByType = 'date' | 'revenue'
