import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table"

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react"
import { TableLoading } from "@/components/DataTable/TableLoading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isLoading: boolean
}

export function DataTableWithInfiniteLoading<TData, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className={header.column.getCanSort()
                  ? 'cursor-pointer select-none'
                  : ''} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {{
                    asc: <ArrowUpAZ className="ml-2 h-4 w-4 inline-block" />,
                    desc: <ArrowDownAZ className="ml-2 h-4 w-4 inline-block" />,
                  }[header.column.getIsSorted() as string] ?? null}
                  {!header.column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableLoading totalColumns={columns.length} totalRows={5} />
        )}
        {(table.getRowModel().rows || []).map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="p-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {!isLoading && table.getRowModel().rows?.length === 0 &&
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}