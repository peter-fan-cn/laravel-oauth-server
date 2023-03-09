import React, {useState} from "react";

export default ({formData, id}) => {
    const initialState = formData || {
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
    return <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="client-form-title"
                aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="client-form-title">
                        {data.id ? 'Edit Client' : 'Create Client'}
                    </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
}
