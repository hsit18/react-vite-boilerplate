import {
    TableCell,
    TableRow,
} from "@/components/ui/table";

const DataTableEmpty = ({ columnCount }: { columnCount: number }) => {
    return (
        <TableRow>
            <TableCell colSpan={columnCount} className="h-24 text-center">
                No results.
            </TableCell>
        </TableRow>
    );
}

export default DataTableEmpty;
