
export default ({user}) => {

    return (
        <div className='card'>
            <h3 className='card-header'>User Information</h3>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-3'>
                        <img src={user.avatar}/>
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
            </div>
        </div>
    )
}
