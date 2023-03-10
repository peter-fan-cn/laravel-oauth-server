import React from 'react';
import {Head} from "@inertiajs/react";
import Table from "../../../components/Data/Table";
import {dateFormat} from "../../../libraries/string";
import Loading from "../../../components/Loading";


const DataTable = ({data, meta, loadPage}) => {
    const columns = [
        {title: '#ID', field: 'id'},
        {title: 'Name', field: 'name', render: (data, row) => <a href={'/admin/users/' + row.id}>{data}</a>},
        {title: 'Email', field: 'email'},
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
        this.state = {data: [], meta: {links: [], total: 0, path: "", current_page: 1}, loading: false};
    }
    handleLoadPage  (url) {
        const {meta:{current_page}} = this.state
        this.setState({loading: true})
        axios.get(url || `/api/users?page=${current_page}`)
            .then(
                res => this.setState(res.data),
                e => console.log(e)
            )
            .then(()=>{
                this.setState({loading: false})
            })
    }
    componentDidMount() {
        this.handleLoadPage();
    }

    render() {
        const {loading, meta, data} = this.state;
        return <>
            <Head title="User Lists"/>
            <nav aria-label="breadcrumb" className={'mt-3'}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/admin/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Users</li>
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

                <DataTable data={data} meta={meta} loadPage={this.handleLoadPage}/>
                <Loading visible={loading}/>
            </div>
        </>
    }
};

