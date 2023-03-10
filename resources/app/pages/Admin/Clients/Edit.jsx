import React from "react";
import axios from "axios";
import {Head, Link} from "@inertiajs/react";
import Form from "./Form";


export default class Edit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {users: [], client: {}}
    }

    loadPopupUsers() {
        axios.get('/api/users?res_type=full')
            .then(res => {
                this.setState({users: res.data.data})
            })
    }

    handleSaveClient() {

    }

    loadClient() {
        const {id} = this.props;
        axios.get('/api/clients/' + id)
            .then(res => {
                this.setState({client: res.data.data})
            })
    }

    componentDidMount() {
        this.loadPopupUsers();
        this.loadClient()
    }

    render() {
        const {users, client} = this.state;
        const {auth, id} = this.props;
        return (
            <>
                <Head title="Create Client"/>
                <nav aria-label="breadcrumb" className={'mt-3'}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/admin/">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/admin/clients">Clients</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Client Update</li>
                    </ol>
                </nav>
                <div className='card'>
                    <h5 className='card-header'>
                        Update Client #{id}
                    </h5>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='offset-md-2 col-md-8'>
                                <Form users={users} user={auth.user} client={client} onSave={this.handleSaveClient}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
