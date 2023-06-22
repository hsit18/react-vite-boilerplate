import { columns } from "./columns";
import { useQuery } from '@tanstack/react-query';
import { getPaymentData } from "@/services/paymentData";
import { DataTable } from "@/components/DataTable";

const Payments = () => {
    const query = useQuery({ queryKey: ['payments'], queryFn: getPaymentData });

    return (
        <div data-testid="payment-page" className="container mx-auto py-10">
            <DataTable isLoading={query.isLoading} columns={columns} data={query.data || []} />
        </div>
    )
};

export default Payments;