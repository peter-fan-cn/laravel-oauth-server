import React from 'react';
import {createInertiaApp} from '@inertiajs/react'
import {createRoot} from 'react-dom/client'
import './css/styles.css'

createInertiaApp({
    progress: {
        color: '#29d',
    },
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx', {eager: true})
        return pages[`./pages/${name}.jsx`]
    }, setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
}).catch(err => {
    console.error(err)
})
