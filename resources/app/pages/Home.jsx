export default ({auth}) => {
    return <div className={'card mt-4'}>
        <div className={'card-header'}>
            Welcome {auth.user.name}
        </div>
        <div className={'row card-body'}>
            <div className={'col-3'}>
                <div className="list-group list-group-flush">
                    <a href={'/admin'} className="list-group-item list-group-item-action">
                        Admin
                    </a>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </div>
            </div>
            <div className={'col-9'}>
                content
            </div>
        </div>
    </div>
}
