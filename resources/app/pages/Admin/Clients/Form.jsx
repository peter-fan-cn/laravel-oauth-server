import React, {useEffect, useState} from "react";
import Select from "react-select";

export default ({user, users, client, onSave}) => {
    const initialState = {
        id: null,
        name: '',
        user: null,
        user_id: null,
        redirect: '',
        personal_access_client: false,
        password_client: false,
        secret: null
    }
    const [data, setData] = useState(initialState)
    useEffect(() => {
        const clientUser = userOptions.filter(item => item.value === client.user_id)[0]

        setData({...client, user: clientUser ? {label: user.name, value: user.id} : null})
    }, [client])
    const handleChange = (key, value) => setData({...data, [key]: value})
    const userOptions = users.map(item => ({
        label: item.name,
        value: item.id
    }))
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(data)
    }
    return <>
        <form method='post' onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label>Client Name</label>
                <input className='form-control' value={data.name}
                       placeholder='Enter client name'
                       onChange={e => handleChange('name', e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label>Client User</label>
                <Select options={userOptions} defaultValue={data.user}
                        placeholder='Select a user for current client'
                        onChange={event => handleChange('user_id', event.value)}/>
            </div>
            <div className='row'>
                <div className='col mb-3'>
                    <input className="form-check-input" type="checkbox" value="1" id="personal"
                           onChange={e => handleChange('personal_access_client', e.target.checked)}
                           checked={data.personal_access_client}
                    />
                    <label className="form-check-label ms-1" htmlFor="personal">
                        Personal Access Client
                    </label>
                </div>
                <div className='col mb-3'>
                    <input className="form-check-input" type="checkbox" value="1" id="password"
                           onChange={e => handleChange('password_client', e.target.checked)}
                           checked={data.password_client}
                    />
                    <label className="form-check-label ms-1" htmlFor="password">
                        Password Client
                    </label>
                </div>
            </div>
            <div className='mb-3'>
                <label>Client Redirects</label>
                <input className='form-control' value={data.redirect}
                       placeholder='Enter redirects separated with comma'
                       onChange={e => handleChange('redirect', e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label>Company</label>
                <input className='form-control' value={data.company}
                       placeholder='Enter company name'
                       onChange={e => handleChange('company', e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label>Company Description</label>
                <textarea className='form-control' value={data.description}
                          placeholder='Enter company description'
                          onChange={e => handleChange('description', e.target.value)}/>
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-primary' type='submit'>Save</button>
            </div>
            {data.secret ? <div>
                <p>{data.secret}</p>
            </div> : null}
        </form>
    </>
}
