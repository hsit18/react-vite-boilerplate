import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getPaginatedPaymentData } from '@/services/paymentData';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';

const Payments = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const query = useQuery({
        queryKey: ['payments', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getPaginatedPaymentData(pagination.pageIndex, pagination.pageSize),
    });

    return (
        <DataTable
            isLoading={query.isLoading}
            columns={columns}
            data={query.data?.data || []}
            pagination={pagination}
            setPagination={setPagination}
            total={query.data?.total || 0}
        />
    );
};

export default Payments;
