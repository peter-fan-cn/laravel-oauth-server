const ListItem = ({active, label, path}) => active ?
    <div className='list-group-item active'>{label}</div> :
    <a href={path} className="list-group-item list-group-item-action">
        {label}
    </a>

export default ({active, user}) => {

    const items = [
        {label: 'User Profile', path: '/'},
        {label: 'Admin Dashboard', path: '/admin'},
        {label: 'Application Clients', path: `/users/${user.id}/clients`},
        {label: 'Personal Tokens', path: `/users/${user.id}/tokens`},
    ];

    return (
        <div className="list-group">
            {
                items.map((item, i) =>
                    <ListItem key={i} active={i === active} {...item}/>
                )
            }
        </div>
    )

}
