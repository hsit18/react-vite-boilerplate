import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";

import DataTableLoading from "@/components/DataTable/components/DataTableLoading";
import DataTableRow from "./components/DataTableRow";
import DataTableEmpty from "./components/DataTableEmpty";
import DataTableHeaderRow from "./components/DataTableHeaderRow";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isLoading: boolean
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <DataTableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && (
            <DataTableLoading totalColumns={columns.length} totalRows={5} />
          )}
          {(table.getRowModel().rows || []).map((row) => (
            <DataTableRow key={row.id} row={row} />
          ))}
          {!isLoading && table.getRowModel().rows?.length === 0 &&
            <DataTableEmpty columnCount={columns.length} />
          }
        </TableBody>
      </Table>
      <div className="flex items-center justify-end px-4 py-4">
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