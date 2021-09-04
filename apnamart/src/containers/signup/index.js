import './index.css'
import { useState } from 'react'
import * as yup from 'yup'
import './index.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authsetter, profile } from '../../actions'
import { PATHS } from '../../config'
import { Redirect } from 'react-router'
import { Modal } from 'react-bootstrap'
import { mobilenumber_validator } from '../../utils'

export const Signup = ({ history }) => {
    const dispatch = useDispatch()
    const [Email, changeemail] = useState("")
    const [Confirmedpassword, Changeconfirmedpassword] = useState("")
    const [Password, changepassword] = useState("")
    const [Mobilenumber, changedmobilenumber] = useState("")
    const [Name, changename] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const userprofile = useSelector(state => state.Profile)
    const [modal, showmodal] = useState(false)
    const schema = yup.object().shape({
        Password: yup.string().required(),
        Name: yup.string().required(),
        Email: yup.string().email().required()
    })

    const setmobilenumber = (e) => {
        const newmobilenumber = Number(e.target.value)
        if (isNaN(newmobilenumber)) {
            return
        }

        if (e.target.value.length > 10) {
            return
        }

        if (e.target.value.length === 10 && mobilenumber_validator(newmobilenumber) !== true) {
            changeerrormessage("Please provide a valid Indian mobile number")
            showmodal(true)
            return
        }

        changedmobilenumber(e.target.value)
    }

    const hidemodal = () => {
        showmodal(false)
    }

    const submithandler = (e) => {
        e.preventDefault()
        changeerrormessage('')

        if (mobilenumber_validator(Number(Mobilenumber)) !== true) {
            changeerrormessage("Please provide a valid Indian mobile number")
            showmodal(true)
            return
        }

        if (Password !== Confirmedpassword) {
            changeerrormessage("Password and Confirm password do not match")
            showmodal(true)
            return
        }
        // url: 'http://localhost:3000/editprofile',
        // url: 'http://localhost:5000/editprofile',
        // url: 'https://apna-mart.herokuapp.com/editprofile'
        schema.validate({ Name, Password, Email }, { abortEarly: false }).then(async userdata => {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/user/signup',
                data: {
                    ...userdata,
                    Mobilenumber,
                }
            })

            if (response.data.error !== "") {
                dispatch(authsetter(" "))
                changeerrormessage(response.data.error)
                return
            }

            dispatch(authsetter(response.data.token))
            dispatch(profile())
            history.push(PATHS.HOME)
            return

        }).catch(function (err) {
            changeerrormessage(err.errors[0])
            showmodal(true)
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
                        <h3 className="text-center mb-3">Sign Up</h3>
                        <form onSubmit={submithandler}>

                            <label className="form-label">Name</label>
                            <input value={Name} onChange={(e) => changename(e.target.value)} className="form-control mb-3" type="text" />

                            <label className="form-label">Email</label>
                            <input value={Email} onChange={(e) => changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Mobile Number</label>
                            <input value={Mobilenumber} onChange={setmobilenumber} className="form-control mb-3" type="tel" />

                            <label className="form-label">Password</label>
                            <input value={Password} onChange={(e) => changepassword(e.target.value)} className="form-control mb-3" type="password" />

                            <label className="form-label">Confirm Password</label>
                            <input value={Confirmedpassword} onChange={(e) => Changeconfirmedpassword(e.target.value)} className="form-control mb-3" type="password" />

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

            <Modal centered show={modal} contentClassName="modalalert py-5" onHide={hidemodal}>
                <span className="d-flex justify-content-center ">
                    <div>
                        <h5 className="text-danger">{errormessage}</h5>
                    </div>
                </span>

            </Modal>
        </>
    )
}