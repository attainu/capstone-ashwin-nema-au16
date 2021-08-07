import './index.css'
import { useState } from 'react'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator'
const schema = yup.object().shape({
    password: yup.string().required()
})
export const Login = () => {
    const [email, changeemail] = useState("")
    const [password, changepassword] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const showerrormessage = errormessage === "" ? "": "text-danger"     
    const submithandler = () => {
        if (EmailValidator.validate(email) == false) {
            changeerrormessage("Please enter a valid email")
            return
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-6">
                    <div className="container-fluid border mt-5 p-5 mainlogincontent">
                        <p className="text-center mb-2">Login</p>
                        <label className="mb-2">Email</label>
                        <input required={false} value={email} onChange={(e) => changeemail(e.target.value)} className="form-control mb-2" type='email' />

                        <label className="mb-2">Password</label>
                        <input value={password} onChange={(e) => changepassword(e.target.value)} className="form-control mb-3" type='password' />

                        <div className={`mb-2 ${showerrormessage} loginerrormessage`}>
                            {errormessage}
                        </div>
                        <button onClick={submithandler} className='btn btn-info text-center rounded-pill loginbutton container-fluid'>
                            Submit
                        </button>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    )
}