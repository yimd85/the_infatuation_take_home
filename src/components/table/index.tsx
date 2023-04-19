import React from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./table.module.css";

const BasicTable = (props: any) => {
    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "fullName" },
            { Header: "Stars", accessor: "stargazersCount" },
            { Header: "Language", accessor: "language" },
            { Header: "Created Date", accessor: "createdAt" },
            {
                Header: "Action",
                accessor: "",
                disableSortBy: true,
                Cell: ({ row }: any) => {
                    return (
                        <IconButton
                            onClick={() => props.delete(row.original.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    );
                },
            },
        ],
        [props]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data: props.data,
            },
            useGlobalFilter,
            useSortBy
        );

    return (
        <div>
            <h3>Top 10 Favorite Repositories</h3>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => {
                                    return (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BasicTable;
