import { columns } from "./columns";
import { DataTable } from "./dataTable";
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { getPaymentData } from "@/services/paymentData";

const Payments = () => {
    const query = useQuery({ queryKey: ['todos'], queryFn: getPaymentData });

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={query.data || []} />
        </div>
    )
};

export default Payments;