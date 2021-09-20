import './index.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { InputSearchBar } from '../Search bar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { getuserprofile, getproductsdata } from '../../actions'
import { useRef } from 'react';
import useMeasure from 'react-use-measure'
import { Logoutuser, getAuthinbrowser } from '../../utils'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListIcon from '@mui/icons-material/List';
import Badge from '@material-ui/core/Badge';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Header = ({ children, isonline }) => {
    const dispatch = useDispatch()
    const [count, changecount] = useState(0)
    const [ref, bounds] = useMeasure()
    const [childrenmargin, changemargin] = useState("80px")
    const [isdataloaded, changeloadedstate] = useState(false)

    useEffect(() => {
        changemargin(`${bounds.height}px`)
    }, [bounds])
    const { Auth, Profile, Productsdata: { products } } = useSelector(state => state)
    
    const cart = useSelector(state => state.Cart)

    const cartcount = Object.keys(cart).length
    const { Name } = Profile

    const dropdown = useRef()
    const auth = getAuthinbrowser()
    useEffect(() => {
        changecount(cartcount)
    }, [cartcount])

    useEffect(() => {
        if (Auth !== " " && Object.keys(Profile).length === 0 && isonline === true) {
            dispatch(getuserprofile())
            return
        }

        if (auth === " " && Object.keys(Profile).length > 0 && isonline === true) {
            Logoutuser(dispatch)
            return
        }

        if (auth !== Auth && isonline === true) {
            Logoutuser(dispatch)
            return
        }

    }, [Auth, dispatch, Profile, isonline, auth])


    useEffect(() => {
        if (Object.keys(products).length === 0 && isonline === true) {
            dispatch(getproductsdata(changeloadedstate))
        }

        if (Object.keys(products).length > 0) {
            changeloadedstate(true)
        }
       
    }, [products, dispatch, isonline,changeloadedstate])

    const AddToggleclass = () => {
        dropdown.current.classList.add("show")
    }

    const RemoveToggleclass = () => {
        dropdown.current.classList.remove("show")
    }

    const ClickToggle = () => {
        if (dropdown.current.classList.contains("show") === true) dropdown.current.classList.remove("show")
        else dropdown.current.classList.add("show")
    }

    return (
        <>

            <div className="mainwrapper">
                <div ref={ref} className="header space-between bg-warning pb-2 w-100">
                    <div className="logo">
                        <Link className="text-dark text-decoration-none" to={PATHS.HOME} >ApnaMart</Link>
                    </div>

                    <div className="searchbar d-flex flex-column">
                        <InputSearchBar />

                    </div>

                    <div className="nav-item">
                    </div>

                    {
                        Object.keys(Profile).length === 0 &&
                        <>
                            <div className="nav-item">
                                <Link className="text-dark text-decoration-none" to={PATHS.LOGIN} >Login</Link>
                            </div>

                            <div className="nav-item">
                                <Link className="text-dark text-decoration-none" to={PATHS.SIGNUP} >Sign up</Link>
                            </div>
                        </>
                    }

                    {
                        Object.keys(Profile).length > 0 && Name !== undefined &&
                        <>
                            <div className="nav-item">
                                <div className="dropdown">
                                    <button onClick={ClickToggle} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="headerdropdownbutton text-wrap dropdown-toggle w-50">
                                        {Name.slice(0, 12)}
                                    </button>
                                    <ul onClick={RemoveToggleclass} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} ref={dropdown} className="dropdown-menu w-75" >
                                        <Link className="text-decoration-none" to={PATHS.PROFILE}><li><p className="dropdown-item" ><AccountCircleIcon color="primary" /> Profile</p></li></Link>
                                        <Link className="text-decoration-none" to={PATHS.ORDERHISTORY}><li><p className="dropdown-item" ><ListIcon color="primary" /> Your orders</p></li></Link>
                                        <li onClick={() => Logoutuser(dispatch)}><p className="dropdown-item" > <PowerSettingsNewIcon /> Logout</p></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    }

                    <div className="nav-item">
                        <Link to={PATHS.CART} className="text-decoration-none">
                            {
                                count === 0 ? <ShoppingCartIcon style={{ color: "white" }}></ShoppingCartIcon> :
                                    <Badge badgeContent={count} color="secondary"> <ShoppingCartIcon style={{ color: "white" }}></ShoppingCartIcon> </Badge>
                            }

                        </Link>
                    </div>
                </div>

                <div style={{ marginTop: childrenmargin }} className="children">
                    {isdataloaded === false && isonline === true ? <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack> : <>{children} </>}

                </div>

                <div className="push"></div>

            </div>
        </>
    )
}

export default Header