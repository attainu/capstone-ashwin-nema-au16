import { Link } from "react-router-dom"
import { PATHS } from "../../config"
import './index.css'
export const Login = () => {
    return (
        <>
        <h5 className="text-center mt-3 mb-3"><Link className="link" to={PATHS.HOME}>Apnamart</Link> </h5>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column border mt-1 p-5">
                <input className="form-control" type='email' />
            </div>
        </div>
        </>
    )
}