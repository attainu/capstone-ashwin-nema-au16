import Header from '../Header'
import Footer from '../Footer'
import { ScrollToTop } from '../../utils'
import { Alert } from 'react-bootstrap'
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { Offline, Online } from "react-detect-offline";

export const Layout = ({ children }) => {

    return (
        <>
            <ScrollToTop>

                <Header>
                    <Online>
                        {children}
                    </Online>

                    <Offline>
                        <div className="d-flex justify-content-center" >
                            <Alert variant="danger">
                                <ErrorRoundedIcon style={{ color: "red" }} />
                                Sorry data could not be fetched. Please check your Internet Connection and reload the page
                            </Alert>
                        </div>
                    </Offline>
                </Header>
                <Footer />
            </ScrollToTop>

        </>
    )
}