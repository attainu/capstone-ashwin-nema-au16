import './index.css'
import {useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef,useCallback } from 'react'
import {opacitychanger} from '../../actions'

export const UserAccountInformation = () =>{
    const dispatch = useDispatch()
    const userprofile = useSelector(state => state.Profile)
    const opacity = useSelector(state => state.opacity)
    const accountinformationref = useRef()
    const { Name, Email, Mobilenumber } = userprofile

    const removeeditingmodal = useCallback(() => {
        dispatch(opacitychanger(1))
    }, [dispatch])

    const showeditingmodal = useCallback((e) => {
        e.stopPropagation()
        dispatch(opacitychanger(0.5))

        document.body.addEventListener('click', removeeditingmodal)
    }, [dispatch, removeeditingmodal])

    useEffect(() => {
        if ( accountinformationref.current !== null && accountinformationref.current !== undefined) {
            switch (opacity) {
                case 1:
                    accountinformationref.current.style.backgroundColor = "white"
                    document.body.removeEventListener('click', removeeditingmodal)
                    return

                case 0.5:
                    accountinformationref.current.style.backgroundColor = "rgb(0, 0, 0,0.1)"
                    return

                default:
                    return
            }
        }

        return () => {
            document.body.removeEventListener('click', showeditingmodal)
        }
    }, [opacity, showeditingmodal, removeeditingmodal])

    return (
        <>
        <div ref={accountinformationref} className="profileseperator2 ps-3 pb-3 pe-3 me-3 profilecontentdisplaycolor w-50">
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
                        <div onClick={showeditingmodal} className="editinglink text-danger">
                            Edit
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

