import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosinstance, PATHS } from "../../config"
import { validateuserpageaccess } from '../../utils'
import { useParams } from "react-router"
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


import './index.css'
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const OrderProgress = () => {
    const progress = useRef(0)
    const [currentprogress, changecurrentprogress] = useState(0)
    useEffect(() => {
        const progressinteral = setInterval(() => {
            if (progress.current < 75) {
                progress.current += 28
                changecurrentprogress(progress => progress + 25 )
            }
            else {
                clearInterval(progressinteral)
            }
        }, 300);

    },[])
    console.log(progress)
    return (
        <>
            <ProgressBar
                percent={currentprogress}
                filledBackground="#ffc107"
            >
                <Step transition="">
                    {({ accomplished }) => (
                        <div className="position-relative"> 
                            {/* <CircleRoundedIcon   className="position-relative" style={{fill:"green"}}  color="primary" /> */}
                        </div>
                    )}
                </Step>
                <Step transition="">
                    {({ accomplished }) => (
                        <div> </div>
                    )}
                </Step>
                <Step transition="">
                    {({ accomplished }) => (
                        <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30"
                            src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                        />
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                            {index + 1}
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                            {index + 1}
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                            {index + 1}
                        </div>
                    )}
                </Step>
            </ProgressBar>
        </>
    )
}

export const Orderdetails = ({ location: { state }, history }) => {
    const dispatch = useDispatch()
    const { orderid } = useParams()
    const { Profile, Auth } = useSelector(state => state)
    const [orderdetails, changeorderdetails] = useState(state)
    useEffect(() => {
        const ispageaccessvalid = validateuserpageaccess(dispatch, history, Profile, Auth)
        if (orderdetails === undefined && ispageaccessvalid) {
            axiosinstance.post(`/user/order/orderdetails/${orderid}`).then(({ data }) => {
                changeorderdetails(data)
            }).catch(() => {
                history.push(PATHS.NOTFOUND)
            })
        }
    }, [history, dispatch, Profile, Auth, orderid, changeorderdetails, orderdetails])

    return (
        <>
            {
                orderdetails !== undefined &&
                <>
                    <div className="orderdetailsdivider">
                        <div>

                        </div>
                        <div>
                            <OrderProgress />
                        </div>

                    </div>
                </>
            }
        </>
    )
}