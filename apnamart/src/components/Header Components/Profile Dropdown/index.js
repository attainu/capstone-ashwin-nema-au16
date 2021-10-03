export const ProfileDropdown = ({ Name, dispatch, Link, PATHS, useRef, ListIcon, PowerSettingsNewIcon, AccountCircleIcon, Logoutuser }) => {
    const dropdown = useRef()

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
        <div className="nav-item">
            <div className="dropdown">
                <button onClick={ClickToggle} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="headerdropdownbutton text-wrap dropdown-toggle w-50">
                    {Name.slice(0, 12)}
                </button>
                <ul onClick={RemoveToggleclass} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} ref={dropdown} className="dropdown-menu w-75" >
                    <Link className="text-decoration-none" to={PATHS.PROFILE}><li><p className="dropdown-item" ><AccountCircleIcon color="primary" /> Profile</p></li></Link>
                    <Link className="text-decoration-none" to={PATHS.ORDERHISTORY}><li><p className="dropdown-item" ><ListIcon color="primary" /> Your orders</p></li></Link>
                    <li onClick={() => Logoutuser(dispatch)}><p className="dropdown-item cursorpointer" > <PowerSettingsNewIcon /> Logout</p></li>
                </ul>
            </div>
        </div>
    )
}