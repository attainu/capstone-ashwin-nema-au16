import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { PATHS } from '../../config'
import { useEffect, useState } from 'react'
import { profile, opacitychanger } from '../../actions'
import { Userintro, OrderSection, Viewcartoption, Viewlocationoption, UserAccountInformation, LocationMap } from '../../components'
import Usercart from '../Cart'

const Profile = ({ history }) => {
    const userprofile = useSelector(state => state.Profile)
    const opacity = useSelector(state => state.opacity)
    const Auth = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [selectcomponenttodisplay, changedisplaycomponent] = useState("accountinformation")

    useEffect(() => {
        if (Auth.length !== 1 && Object.keys(userprofile).length === 0) {
            dispatch(profile())
        }

        else if (Object.keys(userprofile).length === 0) {
            history.push(PATHS.HOME)
        }
        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            document.body.style.backgroundColor = "white"
            dispatch(opacitychanger(1))
        }
    }, [userprofile, history, dispatch, Auth])

    useEffect(() => {

        switch (opacity) {
            case 1:
                document.body.style.backgroundColor = "#f1f3f6"
                return

            case 0.5:
                document.body.style.backgroundColor = "rgb(0, 0, 0,0.5)"
                return

            default:
                return
        }
    }, [opacity])

    const { Name } = userprofile

    return (
        <>
            {Name !== undefined &&
                <>
                    <h4 className="mb-3 mt-3 ms-5">My Profile </h4>

                    <div className="profilecontent mt-5 ms-3">
                        <div className="profileseperator1 me-3 pe-3 ps-3 pb-3">
                            <Userintro selectcomponenttodisplay={selectcomponenttodisplay} changedisplaycomponent={changedisplaycomponent} />
                            <OrderSection />
                            <Viewlocationoption selectcomponenttodisplay={selectcomponenttodisplay} changedisplaycomponent={changedisplaycomponent} />
                            <Viewcartoption selectcomponenttodisplay={selectcomponenttodisplay} changedisplaycomponent={changedisplaycomponent} />
                        </div>

                        {selectcomponenttodisplay === "accountinformation" && <UserAccountInformation />}

                        {selectcomponenttodisplay === "locationmap" &&
                            <div className="profileseperator2 pe-3 me-3 ps-3 pb-3  w-50">
                                <LocationMap />
                            </div>}

                        {selectcomponenttodisplay === "mycart" &&
                            <div className="profileseperator2 w-50">
                                <Usercart nomargin={true} />
                            </div>
                        }

                        <div className="profileseperator1">

                        </div>

                    </div>

                </>
            }
        </>
    )
}

export default Profile