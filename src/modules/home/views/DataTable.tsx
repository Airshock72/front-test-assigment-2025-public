import { Dispatch, SetStateAction } from 'react'
import { AggregatedData, SortByType } from 'src/modules/home/types'

interface DataTableProps {
    data: Array<AggregatedData>
    sortBy: SortByType
    setSortBy: Dispatch<SetStateAction<SortByType>>
    sortAsc: boolean
    setSortAsc: Dispatch<SetStateAction<boolean>>
}

const DataTable = ({
  data,
  sortAsc,
  sortBy,
  setSortBy,
  setSortAsc
}: DataTableProps) => {

  const toggleSort = (column: SortByType) => {
    if (sortBy === column) setSortAsc(!sortAsc)
    else {
      setSortBy(column)
      setSortAsc(true)
    }
  }

  return (
    <table className='w-full border-collapse border border-gray-300'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='border p-2 cursor-pointer' onClick={() => toggleSort('date')}>
                    Date {sortBy === 'date' ? (sortAsc ? '▲' : '▼') : ''}
          </th>
          <th className='border p-2'>Campaigns Active</th>
          <th className='border p-2'>Impressions</th>
          <th className='border p-2'>Clicks</th>
          <th className='border p-2 cursor-pointer' onClick={() => toggleSort('revenue')}>
                    Revenue {sortBy === 'revenue' ? (sortAsc ? '▲' : '▼') : ''}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className='hover:bg-gray-50'>
            <td className='border p-2'>{row.date}</td>
            <td className='border p-2'>{row.campaignsActive}</td>
            <td className='border p-2'>{row.totalImpressions}</td>
            <td className='border p-2'>{row.totalClicks}</td>
            <td className='border p-2'>{row.totalRevenue.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
