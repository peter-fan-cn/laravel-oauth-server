// parent element should have 'position: related' style.


export default ({visible}) => {

    return (visible ?
            <div
                className='position-absolute w-100 h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-25'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : null
    )
}
