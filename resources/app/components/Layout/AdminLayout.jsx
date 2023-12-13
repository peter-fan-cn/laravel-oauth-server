import {Head} from "@inertiajs/react";
import Navbar from "@/components/Layout/Partials/Navbar";

const AdminLayout = ({children, title}) => <div className='bg-gray-50 min-h-screen flex flex-col'>
    <Head title={title}/>
    <Navbar/>
    <div className='p-4 flex grow'>
        <aside className='p-4 w-72'>
            <div className='bg-white h-full rounded-xl shadow'>

            </div>
        </aside>
        <section className='flex flex-col grow'>
            <main className='p-4 grow overflow-scroll'>
            {children}

            </main>
            <footer className='p-4'>
                copy right
            </footer>
        </section>
    </div>
</div>

export  default AdminLayout