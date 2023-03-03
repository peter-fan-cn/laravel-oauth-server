import React from 'react';
import {Head} from "@inertiajs/react";
import Example from "../../../components/Example";


const List = ({children, users}) => {

    return  <>
        <Head title="User Lists" />
        this is user list page,
        we have {users.length} users.

        <Example></Example>
    </>
}


export default List;
