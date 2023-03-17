import {useState} from "react";
import Avatar from 'react-avatar'
import Upload from 'rc-upload'

const Profile = ({user}) => <div className='row'>
    <div className='col-3'>
        <Avatar name={user.name} email={user.email} src={user.avatar}/>
    </div>
    <div className='col-9'>
        <div className='row'>
            <div className='col-3 fw-bold text-end'>
                Name:
            </div>
            <div className='col-3'>
                {user.name}
            </div>

            <div className='col-3 fw-bold text-end'>
                Email:
            </div>
            <div className='col-3'>
                {user.email}
            </div>

            <div className='col-3 fw-bold text-end'>
                Provider:
            </div>
            <div className='col-3'>
                {user.provider}
            </div>

            <div className='col-3 fw-bold text-end'>
                OrgGID:
            </div>
            <div className='col-3'>
                {user.orggid}
            </div>
            <div className='col-3 fw-bold text-end'>
                User Level:
            </div>
            <div className='col-3'>
                {user.user_level}
            </div>
            <div className='col-3 fw-bold text-end'>
                Last Login At:
            </div>
            <div className='col-3'>
                {user.last_login_at}
            </div>
        </div>
        <div>
            {user.description}
        </div>
    </div>
</div>

const Form = ({user}) => {

    const handlerSave = (e) => {
        e.preventDefault();
    }

    const [data, setData] = useState({...user});
    const handlerChange = (value, key) => setData({[key]: value})
    return <form onSubmit={handlerSave}>
        <div className='row'>
            <div className='col-4'>

            </div>
        </div>
        <div className='mb-3'>
            <label>Avatar</label>
            <Upload>
            <Avatar name={user.name} email={user.email} src={user.avatar}/>
            </Upload>
        </div>
        <div className='mb-3'>
            <label>Name</label>
            <input className='form-control' value={data.name} onChange={e => handlerChange(e.target.value, 'name')}/>
        </div>
        <div className='mb-3'>
            <label>Name</label>
            <input className='form-control' value={data.name} onChange={e => handlerChange(e.target.value, 'name')}/>
        </div>
        <div className='mb-3'>
            <label>Name</label>
            <input className='form-control' value={data.name}/>
        </div>
        <div className='mb-3'>
            <label>Description</label>
            <textarea className='form-control'>{data.name}</textarea>
        </div>
    </form>
}

export default ({user}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className='card'>
            <div className='card-header d-flex justify-content-between'>
                <div>User Profile</div>
                <div>
                    <button className='btn btn-primary btn-sm' onClick={()=>setIsEdit(!isEdit)}>
                        {isEdit?'Save':'Edit'}
                    </button>
                </div>
            </div>
            <div className='card-body'>
                {
                    isEdit?<Form user={user}/>: <Profile user={user}/>
                }

            </div>
        </div>
    )
}
