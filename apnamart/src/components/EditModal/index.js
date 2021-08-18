import './index.css'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { useState } from 'react';
import { email_validator, mobilenumber_validator, getAuthinbrowser } from '../../utils'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { profile, opacitychanger } from '../../actions'

const EditModal = () => {
    const dispatch = useDispatch()
    const userprofile = useSelector(state => state.Profile)
    const { Name, Email, Mobilenumber } = userprofile
    const [name, changename] = useState(Name)
    const [email, changeemail] = useState(Email)
    const [mobilenumber, changemobilenumber] = useState(Mobilenumber)
    const [password, changepassword] = useState("")
    const [newpassword, changenewpassword] = useState("")
    const [error, changeerrormessage] = useState("")
    
    const stoppropagation = (e) => {
        e.stopPropagation()
    }

    const datasubmitbutton = () => {
        changeerrormessage("")
        if (name === "") {
            changeerrormessage("Name is a required field")
            return
        }

        if (mobilenumber_validator(mobilenumber) === false) {
            changeerrormessage("Mobile number provided is not valid")
            return
        }

        if (email_validator(email) === false) {
            changeerrormessage("Email provided is not valid")
            return
        }
        const authvalue = getAuthinbrowser() || ""
        const auth = { "Auth": authvalue }



        axios({
            method: 'post',
            url: 'http://localhost:5000/editprofile',
            data: {
                Name: name,
                Email: email,
                Password: password,
                Mobilenumber: mobilenumber,
                NewPassword: newpassword
            },
            headers: auth
        }).then(resp => {
            if (resp.data.error === "") {
                dispatch(profile())
                dispatch(opacitychanger(1))
                return
            }
            changeerrormessage(resp.data.error)
        }).catch(() => {
            changeerrormessage("Error occurred at backend")
        })
    }

    return (
        <>
            <div className="userdetailsmodal">
                <span className="closebutton">
                    <CancelRoundedIcon ></CancelRoundedIcon>
                </span>
                <div onClick={stoppropagation} className="modalcontent mt-3 pb-5">
                    <div className="">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Edit Information</h5>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label className="form-label">Name</label>
                        </div>
                        <input className="modalinput mb-3" type="text" value={name} onChange={(e) => changename(e.target.value)} />

                        <div>
                            <label className="form-label">Email</label>
                        </div>
                        <input className="modalinput mb-3" type="email" value={email} onChange={(e) => changeemail(e.target.value)} />

                        <div>
                            <label className="form-label">Mobile Number</label>
                        </div>

                        <input className="modalinput mb-3" type="tel" value={mobilenumber} onChange={(e) => changemobilenumber(e.target.value)} />

                        <div>
                            <label className="form-label">Password</label>
                        </div>
                        <input className="modalinput mb-3" type="password" value={password} onChange={(e) => changepassword(e.target.value)} />

                        <div>
                            <label className="form-label">New Password</label>
                        </div>

                        <input className="modalinput mb-3" type="password" value={newpassword} onChange={(e) => changenewpassword(e.target.value)} />

                        <div className="text-danger mb-3 inputerror">
                            {error}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button onClick={datasubmitbutton} type="button" className="btn btn-primary w-75 rounded-pill">Save changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal