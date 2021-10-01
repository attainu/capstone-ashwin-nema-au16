import './index.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { InputSearchBar } from '../Search bar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { useRef } from 'react';
import { Logoutuser, ProductsdataloadedContext } from '../../utils'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListIcon from '@mui/icons-material/List';
import Badge from '@material-ui/core/Badge';
import { useOnlineconnectioncheck } from '../../Hooks'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Alert } from 'react-bootstrap';

const Header = ({ children, isonline }) => {
    const dispatch = useDispatch()
    const [count, changecount] = useState(0)
    const { Auth, Profile, Productsdata: { products } } = useSelector(state => state)
    const [isuseronline, isproductsdatafetched] = useOnlineconnectioncheck(dispatch, isonline, Auth, Profile, products)


    const cart = useSelector(state => state.Cart)

    const cartcount = Object.keys(cart).length
    const { Name } = Profile

    const dropdown = useRef()
    useEffect(() => {
        changecount(cartcount)
    }, [cartcount])

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
                <div  className="header space-between bg-warning pb-2 w-100">
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

                <div className="children">
                    {isuseronline === true ?
                        <ProductsdataloadedContext.Provider value={isproductsdatafetched} >
                            <>
                                {children}
                            </>
                        </ProductsdataloadedContext.Provider>
                        :
                        <>
                            <div className="d-flex justify-content-center" >

                                <Alert variant="danger">
                                    <ErrorRoundedIcon style={{ color: "red" }} />
                                    You are offline. Please check your Internet Connection.
                                </Alert>
                            </div>
                        </>
                    }

                </div>

            </div>
        </>
    )
}

export default Header