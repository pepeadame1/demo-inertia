import React, { useCallback, useEffect, useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Link, usePage, router } from "@inertiajs/react";
import { Button, Pagination, Table } from "antd";
import SSTable from "../../Components/SSTable";
import debounce from "lodash.debounce";

const PostTableSS = () => {
    const { posts, sort, sortBy, search } = usePage().props;
    console.log(usePage().props);

    const [val, setVal] = useState(0);
    const [searchQuery, setSearchQuery] = useState(search ? search : "");
    const [sortedInfo, setSortedInfo] = useState({
        order: "descend",
        columnKey: "",
    });
    const [sortQuery, setSortQuery] = useState({
        sort: sort ? sort : "",
        sortBy: sortBy ? sortBy : "",
    });

    const [pageQuery, setPageQuery] = useState(1);

    // useEffect(() => {
    //     console.log(sort);
    //     if (sort != null) {
    //         sortOrder = "";
    //         if (sortBy === "desc") {
    //             var sortOrder = "descend";
    //         } else if (sortBy === "asc") {
    //             var sortOrder = "ascend";
    //         }
    //         console.log(sortOrder);
    //         setSortedInfo({
    //             columnKey: sort,
    //             order: sortOrder,
    //         });
    //     }
    // }, [sort, sortBy]);

    // useEffect(() => {
    //     console.log(sortedInfo);
    // }, [sortedInfo]);

    const columnPosts = [
        {
            key: "id",
            title: "id",
            dataIndex: "id",
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            key: "title",
            title: "title",
            dataIndex: "title",
            sorter: true,
            defaultSortOrder: sort === "title" ? sortBy : "false",
        },
        {
            key: "description",
            title: "description",
            dataIndex: "description",
            sorter: true,
            defaultSortOrder: sort === "description" ? sortBy : "false",
        },
    ];

    // const handleQuery = (newSort, newSortBy, newPagination, newSearch) => {
    //     console.log("searchQuery");
    //     console.log(newSearch);
    //     var url = posts.path + "?";
    //     if (newSearch != "") {
    //         console.log("search 1");
    //         url = url + "search=" + newSearch + "&";
    //     }
    //     // } else if (search != "") {
    //     //     console.log("search 2");
    //     //     url = url + "search=" + search + "&";
    //     // }

    //     if (newSort != null) {
    //         console.log("newSort");
    //         url = url + "sort=" + newSort + "&" + "sortBy=" + newSortBy + "&";
    //     } else if (sort != "") {
    //         url = url + "sort=" + sort + "&" + "sortBy=" + sortBy + "&";
    //     }

    //     if (pageQuery != "" && newPagination == null) {
    //         url = url + "page=" + pageQuery + "&";
    //     } else if (newPagination != "") {
    //         url = url + "page=" + newPagination + "&";
    //     }
    //     console.log(url);

    //     router.visit(url, { only: ["posts", "sort", "sortBy", "search"] });
    // };

    // const handleSearch = (e) => {
    //     setSearchQuery(e.target.value);
    //     handleQuery("", "", "", e.target.value);
    // };

    // const debounceSearch = debounce(handleSearch, 500);

    // const handleSort = (pagination, filter, sort) => {
    //     if (sort.columnKey) {
    //         handleQuery(sort.columnKey, sort.order, pagination.current, search);
    //     } else {
    //         handleQuery("", "", pagination.current, search);
    //     }
    // };

    return (
        <div>
            <div className="container mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-center">
                    {sortedInfo.columnKey}
                </h1>
                <div className="flex items-center justify-between mb-6">
                    <InertiaLink
                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                        href={route("posts.create")}
                    >
                        Create Post
                    </InertiaLink>
                </div>
                {/* <input
                    className="border-2"
                    // value={search ? searchQuery : ""}
                    onChange={
                        // setSearchQuery(e.target.value);
                        debounceSearch
                    }
                ></input> */}

                <SSTable
                    data={posts.data}
                    total={posts.total}
                    current={posts.current_page}
                    pageSize={posts.per_page}
                    column={columnPosts}
                    urlBase={posts.path}
                    sort={sort}
                    sortBy={sortBy}
                    search={search}
                    isSearchable={true}
                />
            </div>
        </div>
    );
};

export default PostTableSS;
