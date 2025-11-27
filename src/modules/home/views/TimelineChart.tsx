import { AggregatedData } from 'src/modules/home/types'

interface TimelineChartProps {
    data: Array<AggregatedData>
}

const TimelineChart = ({
  data
}: TimelineChartProps) => {
  if (!data.length) return <div>No data</div>

  const width = 800
  const height = 300
  const padding = 40

  const maxRevenue = Math.max(...data.map(aggregateData => aggregateData.totalRevenue))
  const minRevenue = 0

  const xScale = (i: number) => padding + (i / (data.length - 1)) * (width - 2 * padding)
  const yScale = (value: number) => height - padding - ((value - minRevenue) / (maxRevenue - minRevenue)) * (height - 2 * padding)

  const path = data.map((data, index) => `${index === 0 ? 'M' : 'L'}${xScale(index)} ${yScale(data.totalRevenue)}`).join(' ')

  return (
    <svg width={width} height={height} className='border'>
      <path d={path} stroke='blue' fill='none' strokeWidth={2} />
      {data.map((data, index) => (
        <circle
          key={index}
          cx={xScale(index)}
          cy={yScale(data.totalRevenue)}
          r={3}
          fill='red'
        />
      ))}
    </svg>
  )
}

export default TimelineChart
