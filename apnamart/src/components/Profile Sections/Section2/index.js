import './index.css'
import {UserAccountInformation} from '../../Profile Section Component'

export const Section2 = ({ showditingmodal, selectoption2display ,changeoption2display }) => {
    return (
        <>
         { selectoption2display === "accountinformation" && <UserAccountInformation showditingmodal={showditingmodal} /> }
        </>
    )
}