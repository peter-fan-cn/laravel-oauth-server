import LeftSideList from "../components/User/LeftSideList";

export default ({auth}) => {
    const {user} = auth;
    return (
        <div className='row mt-4'>
            <div className='col-2'>
                <LeftSideList active={0} user={user}/>
            </div>
            <div className='col-10'>
                <div className='card'>
                    <h3 className='card-header'>User Information</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-2 fw-bold text-end'>
                                Name:
                            </div>
                            <div className='col-2'>
                                {user.name}
                            </div>

                            <div className='col-2 fw-bold text-end'>
                                Email:
                            </div>
                            <div className='col-auto'>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
