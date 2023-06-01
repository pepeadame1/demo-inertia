import { router } from "@inertiajs/react";
import Table, { ColumnType } from "antd/es/table";
import { FC, useEffect, useState } from "react";

interface Props {
    sort?: string;
    sortBy?: string;
    search?: string;
    column: any;
    urlBase: string;
    data: any;
    total: number;
    current: number;
    pageSize: number;
    isSearchable: boolean;
}

const SSTable: FC<Props> = ({
    sort,
    sortBy,
    search,
    column,
    data,
    urlBase,
    total,
    current,
    pageSize,
    isSearchable,
}) => {
    const [sortedInfo, setSortedInfo] = useState({
        order: "descend",
        columnKey: "",
    });
    const [pageQuery, setPageQuery] = useState(1);
    const [searchQuery, setSearchQuery] = useState(search ? search : "");
    useEffect(() => {
        if (sort != null) {
            sortOrder = "";
            if (sortBy === "desc") {
                var sortOrder = "descend";
            } else if (sortBy === "asc") {
                var sortOrder = "ascend";
            }
            setSortedInfo({
                columnKey: sort,
                order: sortOrder,
            });
            console.log("sorted update");
        }
    }, [sort, sortBy]);

    const handleQuery = (
        newSort: string | null,
        newSortBy: string | null,
        newPagination: number | null,
        newSearch: string | undefined
    ) => {
        var url = urlBase + "?";
        if (newSearch != "") {
            url = url + "search=" + newSearch + "&";
        }
        // } else if (search != "") {
        //     console.log("search 2");
        //     url = url + "search=" + search + "&";
        // }

        if (newSort != null) {
            console.log("newSort");
            url = url + "sort=" + newSort + "&" + "sortBy=" + newSortBy + "&";
        } else if (sort != null) {
            console.log("oldSort");
            url = url + "sort=" + sort + "&" + "sortBy=" + sortBy + "&";
        }

        if (pageQuery != null && newPagination == null) {
            url = url + "page=" + pageQuery + "&";
        } else if (newPagination != null) {
            url = url + "page=" + newPagination + "&";
        }
        console.log(url);

        router.visit(url, { only: ["posts", "sort", "sortBy", "search"] });
    };

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
        const x = debounce(500, () =>
            handleQuery("", "", null, e.target.value)
        );
        x();
    };

    const debounce = (
        n: number,
        fn: (...params: any[]) => any,
        immed: boolean = false
    ) => {
        let timer: NodeJS.Timeout | number | undefined = undefined;
        return function (this: any, ...args: any[]) {
            if (timer === undefined && immed) {
                fn.apply(this, args);
            }
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), n);
            return timer;
        };
    };

    const handleSort = (pagination: any, filter: any, sort: any) => {
        if (sort.columnKey) {
            handleQuery(sort.columnKey, sort.order, pagination.current, search);
        } else {
            handleQuery(null, null, pagination.current, search);
        }
    };
    return (
        <>
            {isSearchable ? (
                <input
                    onChange={handleSearch}
                    value={searchQuery ? searchQuery : ""}
                ></input>
            ) : (
                <></>
            )}
            <Table
                dataSource={data}
                columns={column}
                onChange={handleSort}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    // onChange: (page) => {
                    //     fetchRecords(page);
                    // },
                }}
            />
        </>
    );
};

export default SSTable;
