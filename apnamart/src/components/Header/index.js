import './index.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchBar from 'material-ui-search-bar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { profile } from '../../actions'
import { useRef } from 'react';

const Header = ({ children }) => {
    const dispatch = useDispatch()
    const [searchbar, changesearchvalue] = useState("")
    const [count, changecount] = useState(0)
    const cartcount = useSelector(state => state.cartcount)
    const Auth = useSelector(state => state.Auth)
    const userprofile = useSelector(state => state.Profile)
    const { Name} = userprofile
    const dropdown = useRef()

    const AddToggleclass = () => {
        dropdown.current.classList.add("show")
    }

    const RemoveToggleclass = () => {
        dropdown.current.classList.remove("show")
    }

    const ClickToggle = () => {
        if (dropdown.current.classList.contains("show") == true) dropdown.current.classList.remove("show")

        else dropdown.current.classList.add("show")
    }

    useEffect(() => {
        changecount(cartcount)
    }, [cartcount])

    useEffect(() => {
        if (Auth !== "" && Object.keys(userprofile).length === 0) {
            dispatch(profile())
        }
    }, [Auth, dispatch, userprofile])

    return (
        <>
            <div className="mainwrapper">
                <div className="header bg-warning">
                    <div className="logo">
                        <Link className="text-dark text-decoration-none" to={PATHS.HOME} >ApnaMart</Link>
                    </div>

                    <div className="searchbar d-flex flex-column">
                        <SearchBar value={searchbar} onChange={(newvalue) => changesearchvalue(newvalue)}></SearchBar>
                        <div className="navspace"></div>
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
                        Object.keys(userprofile).length > 0 &&
                        <>
                            <div className="nav-item">
                                <div className="dropdown">
                                    <button onClick={ClickToggle} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="headerdropdownbutton text-wrap dropdown-toggle w-50">
                                        {Name.slice(0, 12)} 
                                    </button>
                                    <ul onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} ref={dropdown} className="dropdown-menu w-75" >
                                        <li><p className="dropdown-item" >Action</p></li>
                                        <li><p className="dropdown-item" >Another action</p></li>
                                        <li><p className="dropdown-item" >Something else here</p></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    }


                    <div className="nav-item position-relative">
                        <ShoppingCartIcon></ShoppingCartIcon>
                        {count > 0 && <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {count}
                        </span>}
                    </div>
                </div>
                {children}

                <div className="push"></div>

            </div>
        </>
    )
}

export default Header