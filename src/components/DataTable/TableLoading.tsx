import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";


type TableLoadingProps = {
  totalColumns: number
  totalRows: number
}

export const TableLoading = ({ totalColumns, totalRows = 1 }: TableLoadingProps) => {
  return (
    <>
      {[...Array(totalRows).keys()].map(n => (
        <TableRow key={n}>
          <TableCell colSpan={totalColumns}>
            <Skeleton className="w-[100%] h-[20px] rounded-2xl" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
