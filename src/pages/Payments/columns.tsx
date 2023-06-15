import { Payment } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
        enableSorting: true
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: () => "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
]