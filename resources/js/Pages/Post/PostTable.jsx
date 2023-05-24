import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Link, usePage, router } from "@inertiajs/react";
import { Pagination, Table } from "antd";
import { useState } from "react";

const PostTable = () => {
    const { posts } = usePage().props;
    console.log(posts);
    // const { data } = posts;
    // console.log(data);
    const [val, setVal] = useState(0);
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
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.title),
            },
        },
        {
            key: "description",
            title: "description",
            dataIndex: "description",
            sorter: {
                compare: (a, b) => a.description.localeCompare(b.description),
            },
        },
        {
            key: "num",
            title: "num",
            render: () => <p>{val}</p>,
        },
        {
            key: "mod",
            title: "mod",
            render: () => (
                <div className="flex flex-col">
                    <button onClick={addToButton}>+</button>
                    <button onClick={subToButton}>-</button>
                </div>
            ),
        },
    ];

    const addToButton = () => {
        setVal(val + 1);
    };

    const subToButton = () => {
        setVal(val - 1);
    };

    const fetchRecords = (page) => {
        var url = posts.path + "?page=" + page;
        router.visit(url, { only: ["posts"] });
    };

    return (
        <div>
            <div className="container mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-center">Post</h1>
                <div className="flex items-center justify-between mb-6">
                    <InertiaLink
                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                        href={route("posts.create")}
                    >
                        Create Post
                    </InertiaLink>
                </div>
                <Table
                    dataSource={posts.data}
                    columns={columnPosts}
                    pagination={{
                        total: posts.total,
                        current: posts.current_page,
                        pageSize: posts.per_page,
                        onChange: (page) => {
                            fetchRecords(page);
                        },
                    }}
                />

                <Link href={posts.links[0].url} only={["posts"]}>
                    test pag anterior
                </Link>
                <Link
                    href={posts.links[posts.links.length - 1].url}
                    only={["posts"]}
                >
                    test pag siguiente
                </Link>
                <div className="overflow-x-auto bg-white rounded shadow"></div>
            </div>
        </div>
    );
};

export default PostTable;
