import React, {useState} from "react";
import {Head, Link} from "@inertiajs/react";


export default ({auth}) => {
    const initialState = {
        id: null,
        name: '',
        user_id: null,
        redirect: '',
        personal_access_client: false,
        password_client: false,
        secret: null
    }
    const [data, setData] = useState(initialState)
    const handleChange = key => e => setData({...data, [key]: e.target.value})
    const handleChecked = key => e => setData({...data, [key]: e.target.checked})
    return <>
        <Head title="Create Client"/>
        <nav aria-label="breadcrumb" className={'mt-3'}>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/admin/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/admin/clients">Clients</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Client Create</li>
            </ol>
        </nav>

        <form method='post'>
            <div className='mb-3'>
                <label>Client Name</label>
                <input className='form-control' value={data.name} onChange={handleChange('name')}/>
            </div>
            <div className='mb-3'>
                <label>Client User</label>
                <input className='form-control' value={data.user_id} onChange={handleChange('user_id')}/>
            </div>
            <div className='row'>
                <div className='col mb-3'>
                    <input className="form-check-input" type="checkbox" value="1" id="personal"
                           onChange={handleChecked('personal_access_client')}
                           checked={data.personal_access_client}
                    />
                    <label className="form-check-label ms-1" htmlFor="personal">
                        Personal Access Client
                    </label>
                </div>
                <div className='col mb-3'>
                    <input className="form-check-input" type="checkbox" value="1" id="password"
                           onChange={handleChecked('password_client')} checked={data.password_client}
                    />
                    <label className="form-check-label ms-1" htmlFor="password">
                        Password Client
                    </label>
                </div>
            </div>
            <div className='mb-3'>
                <label>Client Redirects</label>
                <textarea className='form-control' value={data.redirect}/>
            </div>

            {data.secret ? <div>
                <p>{data.secret}</p>
            </div> : null}
        </form>
    </>
}
