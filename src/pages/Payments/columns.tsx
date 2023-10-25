import { Payment } from "@/types/payment";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Payment>();
export const columns = [
    columnHelper.accessor("status", {
        header: "Status",
        enableSorting: true
    }),
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.accessor("phoneNumber", {
        header: "Phone Number"
    }),
    columnHelper.accessor("email", {
        header: "Email",
    }),
    columnHelper.accessor("amount", {
        header: "Amount",
        enableSorting: false,
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