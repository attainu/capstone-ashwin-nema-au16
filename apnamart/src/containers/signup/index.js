import './index.css'
import { useRef, useState, useContext } from 'react'
import * as yup from 'yup'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { authsetter, setprofile } from '../../actions'
import { PATHS, axiosinstance } from '../../config'
import { Redirect } from 'react-router'
import { mobilenumber_validator, showmodalwithmessageandvariant, OnlineContext } from '../../utils'
import {NotificationModal} from '../../components'

export const Signup = ({ history }) => {
    const dispatch = useDispatch()
    const isonline = useContext(OnlineContext)

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
            showmodalwithmessageandvariant(showmodal, "Mobile number cannot be of more than 10 digit", changeerrormessage)
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
            showmodalwithmessageandvariant(showmodal, "You are not online. Please check your internet connection", changeerrormessage)
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
                dispatch(authsetter(" "))
                showmodalwithmessageandvariant(showmodal, response.data.error, changeerrormessage)
                return
            }
            const { Name, Email, Location, token, Mobilenumber } = response.data
            dispatch(setprofile({ Name, Email, Location, Mobilenumber }))
            dispatch(authsetter(token))
            history.push(PATHS.HOME)
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
            <div className="row container-fluid mt-5">
                <div className="col-4"></div>
                <div className="col-6 container-fluid">
                    <div className="border p-5">
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
                                <button type="submit" className='btn btn-info text-center rounded-pill container-fluid signupbutton'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>

            <NotificationModal show={modal} centered={true} onHide={showmodal} currentmodalmessage={errormessage} alertvariant="danger" successmessage=""/>
        </>
    )
}