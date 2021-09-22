import {OrderHistory} from '../../components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import {PATHS} from '../../config'
import './index.css'

export const Orderhistorypage = ({history}) => {
    const {Profile,Auth} = useSelector(state => state)
    useEffect(() => {
        if (Object.keys(Profile).length === 0 && Auth === " "){
            history.push(PATHS.HOME)
        }
    },[Profile, history, Auth])

    return (
        <>
        {
        Object.keys(Profile).length > 0 &&      
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