import React from "react";
import axios from "axios";
import {Head, Link} from "@inertiajs/react";
import Form from "./Form";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";


export default class Edit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {users: [], client: null}
    }

    loadPopupUsers() {
        return axios.get('/api/admin/users?res_type=full')
            .then(res => {
                this.setState({users: res.data.data})
            })
    }

    handleSaveClient(data) {
        const {id, user, ...client} = data;

        Swal.fire({
            title: 'Saving client data',
            didOpen(popup) {
                Swal.showLoading()
                axios.put('/api/clients/' + id, {...client})
                    .then(
                        res => {
                            // redirect to list.
                            // show secret
                            Swal.fire({
                                title: 'Create client successful',
                                icon: 'success'
                            }).then(()=>{
                                window.location.href = '/admin/clients'
                            })

                        },
                        e => {
                            Swal.fire({
                                title: 'Create client failed',
                                icon: 'error'
                            })
                        }
                    )
            }
        })
    }


    loadClient() {
        const {id, client} = this.props;
        if (!client && id)
            return axios.get('/api/admin/clients/' + id)
                .then(res => {
                    this.setState({client: res.data.data})
                })
        else {
            this.setState({client})
        }
    }
    componentDidMount() {

        this.setState({loading: true})
        Promise.all([
            this.loadPopupUsers(),
            this.loadClient()
        ])
            .then(() => {
                this.setState({loading: false})
            })
    }

    render() {
        const {users, client, loading} = this.state;
        const {auth} = this.props;
        return (
            <>
                <Head title="Update Client"/>
                <nav aria-label="breadcrumb" className={'mt-3'}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/admin/">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/admin/clients">Clients</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Client Update</li>
                    </ol>
                </nav>
                <div className='card'>
                    <h5 className='card-header'>
                        Update Client
                    </h5>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='offset-md-2 col-md-8'>
                                <Form users={users}
                                      user={auth.user}
                                      client={client}
                                      onSave={this.handleSaveClient}/>
                            </div>
                        </div>
                    </div>
                    <Loading visible={loading}/>
                </div>
            </>
        );
    }

}
