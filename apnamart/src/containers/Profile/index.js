import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { PATHS } from '../../config'
import { useEffect, useCallback, useState } from 'react'
import { profile, opacitychanger } from '../../actions'
import {Section1 ,Section2} from '../../components/Profile Sections'

const Profile = ({ history }) => {
    const userprofile = useSelector(state => state.Profile)
    const opacity = useSelector(state => state.opacity)
    const Auth = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [selectoption2display, changeoption2display] = useState("accountinformation")

    const removeeditingmodal = useCallback(() => {
        dispatch(opacitychanger(1))
    }, [dispatch])

    const showditingmodal = useCallback((e) => {
        e.stopPropagation()
        dispatch(opacitychanger(0.5))

        document.body.addEventListener('click', removeeditingmodal)
    }, [dispatch, removeeditingmodal])

    useEffect(() => {
        if (Auth !== "" && Object.keys(userprofile).length === 0) {
            dispatch(profile())
        }

        else if (Object.keys(userprofile).length === 0) {
            history.push(PATHS.HOME)
        }

        return () => {
            document.body.style.backgroundColor = "white"
            dispatch(opacitychanger(1))
            document.body.removeEventListener('click', showditingmodal)
        }
    }, [userprofile, history, dispatch, Auth, showditingmodal])

    useEffect(() => {

        switch (opacity) {
            case 1:
                document.body.style.backgroundColor = "#f1f3f6"
                document.body.removeEventListener('click', removeeditingmodal)
                return

            case 0.5:
                document.body.style.backgroundColor = "rgb(0, 0, 0,0.5)"
                return

            default:
                return
        }
    }, [opacity, removeeditingmodal])

    const { Name } = userprofile
    return (
        <>
            {Name !== undefined &&
                <>
                    <h4 className="mb-3 mt-3 ms-5">My Profile </h4>

                    <div className="profilecontent mt-5 ms-3">
                        <Section1 selectoption2display={selectoption2display} changeoption2display={changeoption2display} />

                        <Section2 selectoption2display={selectoption2display} changeoption2display={changeoption2display} showditingmodal={showditingmodal} />
                    </div>

                </>
            }
        </>
    )
}

export default Profile