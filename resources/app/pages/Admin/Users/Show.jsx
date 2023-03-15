import {Head} from "@inertiajs/react";
import Loading from "../../../components/Loading";
import React from "react";


export default ({user}) => {

    return <>
        <Head title="User Information"/>
        <nav aria-label="breadcrumb" className={'mt-3'}>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/">Home</a></li>
                <li className="breadcrumb-item"><a href="/admin/users">Users</a></li>
                <li className="breadcrumb-item active" aria-current="page">User</li>
            </ol>
        </nav>
        <div className={'mb-3 mt-3 row'}>

        </div>
        <div className='card'>
                <div className='row'>
                    <div className='card-body col-md-3'>
                        <div className="list-group list-group-flush">
                            <a href='#' className="list-group-item list-group-item-action">An item</a>
                            <a href='#' className="list-group-item list-group-item-action" >A second item</a>
                            <a href='#' className="list-group-item list-group-item-action">A third item</a>
                            <a href='#' className="list-group-item list-group-item-action">A fourth item</a>
                            <a href='#' className="list-group-item list-group-item-action">And a fifth one</a>
                        </div>
                    </div>
                    <div className='card-body col-md-9'>

                    </div>
                </div>
        </div>
    </>
}
