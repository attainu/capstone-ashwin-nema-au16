import './index.css'

const Header = ({ children }) => {
    return (
        <>
            <div className="mainwrapper">
                <div className="row bg-warning nav">
                    <div className="col-1 mt-3 navcol">
                        ApnarMart
                    </div>
                    <div className="col-1 navcol"></div>
                    <div className="col-7 searchbar mt-2 navcol">
                        <div className="searchicon">
                            <i className="bi bi-search"></i>
                        </div>
                        <input className="searchinput" type="text" />
                    </div>
                    <div className="col-1 mt-3 navcol">
                        <div>
                            Login
                        </div>
                    </div>
                    <div className="col-1 mt-3 navcol">
                        Signup
                    </div>
                    <div className="col-1 cartimagenav navcol">
                        <span className="bg-danger rounded-circle cartitems">56</span>
                        <img className="cartimage" src="https://res.cloudinary.com/ash006/image/upload/v1628411139/shopping_cart_zcyab8.png"></img>

                    </div>
                </div>
                {children}

                <div className="push"></div>

            </div>
        </>
    )
}

export default Header