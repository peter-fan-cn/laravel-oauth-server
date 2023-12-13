import logo from '@/assets/logo.svg'

const Navbar = () => <div className="px-4 flex items-center justify-between h-20 bg-white shadow">
    <div className=''>
        <div className='flex items-center'>
            <div className='inline-flex items-center w-72 px-4'>
                <img src={logo} className='w-14 h-14'/>
                <span className='text-neutral-800 text-xl font-medium'>
                    Codelocks Connect
                </span>
            </div>
            <button className='w-10 h-10 p-button p-button-icon-only p-button-text text-black text-center ml-4'>
                <i className='p-button-icon fa-solid fa-bars fa-xl'/>
            </button>
        </div>

    </div>
    <div>

    </div>
</div>

export default Navbar;