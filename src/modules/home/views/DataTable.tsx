import { Dispatch, SetStateAction } from 'react'
import { AggregatedData, SortByType } from 'src/modules/home/types'
import Pagination from 'core/components/Pagination.tsx'
import useDataTable from 'src/modules/home/hooks/useDataTable.ts'

interface DataTableProps {
    data: AggregatedData[]
    sortBy: SortByType
    setSortBy: Dispatch<SetStateAction<SortByType>>
    sortAsc: boolean
    setSortAsc: Dispatch<SetStateAction<boolean>>
}

const DataTable = ({
  data,
  sortBy,
  sortAsc,
  setSortBy,
  setSortAsc
}: DataTableProps) => {
  const {
    pageData,
    setPage,
    page,
    pageSize,
    toggleSort
  } = useDataTable({ data })

  return (
    <div className='bg-white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/10'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[720px] border-collapse'>
          <thead>
            <tr className='bg-white/5'>
              <th
                className='border-b border-white/10 p-3 text-left text-sm font-semibold text-slate-100 cursor-pointer'
                onClick={() => toggleSort('date', sortBy, setSortAsc, sortAsc, setSortBy)}
              >Date {sortBy === 'date' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className='border-b border-white/10 p-3 text-left text-sm font-semibold text-slate-200'>
                  Campaigns Active
              </th>
              <th className='border-b border-white/10 p-3 text-left text-sm font-semibold text-slate-200'>
                  Impressions
              </th>
              <th className='border-b border-white/10 p-3 text-left text-sm font-semibold text-slate-200'>
                  Clicks
              </th>
              <th
                className='border-b border-white/10 p-3 text-left text-sm font-semibold text-slate-200 cursor-pointer'
                onClick={() => toggleSort('revenue', sortBy, setSortAsc, sortAsc, setSortBy)}
              >Revenue {sortBy === 'revenue' && (sortAsc ? '▲' : '▼')}
              </th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((row, idx) => (
              <tr key={row.periodStart ?? idx} className='hover:bg-white/10 transition-colors'>
                <td className='border-b border-white/10 p-3 text-sm text-slate-200 whitespace-nowrap'>
                  {row.label}
                </td>
                <td className='border-b border-white/10 p-3 text-sm text-slate-200'>
                  {row.campaignsActive}
                </td>
                <td className='border-b border-white/10 p-3 text-sm text-slate-200'>
                  {row.totalImpressions}
                </td>
                <td className='border-b border-white/10 p-3 text-sm text-slate-200'>
                  {row.totalClicks}
                </td>
                <td className='border-b border-white/10 p-3 text-sm text-slate-200'>
                  {row.totalRevenue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        data={data}
        page={page}
        pageSize={pageSize}
        sortAsc={sortAsc}
        setPage={setPage}
        sortBy={sortBy}
      />
    </div>
  )
}

export default DataTable
