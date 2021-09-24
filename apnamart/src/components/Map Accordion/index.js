import React from "react";
import LocationMap from '../User location map'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import {StyledAccordionSummary} from '../Accordion Summary'

const MapAccordion = ({ userlocationaddress }) => {
    return (
        <div className="checkoutaccordion mt-5">
            <Accordion >
                <StyledAccordionSummary
                    aria-controls="panel1a-content"
                    className="checkoutaccordionheader"
                >
                    <div className="space-between w-100 align-items-center">
                        <div>
                            <h6 >Current delivery address</h6>
                            <div>
                                {
                                    userlocationaddress.join(", ")
                                }
                            </div>

                        </div>
                        <div > <Button className="bg-warning" variant="contained" color="primary">
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