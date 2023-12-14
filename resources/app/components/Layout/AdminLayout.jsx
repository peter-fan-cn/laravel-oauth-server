import {Head} from "@inertiajs/react";
import Navbar from "@/components/Layout/Partials/Navbar";
import {useState} from "react";
import AsideMenu from "@/components/Layout/Partials/AsideMenu";

const AdminLayout = ({children, title}) => {
    const [showAside, setShowAside] = useState(true)
    return (<div className='bg-gray-50 min-h-screen flex flex-col'>
        <Head title={title}/>
        <Navbar onToggleAside={setShowAside} asideDisplay={showAside}/>
        <div className='p-4 flex grow'>
            {showAside &&
            <aside className='p-4 w-72'>
                <div className='bg-white h-full rounded-xl shadow'>
                    <AsideMenu/>
                </div>
            </aside>
            }
            <section className='flex flex-col grow'>
                <main className='p-4 grow'>
                    {children}
                </main>
                <footer className='p-4'>
                    copy right
                </footer>
            </section>
        </div>
    </div>)
}

export  default AdminLayout