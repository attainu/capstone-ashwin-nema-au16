import {OrderHistory} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './index.css'
import {validateuserpageaccess} from '../../utils'

export const Orderhistorypage = ({history}) => {
    const dispatch = useDispatch()
    const {Profile,Auth} = useSelector(state => state)
    const [pageisloaded, loadpage] = useState(false)
    useEffect(() => {
        const accessvalidation = validateuserpageaccess(dispatch, history, Profile, Auth)
        if ( pageisloaded === false && accessvalidation) {
            loadpage(true)
        } 
    },[Profile, dispatch, history, Auth, pageisloaded, loadpage])

    return (
        <>
        {
        Object.keys(Profile).length > 2 && pageisloaded === true &&        
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