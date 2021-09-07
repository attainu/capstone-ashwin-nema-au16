import { useState } from "react";
import { Card } from "react-bootstrap";
import { useTransition, animated } from 'react-spring'
import React from "react";
import LocationMap from '../User location map'

const MapAccordion = ({userlocationaddress}) => {
    const [isvisible, changevisibility] = useState(false)
    const transition = useTransition(isvisible, {
        from: { height: "0vh" },
        enter: {minHeight: "65vh" },
        leave: { height: "0vh", display: null }
    })

    return (
        <div className="checkoutaccordion mt-5">
            <Card>
                <Card.Header>
                    <div className="space-between checkoutaccordionheader">
                        <div className="me-3">
                            <h6>Current delivery address</h6>
                            <div>
                                {
                                    userlocationaddress.map((item, index) => {
                                        if (index !== userlocationaddress.length - 1) {
                                            return (
                                                <span key={index} >
                                                    {item},
                                                </span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span key={index} >
                                                    {item}
                                                </span>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="bordernone p-2"
                                style={{ backgroundColor: '#ffc107' }}
                                onClick={() => changevisibility(currenvisbility => !currenvisbility)}
                            >
                                Change address
                            </button>
                        </div>
                    </div>
                </Card.Header>
                {transition((style, item) =>
                    item ? <animated.div style={style} className="checkoutmapcontainer"> {isvisible === true && <LocationMap />} </animated.div> : <></>)}
            </Card>

        </div>
    )
}

export default MapAccordion