import './index.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {InputSearchBar} from '../Search bar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { getuserprofile, getproductsdata } from '../../actions'
import { useRef } from 'react';
import useMeasure from 'react-use-measure'
import {logoutuser} from '../../utils'

const Header = ({ children }) => {
    const dispatch = useDispatch()
    const [count, changecount] = useState(0)
    const [ref, bounds] = useMeasure()
    const [childrenmargin, changemargin] = useState("80px")

    useEffect(() => {
        changemargin(`${bounds.height}px`) 
    }, [bounds])
    const Auth = useSelector(state => state.Auth)
    const userprofile = useSelector(state => state.Profile)
    const Productsdata = useSelector(state => state.Productsdata)
    const cart = useSelector(state => state.Cart)

    const cartcount = Object.keys(cart).length
    const { Name } = userprofile

    const dropdown = useRef()

    useEffect(() => {
        changecount(cartcount)
    }, [cartcount])

    useEffect(() => {
        if (Auth !== " " && Object.keys(userprofile).length === 0) {
            dispatch(getuserprofile())
        }
    }, [Auth, dispatch, userprofile])

    useEffect(() => {
        if (Object.keys(Productsdata.subcategories).length === 0 && Object.keys(Productsdata.products).length === 0 && Object.keys(Productsdata.categories).length === 0 ) {
            dispatch(getproductsdata())
        }   
    }, [Productsdata, dispatch])

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
                <div ref={ref}  className="header space-between bg-warning pb-2 w-100">
                    <div className="logo">
                        <Link className="text-dark text-decoration-none" to={PATHS.HOME} >ApnaMart</Link>
                    </div>

                    <div className="searchbar d-flex flex-column">
                        <InputSearchBar />

                    </div>

                    <div className="nav-item">
                    </div>

                    {
                        Object.keys(userprofile).length === 0 &&
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
                        Object.keys(userprofile).length > 0 && Name !== undefined &&
                        <>
                            <div className="nav-item">
                                <div className="dropdown">
                                    <button onClick={ClickToggle} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="headerdropdownbutton text-wrap dropdown-toggle w-50">
                                        {Name.slice(0, 12)}
                                    </button>
                                    <ul onClick={RemoveToggleclass} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} ref={dropdown} className="dropdown-menu w-75" >
                                        <Link className="text-decoration-none" to={PATHS.PROFILE}><li><p className="dropdown-item" >Profile</p></li></Link>
                                        <li onClick={() => logoutuser(dispatch)}><p className="dropdown-item" >Logout</p></li>
                                        <li><p className="dropdown-item" >Delete Account</p></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    }

                    <div className="nav-item position-relative">
                        <Link to={PATHS.CART} className="text-decoration-none">
                            <ShoppingCartIcon style={{ color: "white" }}></ShoppingCartIcon>
                            {count > 0 && <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                {count}
                            </span>}
                        </Link>
                    </div>
                </div>

                <div style={{marginTop:childrenmargin } } className="children">
                {children}
                </div>

                <div className="push"></div>

            </div>
        </>
    )
}

export default Header