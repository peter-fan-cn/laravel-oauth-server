import {useState} from "react";

const menus = [
    {
        label: 'Home',
        items: [{ label: 'Dashboard', iconClassName: 'fa fa-fw fa-home', href: '/' }]
    },
    {
        label: 'UI Components',
        items: [
            {
                label: 'Form Layout',
                iconClassName: 'fa fa-fw fa-id-card',
                href: '/uikit/formlayout'
            },
            { label: 'Input', iconClassName: 'fa fa-fw fa-check-square', href: '/uikit/input' },
            {
                label: 'Float Label',
                iconClassName: 'fa fa-fw fa-bookmark',
                href: '/uikit/floatlabel'
            },
            {
                label: 'Invalid State',
                iconClassName: 'fa fa-fw fa-exclamation-circle',
                href: '/uikit/invalidstate'
            },
            {
                label: 'Button',
                iconClassName: 'fa fa-fw fa-mobile',
                href: '/uikit/button',
                class: 'rotated-iconClassName'
            },
            { label: 'Table', iconClassName: 'fa fa-fw fa-table', href: '/uikit/table' },
            { label: 'List', iconClassName: 'fa fa-fw fa-list', href: '/uikit/list' },
            { label: 'Tree', iconClassName: 'fa fa-fw fa-share-alt', href: '/uikit/tree' },
            { label: 'Panel', iconClassName: 'fa fa-fw fa-tablet', href: '/uikit/panels' },
            { label: 'Overlay', iconClassName: 'fa fa-fw fa-clone', href: '/uikit/overlay' },
            { label: 'Media', iconClassName: 'fa fa-fw fa-image', href: '/uikit/media' },
            {
                label: 'Menu',
                iconClassName: 'fa fa-fw fa-bars',
                href: '/uikit/menu',
                preventExact: true
            },
            { label: 'Message', iconClassName: 'fa fa-fw fa-comment', href: '/uikit/messages' },
            { label: 'File', iconClassName: 'fa fa-fw fa-file', href: '/uikit/file' },
            { label: 'Chart', iconClassName: 'fa fa-fw fa-chart-bar', href: '/uikit/chart' },
            { label: 'Misc', iconClassName: 'fa fa-fw fa-circle', href: '/uikit/misc' }
        ]
    },
    {
        label: 'Prime Blocks',
        items: [
            {
                label: 'Free Blocks',
                iconClassName: 'fa fa-fw fa-eye',
                href: '/blocks',
                badge: 'NEW'
            },
            {
                label: 'All Blocks',
                iconClassName: 'fa fa-fw fa-globe',
                href: 'https://www.primefaces.org/primeblocks-vue',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Utilities',
        items: [
            {
                label: 'Primeicons',
                iconClassName: 'fa fa-fw fa-prime',
                href: '/utilities/icons'
            },
            {
                label: 'PrimeFlex',
                iconClassName: 'fa fa-fw fa-desktop',
                href: 'https://www.primefaces.org/primeflex/',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Pages',
        iconClassName: 'fa fa-fw fa-briefcase',
        href: '/pages',
        items: [
            {
                label: 'Landing',
                iconClassName: 'fa fa-fw fa-globe',
                href: '/landing'
            },
            {
                label: 'Auth',
                iconClassName: 'fa fa-fw fa-user',
                items: [
                    {
                        label: 'Login',
                        iconClassName: 'fa fa-fw fa-sign-in',
                        href: '/auth/login'
                    },
                    {
                        label: 'Error',
                        iconClassName: 'fa fa-fw fa-times-circle',
                        href: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        iconClassName: 'fa fa-fw fa-lock',
                        href: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                iconClassName: 'fa fa-fw fa-pencil',
                href: '/crud'
            },
            {
                label: 'Timeline',
                iconClassName: 'fa fa-fw fa-calendar',
                href: '/timeline'
            },
            {
                label: 'Not Found',
                iconClassName: 'fa fa-fw fa-exclamation-circle',
                href: '/notfound'
            },
            {
                label: 'Empty',
                iconClassName: 'fa fa-fw fa-circle-exclamation',
                href: '/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                iconClassName: 'fa fa-fw fa-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        iconClassName: 'fa fa-fw fa-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', iconClassName: 'fa fa-fw fa-bookmark' },
                            { label: 'Submenu 1.1.2', iconClassName: 'fa fa-fw fa-bookmark' },
                            { label: 'Submenu 1.1.3', iconClassName: 'fa fa-fw fa-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        iconClassName: 'fa fa-fw fa-bookmark',
                        items: [{ label: 'Submenu 1.2.1', iconClassName: 'fa fa-fw fa-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                iconClassName: 'fa fa-fw fa-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        iconClassName: 'fa fa-fw fa-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', iconClassName: 'fa fa-fw fa-bookmark' },
                            { label: 'Submenu 2.1.2', iconClassName: 'fa fa-fw fa-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        iconClassName: 'fa fa-fw fa-bookmark',
                        items: [{ label: 'Submenu 2.2.1', iconClassName: 'fa fa-fw fa-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                iconClassName: 'fa fa-fw fa-question',
                href: '/documentation'
            },
            {
                label: 'Figma',
                href: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                iconClassName: 'fa fa-fw fa-pencil',
                target: '_blank'
            },
            {
                label: 'View Source',
                iconClassName: 'fa fa-fw fa-search',
                href: 'https://github.com/primefaces/sakai-nuxt',
                target: '_blank'
            },
            {
                label: 'Create-Vue Version',
                href: 'https://github.com/primefaces/sakai-vue',
                iconClassName: 'fa fa-fw fa-star'
            }
        ]
    }
]

let active = null;

export function useMenus() {


    const isActive = (path) => {
        console.log('isactive', path, active, path && (path.startsWith(active) || path === active))
        return path && (path.startsWith(active) || path === active)
    }

    const setActive = (path) => {
        console.log('setItemActive before', path, active)
        active = path
        console.log('setItemActive after', path, active)
    }
    return {
        active,
        setActive,
        isActive,
    }
}

export default menus;