import React from "react";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";

interface DataTableRowProps<TData> {
    row: Row<TData>
};

const DataTableRow = <TData, TValue>({ row }: DataTableRowProps<TData>) => {
    return (
        <TableRow
            role="row"
            data-state={row.getIsSelected() && "selected"}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default DataTableRow;
