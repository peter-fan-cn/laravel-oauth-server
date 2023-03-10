import React from "react";
import {Head, Link} from "@inertiajs/react";
import axios from "axios";
import Form from "./Form";


export default class Create extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {users: [], user: null, client: {}}
    }

    loadPopupUsers() {
        axios.get('/api/users?res_type=full')
            .then(res => {
                this.setState({users: res.data.data})
            })
    }

    handleSaveClient(data) {
        const {name, user_id, redirect, personal_access_client = false, password_client = false} = data;
        axios.post('/api/clients', {name, user_id, redirect, personal_access_client, password_client})
            .then(
                res => {
                    // redirect to list.
                    // show secret
                },
                e => {

                }
            )
    }

    componentDidMount() {
        this.loadPopupUsers();
    }

    render() {
        const {users} = this.state;
        const {auth} = this.props;
        return (
            <>
                <Head title="Create Client"/>
                <nav aria-label="breadcrumb" className={'mt-3'}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/admin/">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/admin/clients">Clients</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Client Create</li>
                    </ol>
                </nav>
                <div className='card'>
                    <h5 className='card-header'>
                        Create New Client
                    </h5>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='offset-md-2 col-md-8'>
                                <Form users={users} user={auth.user} client={null} onSave={this.handleSaveClient}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
