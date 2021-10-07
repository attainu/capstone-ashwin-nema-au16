import { useState } from 'react'
import Menu from '@mui/material/Menu';

export const ProfileIcon = ({ PATHS, dispatch, AccountCircleIcon, AccountCircle, Link, PowerSettingsNewIcon, IconButton, Logoutuser, ListIcon, Name }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            className="d-flex flex-column "
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className="px-3 ">
                <p className="text-center" > Hello {Name} </p>
            </div>
            <div className="px-3">
                <Link onClick={handleMenuClose} className="text-decoration-none" to={PATHS.PROFILE}><p className="dropdown-item" ><AccountCircleIcon color="primary" /> Profile</p></Link>
            </div>
            <div className="px-3">
                <Link onClick={handleMenuClose} className="text-decoration-none" to={PATHS.ORDERHISTORY}><p className="dropdown-item" ><ListIcon color="primary" /> Your orders</p></Link>
            </div>

            <div onClick={handleMenuClose} className="px-3">
                <p onClick={() => Logoutuser(dispatch)} className="dropdown-item cursorpointer " >  <PowerSettingsNewIcon /> Logout</p>
            </div>

        </Menu>
    );

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle color="primary" />
            </IconButton>
            {renderMenu}
        </>

    )
}