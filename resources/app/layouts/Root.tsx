const Root = ({children}) => {
    return <div
        className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        {children}
    </div>
};

export default Root