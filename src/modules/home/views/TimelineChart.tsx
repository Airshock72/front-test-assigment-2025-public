import { AggregatedData } from 'src/modules/home/types'
import useTimeLineChart from 'src/modules/home/hooks/useTimeLineChart.ts'

interface TimelineChartProps {
    data: Array<AggregatedData>
}

const TimelineChart = ({ data }: TimelineChartProps) => {
  const {
    containerRef,
    height,
    width,
    padding,
    areaPath,
    path,
    xScale,
    yScale,
    range
  } = useTimeLineChart({ data })

  return (
  // This div provides a dynamic width reference for the responsive SVG chart
    <div ref={containerRef} className='w-full'>
      {!data.length ? (
      // Render fallback UI if no data
        <div className='w-full h-[200px] flex items-center justify-center text-gray-500 border rounded-lg'>
                    No data
        </div>
      ) : (
        <svg
          width='100%'     // Responsive width
          height={height}  // Dynamic height based on container width
          viewBox={`0 0 ${width} ${height}`}
          className='border rounded-lg shadow-sm'
        >
          {/* Gradients for line + filled area */}
          <defs>
            <linearGradient id='lineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#3b82f6' />
              <stop offset='100%' stopColor='#6366f1' />
            </linearGradient>

            <linearGradient id='areaGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.25' />
              <stop offset='100%' stopColor='#3b82f6' stopOpacity='0' />
            </linearGradient>
          </defs>

          {/* Horizontal dashed grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = height - padding - t * (height - 2 * padding)
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke='#e5e7eb'
                strokeDasharray='4 4'
              />
            )
          })}

          {/* X and Y axes */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke='#d1d5db' />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke='#d1d5db' />

          {/* Filled area under the line */}
          {data.length > 1 && <path d={areaPath} fill='url(#areaGradient)' />}

          {/* Main line path */}
          <path
            d={path}
            stroke='url(#lineGradient)'
            fill='none'
            strokeWidth={3}
            strokeLinejoin='round'
            strokeLinecap='round'
          />

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.totalRevenue)}
              r={3.5}
              fill='#ef4444'
              stroke='#fff'
              strokeWidth={1}
            />
          ))}

          {/* Y-axis numeric labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = height - padding - t * (height - 2 * padding)
            const val = (t * range).toFixed(0)
            return (
              <g key={i}>
                <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke='#9ca3af' />
                <text x={padding - 8} y={y + 4} fontSize={10} fill='#6b7280' textAnchor='end'>
                  {val}
                </text>
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}

export default TimelineChart
