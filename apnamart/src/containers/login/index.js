import './index.css'
import { useState } from 'react'
import * as EmailValidator from 'email-validator'
import axios from 'axios'
import { PATHS } from '../../config'
import { authsetter, profile } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

export const Login = ({ history }) => {
    const dispatch = useDispatch()
    const [email, changeemail] = useState("")
    const [password, changepassword] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const showerrormessage = errormessage === "" ? "" : "text-danger"
    const userprofile = useSelector(state => state.Profile)

    const submithandler = (e) => {
        e.preventDefault()
        changeerrormessage("")

        if (EmailValidator.validate(email) === false) {
            changeerrormessage("Please enter a valid email")
            return
        }

        // url: 'http://localhost:3000/editprofile',
        // url: 'http://localhost:5000/editprofile',
        // url: 'https://apna-mart.herokuapp.com/editprofile'
        axios.post('http://localhost:5000/login', {
            Email: email,
            Password: password
        }).then(function (response) {
            if (response.data.error !== "") {
                dispatch(authsetter(" "))
                changeerrormessage(response.data.error)
                return
            }

            dispatch(authsetter(response.data.token))
            dispatch(profile())
            history.push(PATHS.HOME)
        })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            {
                Object.keys(userprofile).length > 0 && <Redirect to={PATHS.HOME} />
            }

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