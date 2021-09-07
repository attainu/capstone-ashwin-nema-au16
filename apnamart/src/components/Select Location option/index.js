import RoomIcon from '@material-ui/icons/Room';
export const Viewlocationoption = ({selectcomponenttodisplay, changedisplaycomponent}) => {

    const changecursor = selectcomponenttodisplay === "locationmap" ? "" : "cursorpointer"
    const showlocationmap = () => {
        changedisplaycomponent("locationmap")
    }

    return (
        <>
        <div onClick={showlocationmap}  className={`mt-5 p-2 d-flex profilecontentdisplaycolor ${changecursor}`}>
            <div className="flex-grow-1">
            View my location
            </div>
            <RoomIcon style={{ color: "orange" }} />
        </div>
        </>
    )
}