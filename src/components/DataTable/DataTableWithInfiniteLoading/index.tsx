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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";
import DataTableLoading from "@/components/DataTable/components/DataTableLoading";
import DataTableRow from "../components/DataTableRow";
import DataTableEmpty from "../components/DataTableEmpty";
import DataTableHeaderRow from "../components/DataTableHeaderRow";

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
          <DataTableRow key={row.id} row={row} />
        ))}
        {!isLoading && table.getRowModel().rows?.length === 0 &&
          <DataTableEmpty columnCount={columns.length} />
        }
      </TableBody>
    </Table>
  )
}