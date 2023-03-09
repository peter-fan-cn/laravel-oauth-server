import React from 'react';
import {Head} from "@inertiajs/react";

const List = ({children, tokens}) => {

    return  <>
        <Head title="Token Lists" />
        <div className='card mt-4'>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    tokens.map(token => <tr>
                        <td>{token.id}</td>
                        <td>{token.name}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    </>
}


export default List;
