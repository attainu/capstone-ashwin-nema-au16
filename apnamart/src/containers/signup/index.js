import { useRef, useState, useContext } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { PATHS, axiosinstance } from '../../config'
import { Redirect } from 'react-router'
import { mobilenumber_validator, showmodalwithmessageandvariant, OnlineContext, userisofflinemessage, saveuserdetailsinclientandredirect } from '../../utils'
import { NotificationModal } from '../../components'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'

export const Signup = ({ history }) => {
    const dispatch = useDispatch()
    const isonline = useContext(OnlineContext)

    const signuplayout = useMediaQuery('(max-width:600px)')
    const buttonlayout = useMediaQuery('(max-width:250px)')

    const [Email, Changeemail] = useState("")
    const [Confirmedpassword, ChangeConfirmedPassword] = useState("")
    const [Password, ChangePassword] = useState("")
    const [Mobilenumber, ChangeMobilenumber] = useState("")
    const [Name, Changename] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const [modal, showmodal] = useState(false)

    const mobilenumber = useRef("")
    const userprofile = useSelector(state => state.Profile)

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
            showmodalwithmessageandvariant(showmodal, "Mobile number cannot be of more than 10 digits", changeerrormessage)
            return
        }

        if (e.target.value.length === 10 && mobilenumber_validator(newmobilenumber) !== true) {
            showmodalwithmessageandvariant(showmodal, "Please provide a valid Indian mobile number", changeerrormessage)
            return
        }

        mobilenumber.current = e.target.value
        ChangeMobilenumber(e.target.value)
    }

    const submithandler = (e) => {
        e.preventDefault()
        if (isonline !== true) {
            showmodalwithmessageandvariant(showmodal, userisofflinemessage, changeerrormessage)
            return
        }

        if (mobilenumber_validator(Number(Mobilenumber)) !== true) {
            showmodalwithmessageandvariant(showmodal, "Please provide a valid Indian mobile number", changeerrormessage)
            return
        }

        if (Password !== Confirmedpassword) {
            showmodalwithmessageandvariant(showmodal, "Password and Confirm password do not match", changeerrormessage)
            return
        }


        schema.validate({ Name, Password, Email }, { abortEarly: false }).then(async userdata => {
            const response = await axiosinstance.post('/user/signup', { ...userdata, Mobilenumber: mobilenumber.current })
            if (response.data.error !== "") {
                showmodalwithmessageandvariant(showmodal, response.data.error, changeerrormessage)
                return
            }
            saveuserdetailsinclientandredirect(response.data, dispatch, history)
            return
        }).catch(function (err) {
            if (err.errors !== undefined) {
                showmodalwithmessageandvariant(showmodal, err.errors[0], changeerrormessage)
                return
            }
            showmodalwithmessageandvariant(showmodal, "Sorry some error occurred. Please try again later", changeerrormessage)
        })
    }

    return (

        <>
            {
                Object.keys(userprofile).length > 0 && <Redirect to={PATHS.HOME} />
            }
            <div className="container-fluid mt-5">
                <div className={`${signuplayout === true ? "col-12 container-fluid" : "col-6 container-fluid"}`}>
                    <div className="border p-5 w-100">
                        <h3 className="text-center mb-3">Sign Up</h3>
                        <form onSubmit={submithandler}>

                            <label className="form-label">Name</label>
                            <input value={Name} onChange={(e) => Changename(e.target.value)} className="form-control mb-3" type="text" />

                            <label className="form-label">Email</label>
                            <input value={Email} onChange={(e) => Changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Mobile Number</label>
                            <input value={Mobilenumber} onChange={setmobilenumber} className="form-control mb-3" type="tel" />

                            <label className="form-label">Password</label>
                            <input value={Password} onChange={(e) => ChangePassword(e.target.value)} className="form-control mb-3" type="password" />

                            <label className="form-label">Confirm Password</label>
                            <input value={Confirmedpassword} onChange={(e) => ChangeConfirmedPassword(e.target.value)} className="form-control mb-3" type="password" />

                            <div className="d-flex justify-content-center">
                                <Button type="submit" className={`bg-info text-dark text-center mb-3 ${!buttonlayout && "rounded-pill"}`} variant="contained">
                                    Submit
                                </Button>
                            </div>
                            <div className="d-flex justify-content-center smalltext">
                                <Link className="text-decoration-none" to={PATHS.LOGIN}>Already have an account? Click here to login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <NotificationModal show={modal} centered={true} onHide={showmodal} currentmodalmessage={errormessage} alertvariant="danger" successmessage="" />
        </>
    )
}