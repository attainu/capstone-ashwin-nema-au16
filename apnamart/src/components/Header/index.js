import './index.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchBar from 'material-ui-search-bar'
import { useState } from 'react'

const Header = ({ children }) => {
    const [searchbar, changesearchvalue] = useState("")
    const [count, changecount] = useState(0)
    return (
        <>
            <div className="mainwrapper">
                <div className="header bg-warning">
                    <div className="logo">
                        ApnaMart
                    </div>

                    <div className="searchbar d-flex flex-column">
                        <SearchBar value={searchbar} onChange={(newvalue) => changesearchvalue(newvalue)}></SearchBar>
                        <div className="navspace"></div>
                    </div>

                    <div className="nav-item">
                    </div>

                    <div className="nav-item">
                        Login
                    </div>

                    <div className="nav-item">
                        Sign Up
                    </div>

                    <div className="nav-item position-relative">
                        <ShoppingCartIcon></ShoppingCartIcon>
                        {count > 0 && <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
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