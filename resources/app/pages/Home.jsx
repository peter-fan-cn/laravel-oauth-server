export default ({auth}) => {
    return <div className={'card mt-4'}>
        <div className={'card-header'}>
            Welcome {auth.user.name}
        </div>
        <div className={'row card-body'}>
            <div className={'col-3'}>
                <div className="list-group list-group-flush">
                    <a href={'/admin'} className="list-group-item list-group-item-action">
                        Admin Dashboard
                    </a>
                </div>
            </div>
            <div className={'col-9'}>
                content
            </div>
        </div>
    </div>
}
