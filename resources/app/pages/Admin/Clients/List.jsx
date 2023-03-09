import React from 'react';
import {Head} from "@inertiajs/react";
import {dateFormat} from "../../../libraries/string";
import EditModal from "./EditModal";


const List = ({data, links, total, path}) => {
    return <>
        <Head title="Client Lists"/>
        <nav aria-label="breadcrumb" className={'mt-3'}>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Clients</li>
            </ol>
        </nav>
        <div className={'mb-3 mt-3 row'}>
            <div className={'col'}>
                <button type='button' className={'btn btn-sm btn-primary'} data-bs-toggle="modal"
                        data-bs-target='#client-form'>
                    Add Client
                </button>
            </div>
        </div>
        <div className='card mt-3'>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>User</th>
                    <th>Name</th>
                    <th>Personal</th>
                    <th>Password</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(client => <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.user ? client.user.name : 'System'}</td>
                        <td>{client.name}</td>
                        <td>{client.personal_access_client ?
                            <i className={'text-success fa-solid fa-check-circle'}/> : null}
                        </td>
                        <td>{client.password_client ?
                            <i className={'text-success fa-solid fa-check-circle'}/> : null}
                        </td>
                        <td>{dateFormat(client.created_at)}</td>
                        <td>{dateFormat(client.updated_at)}</td>
                        <td>
                            <a href={`${path}/${client.id}/edit`}>
                                <i className={'fa-solid fa-pencil-alt'}></i>
                            </a>
                            <a className={'ms-2 link-danger'} href='#'>
                                <i className={'fa-solid fa-trash'}></i>
                            </a>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>

        {/* Modal */}
        <EditModal id='client-form'/>
    </>
}


export default List;
