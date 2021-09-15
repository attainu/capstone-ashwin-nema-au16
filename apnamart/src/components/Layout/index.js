import Header from '../Header'
import Footer from '../Footer'
import { ScrollToTop } from '../../utils'
import { Alert } from 'react-bootstrap'
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { Detector } from "react-detect-offline";

export const Layout = ({ children }) => {

    return (
        <>
            <ScrollToTop>
                <Detector
                    render={({ online }) => (
                        <Header isonline={online}>
                            {online === true ? <>{children}
                            </> : 
                                <div className="d-flex justify-content-center" >

                                    <Alert variant="danger">
                                        <ErrorRoundedIcon style={{ color: "red" }} />
                                        You are offline. Please check your Internet Connection.
                                    </Alert>
                                </div>
                    }
                        </Header>

                    )}
                />
                <Footer />
            </ScrollToTop>
        </>
    )
}