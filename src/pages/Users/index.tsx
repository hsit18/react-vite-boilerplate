import { columns } from "./columns";
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedUserData } from "@/services/usersData";
import { DataTableWithInfiniteLoading } from "@/components/DataTable/DataTableWithInfiniteLoading";
import { UserApiResponse } from "@/types/user";
import { useCallback, useEffect, useMemo, useRef } from "react";

const PAGE_SIZE = 50;
const Users = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<UserApiResponse>(
        ['users'],
        async ({ pageParam = 0 }) => {
            const res = await getPaginatedUserData(pageParam, PAGE_SIZE);
            return res;
        },
        {
            getNextPageParam: (lastPage, allPages) => (allPages.length * PAGE_SIZE) < lastPage.totalRecords ? allPages.length : undefined,
            getPreviousPageParam: (_, allPages) => allPages.length > 0 ? allPages.length - 1 : undefined,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );

    const flatData = useMemo(
        () => data?.pages?.flatMap(page => page.data) ?? [],
        [data]
    );

    const totalDBRowCount = data?.pages?.[0]?.totalRecords ?? 0
    const totalFetched = flatData.length

    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

                //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
                if (
                    scrollHeight - scrollTop - clientHeight < 300 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    console.log("Fetching next page....");
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    )

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current)
    }, [fetchMoreOnBottomReached])

    return (
        <div className="table-wrp block overflow-auto h-[600px]"
            onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
            ref={tableContainerRef}
        >
            <DataTableWithInfiniteLoading isLoading={isLoading} columns={columns} data={flatData || []} />
        </div>
    )
};

export default Users;