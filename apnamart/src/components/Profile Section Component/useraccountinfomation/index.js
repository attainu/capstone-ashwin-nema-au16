import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

export const UserAccountInformation = ({ showditingmodal }) =>{
    const userprofile = useSelector(state => state.Profile)
    const opacity = useSelector(state => state.opacity)
    const accountinformationref = useRef()
    const { Name, Email, Mobilenumber } = userprofile

    useEffect(() => {
        if ( accountinformationref.current !== null && accountinformationref.current !== undefined) {
            switch (opacity) {
                case 1:
                    accountinformationref.current.style.backgroundColor = "white"
                    return

                case 0.5:
                    accountinformationref.current.style.backgroundColor = "rgb(0, 0, 0,0.1)"
                    return

                default:
                    return
            }
        }
    }, [opacity])

    return (
        <>
        <div ref={accountinformationref} className="profileseperator2 ps-3 pb-3 pe-3 me-3 profilecontentdisplaycolor">
                <h5 className="pt-2">Account Information</h5>
                <div className="accountinformation pt-2">
                    <div>
                        <span className="lead fs-6">Name</span>
                        <p className="mb-3">{Name.slice(0, 35)}</p>

                        <span className="lead fs-6">Email</span>
                        <p>{Email.slice(0, 35)}</p>
                    </div>

                    <div className="relativeimage">
                        <span className="lead fs-6 smalltext">Mobile number</span>
                        <p>{Mobilenumber}</p>
                        <div onClick={showditingmodal} className="editinglink text-danger">
                            Edit
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

