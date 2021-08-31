import RoomIcon from '@material-ui/icons/Room';
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
export const Viewlocationoption = ({selectcomponenttodisplay, changedisplaycomponent}) => {
    const viewlocationref = useRef()
    const opacity = useSelector(state => state.opacity)
    const changecursor = selectcomponenttodisplay === "locationmap" ? "" : "cursorpointer"
    
    const showlocationmap = () => {
        changedisplaycomponent("locationmap")
    }

    useEffect(() => {
        if (viewlocationref.current !== null && viewlocationref.current !== undefined) {
            switch (opacity) {
                case 1:
                    viewlocationref.current.style.backgroundColor = "white"
                    return

                case 0.5:
                    viewlocationref.current.style.backgroundColor = "rgb(0, 0, 0,0.1)"
                    return

                default:
                    return
            }
        }
    }, [opacity])
    
    return (
        <>
        <div onClick={showlocationmap} ref={viewlocationref} className={`mt-5 p-2 d-flex profilecontentdisplaycolor ${changecursor}`}>
            <div className="flex-grow-1">
            View my location
            </div>
            <RoomIcon style={{ color: "orange" }} />
        </div>
        </>
    )
}