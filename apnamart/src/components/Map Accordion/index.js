import { useState } from "react";
import { Card } from "react-bootstrap";
import { useTransition, animated } from 'react-spring'
import React from "react";
import LocationMap from '../User location map'

class CheckoutMap extends React.Component {
    render() {
        return (
            <>
            {this.props.isvisible === true ? 
            <div className="profilecontentdisplaycolor">
                <LocationMap setaddress={this.props.setaddress}/> 
            </div>:<></> }
            </>
        )
    }
}

const MapAccordion = ({userlocationaddress, setaddress}) => {
    const [isvisible, changevisibility] = useState(false)
    const transition = useTransition(isvisible, {
        from: { height: "0vh" },
        enter: { height: "60vh" },
        leave: { height: "0vh", display: null }
    })

    return (
        <div className="checkoutaccordion mt-5">
            <Card>
                <Card.Header>
                    <div className="checkoutaccordionheader">
                        <div className="me-3">
                            Current Address
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
                                Changecurrentlocation
                            </button>
                        </div>
                    </div>

                </Card.Header>
                {transition((style, item) =>
                    item ? <animated.div style={style} className="checkoutmapcontainer"><CheckoutMap isvisible={isvisible} setaddress={setaddress} /> </animated.div> : <></>)}
            </Card>

        </div>
    )
}

export default MapAccordion