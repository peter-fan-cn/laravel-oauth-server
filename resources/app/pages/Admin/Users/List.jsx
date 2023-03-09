import React from 'react';
import {Head} from "@inertiajs/react";
import {dateFormat} from "../../../libraries/string";

const link = ({url, label, active}) => {
    const html = {__html: label}
    let classes = 'page-link'
    if (!url) classes += ' disabled'
    if (active) classes += ' active';
    return <li className="page-item" key={label}>
        <a className={classes} href={url}
           dangerouslySetInnerHTML={html}></a>
    </li>
}

const List = ({data, links, total, path}) => {
    return <>
        <Head title="User Lists"/>
        <div className={'mb-3 mt-3 row'}>
            <div className={'col'}>
                <a type={'button'} className={'btn btn-sm btn-primary'} href={`${path}/create`}>
                    Add User
                </a>
            </div>
        </div>
        <div className='card'>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(user => <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{dateFormat(user.created_at)}</td>
                        <td>{dateFormat(user.updated_at)}</td>
                        <td>
                            <a href={`${path}/${user.id}/edit`}>
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
            <nav aria-label="Page navigation" className={'px-3'}>
                <ul className="pagination">
                    {links.map(link)}
                    <li className={'page-item d-flex align-items-center px-3'}>
                        <span>Total: {total} records</span>
                    </li>
                </ul>
            </nav>
        </div>
    </>
}


export default List;
