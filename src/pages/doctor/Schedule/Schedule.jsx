
import "./Schedule.scss";

import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const Schedule = () => {
    const data = useMemo(
        () => new Array(12).fill(0).map((_, i) => ({ 'time': `${8 + i}:00 - ${9 + i}:00`, 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Sat': '', 'Sun': '' })),
        []
    );
    const [selectedRow, setSelectedRow] = React.useState(null);
    const handleRowClick = (rowIndex) => {
        setSelectedRow(rowIndex);
    }
    const columns = useMemo(
        () => [
            {
                Header: 'Time',
                accessor: 'time', // accessor is the "key" in the data
            },
            {
                Header: 'Mon',
                accessor: 'Mon',
            },
            {
                Header: 'Tue',
                accessor: 'Tue',
            },
            {
                Header: 'Wed',
                accessor: 'Wed',
            },
            {
                Header: 'Thu',
                accessor: 'Thu',
            },
            {
                Header: 'Fri',
                accessor: 'Fri',
            },
            {
                Header: 'Sat',
                accessor: 'Sat',
            },
            {
                Header: 'Sun',
                accessor: 'Sun',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps()} key={index}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} onClick={() => handleRowClick(row.index)} className={selectedRow ? 'selected' : ''} key={index}>
                            {row.cells.map((cell, index) => {
                                return <td {...cell.getCellProps()} key={index}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Schedule;