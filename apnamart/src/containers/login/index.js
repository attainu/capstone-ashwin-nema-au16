import './index.css'
import { useState, useContext } from 'react'
import { PATHS, axiosinstance } from '../../config'
import { authsetter, setprofile,storeordercount, logoutsetter } from '../../actions'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { showmodalwithmessageandvariant, OnlineContext, userisofflinemessage } from '../../utils'
import {NotificationModal} from '../../components'
import {withoutAuthentication} from '../../Higher Order Components'
export const Login = ({ history }) => {
    const dispatch = useDispatch()
    const isonline = useContext(OnlineContext)
    const [Email, Changeemail] = useState("")
    const [Password, Changepassword] = useState("")
    const [errormessage, changeerrormessage] = useState("")

    const [modal, showmodal] = useState(false)

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

            if (response.data.error !== "") {
                dispatch(logoutsetter())
                showmodalwithmessageandvariant(showmodal, response.data.error, changeerrormessage)
                return
            }

            const { Name, Email, Mobilenumber, Location, ordercount, token } = response.data
            dispatch(authsetter(token))
            dispatch(setprofile({ Name, Email, Mobilenumber, Location }))
            dispatch(storeordercount(ordercount))
            history.push(PATHS.HOME)
            return

        }).catch(function (err) {
            if (err.errors !== undefined && err.errors.length > 0) {
                showmodalwithmessageandvariant(showmodal, err.errors[0], changeerrormessage)
                return
            }
            showmodalwithmessageandvariant(showmodal,"Sorry something went wrong" , changeerrormessage)
        })
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
                            <input value={Email} onChange={(e) => Changeemail(e.target.value)} className="form-control mb-3" type="email" />

                            <label className="form-label">Password</label>
                            <input value={Password} onChange={(e) => Changepassword(e.target.value)} className="form-control mb-3" type="password" />

                            <div className="d-flex justify-content-center">
                                <button type="submit" className='btn btn-info text-center rounded-pill container-fluid loginupbutton'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>

            <NotificationModal show={modal} centered={true} currentmodalmessage={errormessage} onHide={showmodal} alertvariant="danger" successmessage="" />
        </>
    )
}

export default withoutAuthentication(Login)