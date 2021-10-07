import { useState, useContext } from 'react'
import { PATHS, axiosinstance } from '../../config'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { showmodalwithmessageandvariant, OnlineContext, userisofflinemessage, saveuserdetailsinclientandredirect } from '../../utils'
import { CustomModalNotificationComponent, NotificationModal } from '../../components'
import { withoutAuthentication } from '../../Higher Order Components'
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'

export const Login = ({ history, responseGoogle }) => {
    const dispatch = useDispatch()

    const isonline = useContext(OnlineContext)

    const [Email, Changeemail] = useState("")
    const [Password, Changepassword] = useState("")
    const [errormessage, changeerrormessage] = useState("")
    const [modal, showmodal] = useState(false)

    const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

    const loginlayout = useMediaQuery('(max-width:600px)')
    const buttonlayout = useMediaQuery('(max-width:250px)')

    const schema = yup.object().shape({
        Password: yup.string().required(),
        Email: yup.string().email().required()
    })

    const submithandler = (e) => {
        e.preventDefault()
        changeerrormessage("")
        if (isonline !== true) {
            showmodalwithmessageandvariant(showmodal, userisofflinemessage, changeerrormessage)
            return
        }

        schema.validate({ Password, Email }, { abortEarly: false }).then(async userdata => {
            const response = await axiosinstance.post('/user/login', { ...userdata })
            const { error } = response.data
            if (error !== undefined) {
                showmodalwithmessageandvariant(showmodal, error, changeerrormessage)
                return
            }
            saveuserdetailsinclientandredirect(response.data, dispatch, history)
            return

        }).catch(function (err) {
            if (err.errors !== undefined && err.errors.length > 0) {
                showmodalwithmessageandvariant(showmodal, err.errors[0], changeerrormessage)
                return
            }
            showmodalwithmessageandvariant(showmodal, "You don't have an Apnamart account", changeerrormessage)
        })
    }

    responseGoogle = (response) => {
        const { error } = response
        if (error !== undefined) {
            return
        }
        axiosinstance.post("/user/login/google", { token: response.tokenId }).then(({ data }) => {
            saveuserdetailsinclientandredirect(data, dispatch, history)
        }).catch(() => {
            showmodalwithmessageandvariant(showmodal, "You don't have an Apnamart account", changeerrormessage)
        })
    }
    return (
        <>

            <div className="container-fluid mt-5">
                <div className={`${loginlayout === true ? "col-12 container-fluid" : "col-6 container-fluid"}`}>
                    <div className="border p-5 w-100">
                        <h3 className="text-center mb-3">Login</h3>
                        <form onSubmit={submithandler}>

                            <label className="form-label">Email</label>
                            <input value={Email} onChange={(e) => Changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Password</label>
                            <input value={Password} onChange={(e) => Changepassword(e.target.value)} className="form-control mb-3" type="password" />

                            <div className="d-flex justify-content-center">
                                <Button type="submit" className={`bg-info text-dark text-center ${!buttonlayout && "rounded-pill"}`} variant="contained">
                                    Submit
                                </Button>
                            </div>
                        </form>

                        <div className="lead d-flex justify-content-center smalltext mt-2">
                            OR
                        </div>
                        <div className="d-flex justify-content-center  mt-3">
                            <GoogleLogin
                                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Log in with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />

                        </div>

                        <div className="d-flex justify-content-center mt-3 smalltext">
                            <Link className="text-decoration-none" to={PATHS.SIGNUP}>New to ApnaMart ? Click here to Sign Up</Link>
                        </div>
                    </div>

                </div>

            </div>

            {errormessage !== "You don't have an Apnamart account" ? <NotificationModal show={modal} centered={true} currentmodalmessage={errormessage} onHide={showmodal} alertvariant="danger" successmessage="" /> :
                <NotificationModal show={modal} centered={true} onHide={showmodal} alertvariant="warning" additionalcustomcomponent={true} Customcomponent={<CustomModalNotificationComponent message="You don't have an Apnamart account." linkmessage="Click Here to " link={PATHS.SIGNUP} linktext="Sign Up" />} />
            }
        </>
    )
}

export default withoutAuthentication(Login)