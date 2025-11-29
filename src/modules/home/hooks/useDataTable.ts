import { AggregatedData, SortByType } from 'src/modules/home/types'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

interface UseDataTable {
    setPage: Dispatch<SetStateAction<number>>
    page: number
    pageData: Array<AggregatedData>
    pageSize: number
    toggleSort: (
        column: SortByType,
        sortBy: SortByType,
        setSortAsc: Dispatch<SetStateAction<boolean>>,
        sortAsc: boolean,
        setSortBy: Dispatch<SetStateAction<SortByType>>
    ) => void
}

interface UseDataTableProps {
    data: Array<AggregatedData>
}

const useDataTable = ({
  data
}: UseDataTableProps): UseDataTable => {
  const [page, setPage] = useState(1)
  const pageSize = 10

  // Sorting
  const toggleSort = (
    column: SortByType,
    sortBy: SortByType,
    setSortAsc: Dispatch<SetStateAction<boolean>>,
    sortAsc: boolean,
    setSortBy: Dispatch<SetStateAction<SortByType>>
  ) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(column)
      setSortAsc(true)
    }
  }

  // Slice only the needed items for the current page
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, page])

  return {
    page,
    pageData,
    setPage,
    pageSize,
    toggleSort
  }
}

export default useDataTable
