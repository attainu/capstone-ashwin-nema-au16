import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PATHS } from '../../../config'
import { ShoppingIcon, ProfileIcon, ProfileDropdown, InputSearchBar } from '../index'
import { useRef } from 'react';
import ListIcon from '@mui/icons-material/List';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Logoutuser } from '../../../utils'
import useMediaQuery from '@mui/material/useMediaQuery'

export const HeaderContentLayout = ({ headersearchbarquery }) => {
    const { Profile: { Name }, Auth: { loginstate }, Cart } = useSelector(state => state)
    const count = Object.keys(Cart).length
    const dispatch = useDispatch()
    const shoppingcartquery = useMediaQuery('(max-width:250px)')

    const props = { Link, PATHS, count, dispatch, Name, useRef, ListIcon, PowerSettingsNewIcon, AccountCircleIcon, Logoutuser, AccountCircle, IconButton }
    return (
        <>
            <>
                <div className="logo">
                    <Link className="text-dark text-decoration-none" to={PATHS.HOME} >
                        <img className="logoimage" src="https://res.cloudinary.com/ash006/image/upload/v1633338159/APNAMART_preview_rev_1_lmweri.jpg" alt="Apna Mart" />
                    </Link>
                </div>

                {
                    headersearchbarquery &&
                    <>
                        <div className="searchbar d-flex flex-column">
                            <InputSearchBar />
                        </div>
                        <div className="nav-item">
                        </div>
                    </>
                }

                {
                    !loginstate &&
                    <>
                        {
                            headersearchbarquery ?
                                <>
                                    <div className="nav-item">
                                        <Link className="text-dark text-decoration-none" to={PATHS.LOGIN} >Login</Link>
                                    </div>

                                    <div className="nav-item">
                                        <Link className="text-dark text-decoration-none" to={PATHS.SIGNUP} >Sign up</Link>
                                    </div>
                                </>
                                :
                                <div className="loginsignupgrid">
                                    <div className="nav-item">
                                        <Link className="text-dark text-decoration-none" to={PATHS.LOGIN} >Login</Link>
                                    </div>

                                    <div className="nav-item">
                                        <Link className="text-dark text-decoration-none" to={PATHS.SIGNUP} >Sign up</Link>
                                    </div>
                                </div>
                        }

                    </>
                }

                {
                    loginstate && Name !== undefined && headersearchbarquery &&
                    <ProfileDropdown {...props} />
                }

                {
                    !headersearchbarquery ?
                        <div className="profileandshoppingcarticon">
                            {
                                loginstate &&
                                <ProfileIcon {...props} />
                            }
                            <div className={`${shoppingcartquery && "shoppingicon"}`}>
                                <ShoppingIcon {...props} />
                            </div>
                        </div> :
                        <div className="nav-item">
                            <ShoppingIcon {...props} />
                        </div>
                }
            </>
        </>
    )
}