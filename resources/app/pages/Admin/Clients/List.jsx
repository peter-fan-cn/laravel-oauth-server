import React from 'react';
import {Head} from "@inertiajs/react";
import {dateFormat} from "../../../libraries/string";

const Link = ({url, label, active, loadPage}) => {
    const html = {__html: label}
    let classes = 'page-link'
    if (!url) classes += ' disabled'
    if (active) classes += ' active';
    const handlePageClick = () => {
        if (loadPage) loadPage(url)
    }
    return <li className="page-item">
        <a className={classes} href="#" dangerouslySetInnerHTML={html} onClick={handlePageClick}></a>
    </li>
}

const Table = ({data, meta, loadPage}) => {
    const {links, total, path} = meta;
    return <>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>#ID</th>
                <th>User</th>
                <th>Name</th>
                <th>Personal</th>
                <th>Password</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(client => <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.user ? client.user.name : 'System'}</td>
                    <td>{client.name}</td>
                    <td>{client.personal_access_client ?
                        <i className={'text-success fa-solid fa-check-circle'}/> : null}
                    </td>
                    <td>{client.password_client ?
                        <i className={'text-success fa-solid fa-check-circle'}/> : null}
                    </td>
                    <td>{dateFormat(client.created_at)}</td>
                    <td>{dateFormat(client.updated_at)}</td>
                    <td>
                        <a href={`${path}/${client.id}/edit`}>
                            <i className={'fa-solid fa-pencil-alt'}></i>
                        </a>
                        <a className={'ms-2 link-danger'} href='#'>
                            <i className={'fa-solid fa-trash'}></i>
                        </a>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
        <nav aria-label="Page navigation" className={'px-3'}>
            <ul className="pagination">
                {links.map(link => <Link {...link} loadPage={loadPage} key={link.label}/>)}
                <li className={'page-item d-flex align-items-center px-3'}>
                    <span>Total: {total} records</span>
                </li>
            </ul>
        </nav>
    </>
}


export default class List extends React.PureComponent {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {data: [], meta: {links: [], total: 0, path: "", current_page: 1}};
        this.handleLoadPage = (url) => {
            const {current_page} = this.state.meta
            axios.get(url || `/api/clients?page=${current_page}`)
                .then(
                    res => this.setState(res.data),
                    e => console.log(e)
                )
        }
    }

    componentDidMount() {
        this.handleLoadPage();
    }

    render() {
        return <>
            <Head title="User Lists"/>
            <nav aria-label="breadcrumb" className={'mt-3'}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/admin/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Clients</li>
                </ol>
            </nav>
            <div className={'mb-3 mt-3 row'}>
                <div className={'col'}>
                    <a type={'button'} className={'btn btn-sm btn-primary'} href='#'>
                        Add User
                    </a>
                </div>
            </div>
            <div className='card'>
                <Table data={this.state.data} meta={this.state.meta} loadPage={this.handleLoadPage}/>
            </div>
        </>
    }
};


