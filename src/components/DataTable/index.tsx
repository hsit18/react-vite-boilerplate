import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  PaginationState
} from "@tanstack/react-table";

import React, { Dispatch, SetStateAction } from "react";
import {
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import DataTableLoading from "@/components/DataTable/components/DataTableLoading";
import DataTableRow from "./components/DataTableRow";
import DataTableEmpty from "./components/DataTableEmpty";
import DataTableHeaderRow from "./components/DataTableHeaderRow";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isLoading: boolean,
  total: number,
  pagination: PaginationState,
  setPagination: Dispatch<SetStateAction<PaginationState>>

}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  total,
  pagination,
  setPagination
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: total / pagination.pageSize,
    state: {
      sorting,
      pagination,
    },
  })

  return (
    <div className="rounded-md border">
      <Table className="w-full">
        <TableHeader className="bg-white sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <DataTableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />

          ))}
        </TableHeader>
        <TableBody className="h-96 overflow-y-auto">
          {isLoading && (
            <DataTableLoading totalColumns={columns.length} totalRows={5} />
          )}
          {(table.getRowModel().rows || []).map((row) => (
            <DataTableRow key={row.id} row={row} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" />
          ))}
          {!isLoading && table.getRowModel().rows?.length === 0 &&
            <DataTableEmpty columnCount={columns.length} />
          }
        </TableBody>
      </Table>
      <div className="bg-white flex items-center justify-end px-4 py-4 sticky bottom-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div >
  )
}