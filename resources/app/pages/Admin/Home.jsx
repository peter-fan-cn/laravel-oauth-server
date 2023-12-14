import AdminLayout from "@/components/Layout/AdminLayout";

const Item = ({name, url, description, icon}) => {
    let iconItem = <div className="me-3">
        <i className={'fa-xl ' + icon}></i>
    </div>

    return <div className="grid">
        <div className="p-4 shadow-sm bg-white flex relative">
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
    return <AdminLayout>
        <div>
            <h3 className='text-2xl mb-4'>
                Welcome {auth.user.name}
            </h3>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {items.map((item, i) => <Item {...item} key={i}/>)}
            </div>
        </div>
    </AdminLayout>
}
