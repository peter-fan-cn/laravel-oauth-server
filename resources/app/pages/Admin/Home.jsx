

const Item = ({name, url, description, icon}) => {
    let iconItem = <div className="me-3">
        <i className={'fa-xl ' + icon}></i>
    </div>

    return <div className="col">
        <div className="p-4 shadow-sm bg-white d-flex position-relative">
            {icon ? iconItem : null}
            <div>
                <div className="mb-2 fw-semibold fs-5">
                    <a className="stretched-link link-dark"
                       href={url}>{name}</a>
                </div>
                <div className="text-muted">
                    {description}
                </div>

            </div>
        </div>
    </div>
}

export default ({auth, items}) => {
    return <div className={'mt-4'}>
        <h3>
            Welcome {auth.user.name}
        </h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map((item, i) => <Item {...item} key={i}/>)}
        </div>
    </div>
}
