import logo from '@/assets/logo.svg'
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
// import {MegaMenu} from "primereact/megamenu";

const Navbar = ({onToggleAside, asideDisplay}) => {
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];


    return (<div className="px-4 flex items-center justify-between h-20 bg-white shadow gap-4">
        <div className=''>
            <div className='flex items-center'>
                {asideDisplay &&
                    <div className='inline-flex items-center w-72 px-4'>
                        <img src={logo} className='w-14 h-14'/>
                        <span className='text-neutral-800 text-xl font-medium'>
                    Codelocks Connect
                </span>
                    </div>
                }
                <button onClick={() => onToggleAside(!asideDisplay)}
                        className='w-10 h-10 p-button p-button-icon-only p-button-text text-black text-center ml-4'>
                    <i className='p-button-icon fa-solid fa-bars fa-xl'/>
                </button>
            </div>

        </div>
        <div className='grow flex items-center h-full'>
        {/*    <MegaMenu model={items} className='border-0 shadow-none font-medium'/>*/}
            <div className="p-inputgroup w-64">
                <span className="p-inputgroup-addon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <InputText placeholder='Search' className='w-64 p-inputtext-sm' />
            </div>
        </div>
        <div>
            <Button className='p-button-icon-only' icon='fa-solid fa-user' rounded={true}></Button>
        </div>
    </div>)
}

export default Navbar;