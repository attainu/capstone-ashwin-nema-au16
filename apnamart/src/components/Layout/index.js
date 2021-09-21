import Header from '../Header'
import Footer from '../Footer'
import { OnlineContext, ScrollToTop } from '../../utils'
import { Detector } from "react-detect-offline";

export const Layout = ({ children }) => {
    return (
        <>
            <ScrollToTop>
                <Detector
                    render={({ online }) => (
                        <Header isonline={online}>
                            <OnlineContext.Provider value={online} >
                            {children}
                            </OnlineContext.Provider>
                        </Header>
                    )}
                />
                <Footer />
            </ScrollToTop>
        </>
    )
}