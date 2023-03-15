import React from 'react';
import {Head} from "@inertiajs/react";
import {dateFormat} from "../../../libraries/string";
import Table from "../../../components/Data/Table";
import Loading from "../../../components/Loading";

const DataTable = ({data, meta, loadPage, path}) => {
    const columns = [
        {
            title: '#ID', field: 'id',
            render: data => data.substring(0, 10)
        },
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'User',
            field: 'user',
            render: data => data ? <a href={'/admin/users/' + data.id}>{data.name}</a> : '<nil>'
        },
        {
            title: 'Client',
            field: 'client',
            render: data => data ? <a href={'/admin/clients/' + data.id}>{data.name}</a> : '<nil>'
        },
        {
            title: 'Scopes',
            field: 'scopes',
            render: data => data && data.length > 0 ?
                data.map(scope=><span className='badge bg-primary'>{scope}</span>):
                <span className='badge bg-primary'>*</span>
        },
        {title: 'Expired At', field: 'expired_at', render: data => dateFormat(data)},
        {title: 'Created At', field: 'created_at', render: data => dateFormat(data)},
        {
            title: 'Actions', render(_d, row) {
                return <>
                    {row.revoked ? <a className={'ms-2 link-warning'} href='#'>
                            <i className={'fa-solid fa-arrow-rotate-back'}></i>
                        </a> :
                        <a className={'ms-2 link-danger'} href='#'>
                            <i className={'fa-solid fa-trash'}></i>
                        </a>}
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
        this.state = {data: [], meta: {links: [], total: 0, path: "", current_page: 1}, loading: false};
    }

    handleLoadData(url) {
        const {meta: {current_page}} = this.state
        this.setState({loading: true})
        axios.get(url || `/api/tokens?page=${current_page}`)
            .then(
                res => this.setState(res.data),
                e => console.log(e)
            )
            .then(() => {
                this.setState({loading: false})
            })
    }

    componentDidMount() {
        this.handleLoadData();
    }

    render() {
        const {resource} = this.props
        const {meta, data, loading} = this.state
        return <>
            <Head title="Token Lists"/>
            <nav aria-label="breadcrumb" className={'mt-3'}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/admin/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Tokens</li>
                </ol>
            </nav>
            <div className='card'>
                <DataTable meta={meta} data={data} path={resource} loadPage={this.handleLoadData.bind(this)}/>
                <Loading visible={loading}/>
            </div>
        </>
    }
};
