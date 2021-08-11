import './index.css'
import { useState } from 'react'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator'
import './index.css'
import {phone} from 'phone';


export const Signup = () => {
    const [email, changeemail] = useState("")
    const [confirmpassword, changeconfirmedpassword] = useState("")
    const [password, changepassword] = useState("")
    const [mobilenumber, changedmobilenumber] = useState("")
    const [name, changename] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const showerrormessage = errormessage === "" ? "" : 'text-danger'
    let schema = yup.object().shape({
        Password:yup.string().required(),
        Name:yup.string().required()
    })

    const submithandler = (e) => {
        e.preventDefault()
        changeerrormessage('')

        if (EmailValidator.validate(email) === false) {
            changeerrormessage("Please enter a valid email")
            return
        }

        if (phone(`+91 ${mobilenumber}`).isValid === false) {
            changeerrormessage("Please provide a valid mobile number")
            return
        }

        if (password !== confirmpassword) {
            changeerrormessage("Password and confirm password do not match")
            return
        }

        schema.validate({Name:name,Password:password}, {abortEarly:false}).then(data => {
            console.log(data)
        }).catch(function (err) {
            changeerrormessage(err.errors[0])
        })
    }

    return (

        <>
            <div className="row container-fluid mt-5">
                <div className="col-4"></div>
                <div className="col-6 container-fluid">
                    <div className="border p-5">
                        <h3 className="text-center mb-3">Sign Up</h3>
                        <form onSubmit={submithandler}>

                            <label className="form-label">Name</label>
                            <input value={name} onChange={(e) => changename(e.target.value)} className="form-control mb-3" type="text" />

                            <label className="form-label">Email</label>
                            <input value={email} onChange={(e) => changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Mobile Number</label>
                            <input value={mobilenumber} onChange={(e) => changedmobilenumber(e.target.value)} className="form-control mb-3" type="tel" />

                            <label className="form-label">Password</label>
                            <input value={password} onChange={(e) => changepassword(e.target.value)} className="form-control mb-3" type="password" />

                            <label className="form-label">Confirm Password</label>
                            <input value={confirmpassword} onChange={(e) => changeconfirmedpassword(e.target.value)} className="form-control mb-3" type="password" />

                            <div className={`errormessage d-flex justify-content-center ${showerrormessage}`}>
                                {errormessage}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={submithandler} className='btn btn-info text-center rounded-pill container-fluid signupbutton'>
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