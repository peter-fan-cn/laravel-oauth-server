import React from 'react';
import {Head} from "@inertiajs/react";
import {dateFormat} from "../../../libraries/string";
import Table from "../../../components/Data/Table";


const DataTable = ({data, meta, loadPage}) => {
    const columns = [
        {title: '#ID', field: 'id'},
        {title: 'Name', field: 'name'},
        {
            title: 'Personal',
            field: 'personal_access_client',
            render: (data) => data ? <i className={'text-success fa-solid fa-check-circle'}/> : null
        },
        {
            title: 'Personal',
            field: 'password_client',
            render: (data) => data ? <i className={'text-success fa-solid fa-check-circle'}/> : null
        },
        {title: 'Created At', field: 'created_at', render: (data) => dateFormat(data)},
        {title: 'Updated At', field: 'updated_at', render: (data) => dateFormat(data)},
        {
            title: 'Actions', render(_d, row) {
                return <>
                    <a href={`${meta.path}/${row.id}/edit`}>
                        <i className={'fa-solid fa-pencil-alt'}></i>
                    </a>
                    <a className={'ms-2 link-danger'} href='#'>
                        <i className={'fa-solid fa-trash'}></i>
                    </a>
                </>
            }
        },
    ]

    return <Table data={data} meta={meta} loadPage={loadPage} columns={columns}/>
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
                    <a type='button' className={'btn btn-sm btn-primary'} href='#'>
                        Add Client
                    </a>
                </div>
            </div>
            <div className='card'>
                <DataTable data={this.state.data} meta={this.state.meta} loadPage={this.handleLoadPage}/>
            </div>
        </>
    }
};


