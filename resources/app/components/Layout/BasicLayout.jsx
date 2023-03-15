import {Head} from "@inertiajs/react";
import React from "react";

export default ({children, menus, title}) => {

    return (
        <>
            <Head title={title}/>
            <div className='row mt-4'>
                <div className='col-2'>
                    {menus}
                </div>
                <div className='col-10'>
                    {children}
                </div>
            </div>
        </>
    )
}
