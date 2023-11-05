import { Payment } from "@/types/payment";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Payment>();

export const columns: ColumnDef<Payment, any>[] = [
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.accessor("phoneNumber", {
        header: "Phone Number"
    }),
    columnHelper.accessor("email", {
        header: "Email",
    }),
    columnHelper.accessor("company", {
        header: "Company",
        enableSorting: true
    }),
    columnHelper.accessor("status", {
        header: "Status",
        enableSorting: true
    }),
    columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        }
    })
]