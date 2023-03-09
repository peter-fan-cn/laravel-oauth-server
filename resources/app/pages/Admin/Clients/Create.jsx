import React from "react";
import {Head, Link} from "@inertiajs/react";


export default ({auth}) => {


    return <>
        <Head title="Create Client"/>
        <nav aria-label="breadcrumb" className={'mt-3'}>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/admin/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/admin/clients">Clients</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Client Create</li>
            </ol>
        </nav>
        <form>
            <div className={'mb-3'}>
                <label>User</label>
                <input className={'form-control'}/>
            </div>
        </form>
    </>
}
