import './index.css'


export const Layout = ({ children }) => {

    return (
        <>
            <div className="row bg-warning nav">
                <div className="col-1 mt-3">
                    ApnarMart
                </div>
                <div className="col-1"></div>
                <div className="col-7 searchbar mt-2">
                    <div className="searchicon">
                        <i class="bi bi-search"></i>
                    </div>
                    <input className="searchinput" type="text" />
                </div>
                <div className="col-1 mt-3">
                    <div>
                        Login
                    </div>
                </div>
                <div className="col-1 mt-3">
                    Signup
                </div>
                <div className="col-1 cartimagenav">
                    <img className="cartimage" src="https://res.cloudinary.com/ash006/image/upload/v1628411139/shopping_cart_zcyab8.png"></img>
                </div>
            </div>
            {/* <div className="row bg-warning nav">
                <div className="col-1">
                    <p className="text-center">
                        ApnaMart
                    </p>
                </div>
                <div className="col-4">
                    B
                </div>
                <div className="col-3">
                    C
                </div>

                <div className="col-3"></div>

                <div className="col-1">
                <span className="rounded-circle bg-danger items-added">45</span>
                    <div className="carticon d-flex justify-content-center">
                        <div className="shopping-icon">
                            <i className="bi-cart3"></i>
                        </div>
                    </div>
                </div>
            </div> */}
            {children}
        </>
    )
}