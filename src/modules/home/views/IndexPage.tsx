import useIndexPage from 'src/modules/home/hooks/useIndexPage.ts'
import { Aggregation } from 'src/modules/home/types'
import TimelineChart from 'src/modules/home/views/TimelineChart.tsx'
import DataTable from 'src/modules/home/views/DataTable.tsx'

const IndexPage = () => {

  const {
    loading,
    sorted,
    aggregation,
    setAggregation,
    sortAsc,
    sortBy,
    setSortAsc,
    setSortBy
  } = useIndexPage()

  if (loading) return <div className='p-4'>Loading...</div>

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      {/* Aggregation Controls */}
      <div className='flex gap-4 mb-4'>
        <select
          value={aggregation}
          onChange={e => setAggregation(e.target.value as Aggregation)}
          className='border rounded p-2'
        >
          <option value='hourly'>Hourly</option>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>
      </div>

      {/* Timeline Chart */}
      <div className='mb-8'>
        <TimelineChart data={sorted} />
      </div>

      {/* Data Table */}
      <div>
        <DataTable
          data={sorted}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAsc={sortAsc}
          setSortAsc={setSortAsc}
        />
      </div>
    </div>
  )
}

export default IndexPage
