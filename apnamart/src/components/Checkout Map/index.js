import React from "react"
import LocationMap from '../Profile Section Components/User location map'

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

export default CheckoutMap