import { columns } from "./columns";
import { useQuery } from '@tanstack/react-query';
import { getPaymentData } from "@/services/paymentData";
import { DataTable } from "@/components/DataTable";

const Payments = () => {
    const query = useQuery({ queryKey: ['payments'], queryFn: getPaymentData });

    return (

        <DataTable isLoading={query.isLoading} columns={columns} data={query.data || []} />

    )
};

export default Payments;