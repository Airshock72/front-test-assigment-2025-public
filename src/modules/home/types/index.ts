
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
    spend: number
}


export type Aggregation = 'hourly' | 'daily' | 'weekly' | 'monthly';
