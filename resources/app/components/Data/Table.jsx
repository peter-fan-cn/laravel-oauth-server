import React from "react";
import Pagination from "./Pagination";

const Cell = ({field, render, row}) => {
    let data = null;
    if (field) {
        data = row[field]
    }
    if (render) {
        data = render(data, row);
    }
    return <td>{data}</td>;
}


const Row = ({columns, row}) => {
    return <tr>
        {
            columns.map((column, i) => <Cell {...column} row={row} key={i}/>)
        }
    </tr>
}

export default ({columns, data, meta: {links, total}, loadPage}) => {

    return <>
        <table className="table table-striped">
            <thead>
            <tr>
                {columns.map(({title}, i) => <th key={i}>{title}</th>)}
            </tr>
            </thead>
            <tbody>
            {
                data.map(row => <Row row={row} key={row.id} columns={columns}/>)
            }
            </tbody>
        </table>
        <Pagination links={links} loadPage={loadPage} total={total} className='mt-3'/>
    </>
}
