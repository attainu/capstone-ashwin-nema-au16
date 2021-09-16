import {OrderHistory} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import {getuserprofile} from '../../actions'
import { useEffect, useState } from 'react'
import {PATHS} from '../../config'
import './index.css'

export const Orderhistorypage = ({history}) => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.Profile)
    const auth = useSelector(state => state.Auth)
    const [pageisloaded, loadpage] = useState(false)
    useEffect(() => {
        if (Object.keys(profile).length <= 2 && auth !== " ") {
            dispatch(getuserprofile)
            return
        }
        else if (Object.keys(profile).length <=2){
            history.push(PATHS.HOME)
        }

        if (pageisloaded === false) {
            setTimeout(() => {
                loadpage(true)
            }, 300);
        } 
    },[profile, dispatch, history, auth, pageisloaded, loadpage])


    return (
        <>
        {
        Object.keys(profile).length > 2 && pageisloaded === true &&        
        <div className="orderhistorygrid">
            <div></div>
            <div>
            <OrderHistory /> 
            </div>
            <div>

            </div>
            
        </div>
        
        }
        </>
    )
}