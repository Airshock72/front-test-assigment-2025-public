import { Dispatch, SetStateAction, useEffect } from 'react'
import { AggregatedData, SortByType } from 'src/modules/home/types'
import { btnBase, btnDefault, btnDisabled } from 'core/helpers'

interface PaginationProps {
    data: Array<AggregatedData>
    setPage: Dispatch<SetStateAction<number>>
    sortBy: SortByType
    sortAsc: boolean
    pageSize: number
    page: number
}

const Pagination = ({
  data,
  setPage,
  sortBy,
  sortAsc,
  pageSize,
  page
}: PaginationProps) => {
  const total = data.length

  // Reset page on sort or data changes
  useEffect(() => setPage(1), [sortBy, sortAsc, total])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const startItem = total > 0 ? (page - 1) * pageSize + 1 : 0
  const endItem = Math.min(page * pageSize, total)


  const getVisiblePages = () => {
    const windowSize = 5
    let start = Math.max(1, page - Math.floor(windowSize / 2))
    let end = start + windowSize - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - windowSize + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  return (
    <div className='flex flex-wrap gap-3 items-center justify-between px-3 py-3 text-sm'>
      {/* Status */}
      <div className='text-slate-300'>
        {total > 0 ? `Showing ${startItem}-${endItem} of ${total}` : 'No records'}
      </div>

      <div className='flex flex-wrap gap-2 items-center'>
        {/* First */}
        <button
          className={`${btnDefault} ${btnDisabled}`}
          onClick={() => setPage(1)}
          disabled={page === 1}
        >« First
        </button>

        {/* Prev */}
        <button
          className={`${btnDefault} ${btnDisabled}`}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >‹ Prev
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={
              num === page
                ? `${btnBase} bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-transparent shadow-md`
                : btnDefault
            }
            aria-current={num === page ? 'page' : undefined}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          className={`${btnDefault} ${btnDisabled}`}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >Next ›
        </button>

        {/* Last */}
        <button
          className={`${btnDefault} ${btnDisabled}`}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >Last »
        </button>
      </div>
    </div>
  )
}

export default Pagination
