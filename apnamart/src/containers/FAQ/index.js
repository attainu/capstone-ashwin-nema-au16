import { StyledAccordionSummary } from '../../components'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './index.css'
export const FAQ = () => {
    return (
        <>
            <h3 className="text-center mt-5 mb-5">
                Frequently Asked Questions
            </h3>
            <div className="faqgrid">
                <div></div>
                <div >
                    <Accordion className="mb-3">
                        <StyledAccordionSummary className="p-2" expandIcon={<ExpandMoreIcon />}>
                            <strong>Can I cancel my order?</strong>
                        </StyledAccordionSummary>

                        <AccordionDetails>
                            Yes you are allowed to cancel order within one day of placing the order
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="mb-3">
                        <StyledAccordionSummary className="p-2" expandIcon={<ExpandMoreIcon />}>
                            <strong>What are the available modes of payments?</strong>
                        </StyledAccordionSummary>

                        <AccordionDetails>
                            Currently there are two modes of payments:
                            <li>Razoorpay Gateway</li>
                            <li>Cash</li>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="mb-3">
                        <StyledAccordionSummary className="p-2" expandIcon={<ExpandMoreIcon />}>
                            <strong>How many items of a product you can order?</strong>
                        </StyledAccordionSummary>

                        <AccordionDetails>
                            You can order maxium of 20 items of a particular product
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="mb-3">
                        <StyledAccordionSummary className="p-2" expandIcon={<ExpandMoreIcon />}>
                            <strong>What are the key features of this project?</strong>
                        </StyledAccordionSummary>

                        <AccordionDetails>
                            The key features of this project are as follows:
                            <li>Razorpay Payment Gateway: You can use razorpay gateway for placing the order</li>
                            <li>Location map: You can select your location on the map manually or by allow location access by clicking on
                                Allow location access option on the top right side of the map</li>
                            <li>Image zoom: You can view the magnified image of a product by hovering over the image in the product page of the product you want to buy</li>
                            <li>Order tracking: You can track the orders that you have placed</li>
                            <li>Google Login: You can login using your Google Account if you already have an Apnamart account</li>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="mb-3">
                        <StyledAccordionSummary className="p-2" expandIcon={<ExpandMoreIcon />}>
                            <strong>Key libraries,packages and frameworks used in this project</strong>
                        </StyledAccordionSummary>

                        <AccordionDetails>

                            <div className="mb-3 mt-2">
                                <strong>The key frameworks used are as follows: </strong>
                                <li>Express.js</li>
                            </div>

                            <div className="mb-3 mt-2">
                                <strong>The key libraries used are as follows: </strong>
                                <li>Material UI</li>
                                <li>Leaflet: For displaying map to the user </li>
                                <li>React</li>
                                <li>Redux</li>
                                <li>Mongoose </li>
                                <li>Google Auth Library: For authenticating token which is sent with Google Login while user is trying to log in</li>
                            </div>

                            <div className="mb-3 mt-2">
                                <strong>The key packages used are as follows: </strong>
                                <li>bcrypt: For becrypting user password</li>
                                <li>dotenv </li>
                                <li>jsonwebtoken </li>
                                <li>nanoid: For giving default id to every order placed by the user </li>
                                <li>opencage-api-client: For getting the location address of the user </li>
                                <li>razorpay: For using Razorpay Gateway</li>
                                <li>react-redux </li>
                                <li>redux-thunk</li>
                                <li>react-router-dom </li>
                                <li>axios </li>
                                <li>yup: For validation of login/signup data</li>
                                <li>react-leaflet: Package enabling react to display leaflet map </li>
                                <li>react-elastic-carousel: For showing all the items in a carousel</li>
                                <li>simplebar-react: Custom scrollbar for showing details</li>
                                <li>redux-persist: For persisting user authentication and cart details </li>
                                <li>react-use-measure: For getting dimensions of react elements and having custom css in them accordingly</li>
                                <li>react-bootstrap</li>
                                <li>react-detect-offline: For detecting that user is offline or online</li>
                                <li>react-google-login </li>
                                <li>react-image-magnify: For magnifying product image </li>
                                <li>material-ui-search-bar: Search bar used with header </li>
                            </div>

                        </AccordionDetails>
                    </Accordion>
                </div>
                <div></div>
            </div>
        </>
    )
}