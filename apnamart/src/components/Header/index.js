import './index.css'
import { InputSearchBar, HeaderContentLayout } from '../Header Components'
import { useDispatch, useSelector } from 'react-redux';
import { ProductsdataloadedContext } from '../../utils'
import { useOnlineconnectioncheck } from '../../Hooks'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Alert } from 'react-bootstrap';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = ({ children, isonline }) => {
    const dispatch = useDispatch()

    const { Auth, Profile, Productsdata: { products } } = useSelector(state => state)

    const [isuseronline, isproductsdatafetched] = useOnlineconnectioncheck(dispatch, isonline, Auth, Profile, products)

    const headersearchbarquery = useMediaQuery('(min-width:750px)')

    return (
        <>

            <div className="mainwrapper">
                <div className={`header bg-warning pb-2 w-100 ${headersearchbarquery === true ? "space-between" : ""}`}>
                    {
                        headersearchbarquery === true ? <HeaderContentLayout headersearchbarquery={headersearchbarquery} /> :
                            <>
                                <div  className="space-between">
                                    <HeaderContentLayout headersearchbarquery={headersearchbarquery} />
                                </div>
                                <div className="container-fluid d-flex justify-content-center mt-3">
                                    <div className="col-10">
                                        <InputSearchBar />
                                    </div>
                                </div>
                            </>
                    }

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
                            <div className="d-flex justify-content-center mt-5" >

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