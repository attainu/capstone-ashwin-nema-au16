import React from "react";
import LocationMap from '../User location map'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { StyledAccordionSummary } from '../Styled Material Ui Components'
import useMediaQuery from '@mui/material/useMediaQuery'
const MapAccordion = ({ userlocationaddress }) => {
    const rightpaddingquery = useMediaQuery('(max-width:500px)')
    const marginquery = useMediaQuery('(max-width:800px) and (min-width:500px)')
    return (
        <div className="checkoutaccordion mt-5">
            <Accordion>
                <StyledAccordionSummary
                    aria-controls="panel1a-content"
                    className={`checkoutaccordionheader px-2 ${rightpaddingquery && "pe-4"}`}
                >
                    <div className="space-between w-100 align-items-center ">
                        <div className={`${marginquery && "me-3"}`}>
                            <h6 >Current delivery address</h6>
                            <div>
                                {
                                    userlocationaddress.join(", ")
                                }
                            </div>

                        </div>
                        <div > <Button className="bg-warning p-2" variant="contained" color="primary">
                            Change address
                        </Button></div>
                    </div>

                </StyledAccordionSummary>
                <AccordionDetails>
                    <LocationMap />

                </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default MapAccordion