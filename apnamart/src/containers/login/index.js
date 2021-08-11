import './index.css'
import { useState } from 'react'
import * as EmailValidator from 'email-validator'

export const Login = () => {
    const [email, changeemail] = useState("")
    const [password, changepassword] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const showerrormessage = errormessage === "" ? "" : "text-danger"
    const submithandler = (e) => {
        e.preventDefault()
        changeerrormessage("")
        if (EmailValidator.validate(email) == false) {
            changeerrormessage("Please enter a valid email")
            return
        }
    }
    return (
        <>
            <div className="row container-fluid mt-5">
                <div className="col-4"></div>
                <div className="col-6 container-fluid">
                    <div className="border p-5">
                        <h3 className="text-center mb-3">Login</h3>
                        <form onSubmit={submithandler}>

                            <label className="form-label">Email</label>
                            <input value={email} onChange={(e) => changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Password</label>
                            <input value={password} onChange={(e) => changepassword(e.target.value)} className="form-control mb-3" type="password" />

                            <div className={`errormessage d-flex justify-content-center ${showerrormessage}`}>
                                {errormessage}
                            </div>

                            <div className="d-flex justify-content-center">
                                <button onClick={submithandler} className='btn btn-info text-center rounded-pill container-fluid loginupbutton'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>


        </>
    )
}