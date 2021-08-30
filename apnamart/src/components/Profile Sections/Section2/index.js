import './index.css'
import {UserAccountInformation, LocationMap} from '../../Profile Section Components'

export const Section2 = ({ showditingmodal, selectcomponenttodisplay , changecomponenttodisplay }) => {
    return (
        <>
         { selectcomponenttodisplay === "accountinformation" && <UserAccountInformation showditingmodal={showditingmodal} /> }
         { selectcomponenttodisplay === "locationmap" && 
         <div className="profileseperator2 pe-3 me-3 ps-3 pb-3  w-50">
         <LocationMap selectcomponenttodisplay={selectcomponenttodisplay}  changecomponenttodisplay={changecomponenttodisplay} />
         </div>    }
        </>
    )
}