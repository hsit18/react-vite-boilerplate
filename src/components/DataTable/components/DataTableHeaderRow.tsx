
import {
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

type DataTableHeaderRowProps<TData> = {
    headerGroup: HeaderGroup<TData>
}

const DataTableHeaderRow = <TData, _>({ headerGroup }: DataTableHeaderRowProps<TData>) => {
    return (

        <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
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
            ))}
        </TableRow>

    )
};

export default DataTableHeaderRow;



