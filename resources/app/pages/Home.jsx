import LeftSideList from "../components/User/LeftSideList";
import Profile from "../components/User/Profile";

export default ({auth}) => {
    const {user} = auth;
    return (
        <div className='row mt-4'>
            <div className='col-2'>
                <LeftSideList active={0} user={user}/>
            </div>
            <div className='col-10'>
                <Profile user={user}/>
            </div>
        </div>
    )
}
