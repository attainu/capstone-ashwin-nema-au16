import './index.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
export const Userintro = () => {
    const imageandnameref = useRef()
    const {Name} = useSelector(state => state.Profile)
    const opacity = useSelector(state => state.opacity)

    useEffect(() => {
        if (imageandnameref.current !== null && imageandnameref.current !== undefined) {
            switch (opacity) {
                case 1:
                    imageandnameref.current.style.backgroundColor = "white"
                    return

                case 0.5:
                    imageandnameref.current.style.backgroundColor = "rgb(0, 0, 0,0.1)"
                    return

                default:
                    return
            }
        }
    }, [opacity])

    return (
        <>
            <div ref={imageandnameref} className="imageandname pt-2 profilecontentdisplaycolor">
                <div className="relativeimage">
                    <AccountCircleIcon color="primary" style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute" }}></AccountCircleIcon>
                </div>
                <div className="text-wrap">
                    <span className="smalltext">Hello,</span>
                    <p >{Name.slice(0, 35)} </p>
                </div>
            </div>
        </>
    )
}