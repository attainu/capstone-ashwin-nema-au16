const Toast = ({ message }) => {
    const show = message ? 'show' : ""
    return (

        <div className={`toast align-items-center ${show}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-center bg-danger">
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>

    )
}

export default Toast