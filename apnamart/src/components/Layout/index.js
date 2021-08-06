export const Layout = ({children}) => {
    return (
        <>
        <div className="row">
            <div className="col-4">
                A
            </div>
            <div className="col-4">
                B
            </div>
            <div className="col-4">
                C
            </div>
        </div>
        {children}
        </>
    )
}