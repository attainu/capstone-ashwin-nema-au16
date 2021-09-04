import './index.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
export const Userintro = ({selectcomponenttodisplay , changedisplaycomponent}) => {
    const {Name} = useSelector(state => state.Profile)
    const changecursor = selectcomponenttodisplay === "accountinformation" ? "" : "cursorpointer"
    const showaccountinformation = () => {
        changedisplaycomponent("accountinformation")
    }

    return (
        <>
            <div onClick={showaccountinformation} className={`imageandname pt-2 profilecontentdisplaycolor ${changecursor}`}>
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