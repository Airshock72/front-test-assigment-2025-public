import useIndexPage from 'src/modules/home/hooks/useIndexPage.ts'
import TimelineChart from 'src/modules/home/views/TimelineChart.tsx'
import DataTable from 'src/modules/home/views/DataTable.tsx'
import AggregationDropdown from 'src/modules/home/views/AggregationDropdown.tsx'

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
    <div className='p-4 max-w-screen-2xl mx-auto'>
      {/* Aggregation Controls */}
      <div className='flex gap-4 mb-6'>
        <AggregationDropdown value={aggregation} onChange={setAggregation} />
      </div>

      {/* Timeline Chart */}
      <div className='mb-8'>
        <TimelineChart data={sorted} />
      </div>

      {/* Data Table */}
      <DataTable
        data={sorted}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />
    </div>
  )
}

export default IndexPage
