import { columns } from "./columns";
import { DataTable } from "./dataTable";
import {
    useQuery,
} from '@tanstack/react-query';
import { getPaymentData } from "@/services/paymentData";
import { Skeleton } from "@/components/ui/skeleton";

const Payments = () => {
    const query = useQuery({ queryKey: ['payments'], queryFn: getPaymentData });

    return (
        <div className="container mx-auto py-10">
            {query.isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}

            <DataTable columns={columns} data={query.data || []} />
        </div>
    )
};

export default Payments;