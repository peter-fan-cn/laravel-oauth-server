import React from "react";


export default ({form}) => {


    return <>
        <form method='post'>
            <div className='mb-3'>
                <label>Client Name</label>
                <input className='form-control' value={form.name}/>
            </div>
            <div className='mb-3'>
                <label>User</label>
                <input className='form-control' value={form.user_id}/>
            </div>
        </form>
    </>
}
