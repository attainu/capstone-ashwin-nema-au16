import './index.css'
import { Modal, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { mobilenumber_validator, showmodalwithmessageandvariant } from '../../utils'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { axiosinstance } from '../../config'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { setprofile } from '../../actions'
import EditIcon from '@mui/icons-material/Edit'; 
import Fab from '@mui/material/Fab';
import { NotificationModal } from '../Notification Modal'

export const UserAccountInformation = () => {
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.Profile)
    const name = userprofile.Name
    const email = userprofile.Email
    const mobilenumber = userprofile.Mobilenumber
    const { Location } = userprofile

    const [modal, showmodal] = useState(false)
    const [notificationmodal, shownotificationmodal] = useState(false)
    const [modalnotificationmessage, changemodalnotificationmessage] = useState("")
    const [notificationmodalvariant, changenotificationmodalvariant] = useState("success")
    const [Name, Changename] = useState(name)
    const [Email, Changeemail] = useState(email)
    const [Mobilenumber, changeMobilenumber] = useState(mobilenumber)
    const [NewPassword, ChangeNewPassword] = useState("")
    const [Password, ChangePassword] = useState("")

    const schema = yup.object().shape({
        Password: yup.string(),
        NewPassword: yup.string(),
        Name: yup.string().required(),
        Email: yup.string().email().required()
    })

    const openmodal = () => {
        showmodal(true)
    }

    const setnotificationmodal = (message, variant) => {
        showmodalwithmessageandvariant(shownotificationmodal, message, changemodalnotificationmessage, variant, changenotificationmodalvariant)
    }

    const setmobilenumber = (e) => {
        const newmobilenumber = Number(e.target.value)
        if (isNaN(newmobilenumber)) {
            return
        }

        if (e.target.value.length > 10) {
            setnotificationmodal("Mobile Number cannot be of more than 10 digits", "danger")
            return
        }


        if (e.target.value.length === 10 && mobilenumber_validator(newmobilenumber) !== true) {
            setnotificationmodal("Please provide a valid Indian mobile number", "danger")
            return
        }

        changeMobilenumber(e.target.value)
    }

    const saveuserdata = (e) => {
        e.preventDefault()

        if (mobilenumber_validator(Number(Mobilenumber)) !== true) {
            setnotificationmodal("Please provide a valid Indian mobile number", "danger")
            return
        }

        schema.validate({ Name, Password, Email, NewPassword }, { abortEarly: false }).then(async userdata => {
            const response = await axiosinstance.put("/user/profile", { ...userdata, Mobilenumber })

            if (response.data.error !== "") {
                setnotificationmodal(response.data.error, "danger")
                return
            }

            dispatch(setprofile({ Name, Email, Location, Mobilenumber }))
            setnotificationmodal("Your profile has successfully been updated", "success")

            return

        }).catch(function (err) {
            if (err.errors !== undefined && err.errors.length > 0) {
                setnotificationmodal(err.errors[0], "danger")
                return
            }
            setnotificationmodal(err.error, "danger")
        })

    }
    return (
        <>
            <div className="profileseperator2 ps-3 pb-3 pe-3 me-3 profilecontentdisplaycolor w-50">
                <h5 className="pt-2">Account Information</h5>
                <div className="accountinformation pt-2">
                    <div>
                        <span className="lead fs-6">Name</span>
                        <p className="mb-3">{name.slice(0, 35)}</p>

                        <span className="lead fs-6">Email</span>
                        <p>{email.slice(0, 35)}</p>
                    </div>

                    <div className="relativeimage">
                        <span className="lead fs-6 smalltext">Mobile number</span>
                        <p>{mobilenumber}</p>

                        <div onClick={openmodal} className="editinglink text-danger">
                            Edit
                        </div>

                        <Modal centered show={modal} contentClassName="modalwithoutcolor" onHide={() => showmodal(false)}>
                            <div className="d-flex justify-content-center mb-3">
                                <CancelRoundedIcon className="closeeditingbutton" onClick={() => showmodal(false)} />
                            </div>
                            <Alert variant="warning">
                                <h5 className="mb-3 text-center">Edit Information <Fab variant="extended" size="small" color="error" aria-label="edit">
                                    <EditIcon />
                                </Fab> </h5>

                                <form onSubmit={saveuserdata} >
                                    <div>
                                        <label className="form-label">Name</label>
                                    </div>
                                    <input value={Name} onChange={(e) => Changename(e.target.value)} className="modalinput mb-3" type="text" />

                                    <div>
                                        <label className="form-label">Email</label>
                                    </div>
                                    <input value={Email} onChange={(e) => Changeemail(e.target.value)} className="modalinput mb-3" type="email" />

                                    <div>
                                        <label className="form-label">Mobile Number</label>
                                    </div>

                                    <input value={Mobilenumber} onChange={setmobilenumber} className="modalinput mb-3" type="tel" />

                                    <div>
                                        <label className="form-label">Password</label>
                                    </div>
                                    <input value={Password} onChange={(e) => ChangePassword(e.target.value)} className="modalinput mb-3" type="password" />

                                    <div>
                                        <label className="form-label">New Password</label>
                                    </div>

                                    <input value={NewPassword} onChange={(e) => ChangeNewPassword(e.target.value)} className="modalinput mb-3" type="password" />

                                    <div className="ultrasmalltext text-danger">
                                        *Enter Password and New Password only when you want to change your password
                                    </div>

                                    <div className="d-flex justify-content-center mt-2">
                                        <button type="submit" className="btn btn-warning w-75 rounded-pill">Save changes</button>
                                    </div>
                                </form>


                            </Alert>
                        </Modal>

                        <NotificationModal show={notificationmodal} centered={false} currentmodalmessage={modalnotificationmessage} onHide={shownotificationmodal} alertvariant={notificationmodalvariant} successmessage="Your profile has successfully been updated" />
                    </div>
                </div>
            </div>
        </>
    )
}