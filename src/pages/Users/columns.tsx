import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true
    },
    {
        accessorKey: "status",
        header: "Status",
        enableSorting: true
    }

]