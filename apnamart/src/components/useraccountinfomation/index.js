import './index.css'
import { Modal, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { mobilenumber_validator } from '../../utils'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import axios from 'axios';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { setprofile } from '../../actions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';

// url: 'https://apna-mart.herokuapp.com/getprofile',
// url: 'http://localhost:3000/getprofile',
// url: 'http://localhost:5000/getprofile',

export const UserAccountInformation = () => {
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.Profile)
    const name = userprofile.Name
    const email = userprofile.Email
    const mobilenumber = userprofile.Mobilenumber
    const {Location} = userprofile

    const authvalue = useSelector(state => state.Auth)

    const [modal, showmodal] = useState(false)
    const [errormodal, showerrormodal] = useState(false)
    const [errormessage, changeerrormessage] = useState("")
    const [datasavedmodal, showdatasavedmodal] = useState(false)

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

    const hidemodal = () => {
        showmodal(false)
    }

    const openmodal = () => {
        showmodal(true)
    }

    const hideerrormodal = () => {
        showerrormodal(false)
    }

    const hidedatesavedmodal = () => {
        showdatasavedmodal(false)
    }

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
            showerrormodal(true)
            return
        }

        changeMobilenumber(e.target.value)
    }

    const saveuserdata = (e) => {
        e.preventDefault()
        changeerrormessage("")

        if (mobilenumber_validator(Number(Mobilenumber)) !== true) {
            changeerrormessage("Please provide a valid Indian mobile number")
            showerrormodal(true)
            return
        }

        const auth = { "Auth": authvalue }
        schema.validate({ Name, Password, Email, NewPassword }, { abortEarly: false }).then(async userdata => {
            const response = await axios({
                method: 'put',
                url: 'http://localhost:5000/user/profile',
                data: {
                    ...userdata,
                    Mobilenumber,
                },
                headers: auth
            })

            if (response.data.error !== "") {
                changeerrormessage(response.data.error)
                showerrormodal(true)
                return
            }

            dispatch(setprofile({Name, Email, Location, Mobilenumber}))
            showdatasavedmodal(true)
            return

        }).catch(function (err) {
            changeerrormessage(err.errors[0])
            showerrormodal(true)
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

                        <Modal centered show={modal} contentClassName="modalwithoutcolor" onHide={hidemodal}>
                            <div className="d-flex justify-content-center mb-3">
                                <CancelRoundedIcon className="closeeditingbutton" onClick={hidemodal} />
                            </div>
                            <Alert variant="warning">
                                <h5 className="mb-3 text-center">Edit Information <EditIcon /> </h5>

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

                        <Modal show={errormodal} contentClassName="modalwithoutcolor" onHide={hideerrormodal}>
                            <Alert variant="danger">
                                <h6>
                                    {errormessage}
                                </h6>
                            </Alert>
                        </Modal>

                        <Modal show={datasavedmodal} contentClassName="modalwithoutcolor" onHide={hidedatesavedmodal}>
                            <Alert variant="success">
                                <h6>
                                    Your profile has successfully been updated <CheckCircleIcon style={{ color: "green" }} />
                                </h6>
                            </Alert>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}