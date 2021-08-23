import './index.css'
import { setlocationcoordinates, getuseraddress } from '../../../actions'
import L from 'leaflet'
import React from 'react'
import { connect } from 'react-redux'


const mapStatetoprops = state => {
    return {
        coordinates: state.Usercoordinates,
        profilelocation: state.Profile.Location,
        address: state.Useraddress
    }
}

const mapdispatchtoprops = (dispatch) => {
    return {
        getusercoordinates: (latitude, longtitude) => dispatch(setlocationcoordinates([latitude, longtitude])),
        getuseraddress: (latitude, longtitude) => dispatch(getuseraddress(latitude, longtitude))
    }
}

class LocationMap extends React.Component {
    constructor() {
        super()
        this.leafletmap = React.createRef()
    }

    componentDidMount() {
        let coordinatesofmap = this.props.profilelocation
        this.props.getusercoordinates(coordinatesofmap[0], coordinatesofmap[1])
        this.props.getuseraddress(coordinatesofmap[0], coordinatesofmap[1])
        const usermap = L.map(this.leafletmap.current).setView(coordinatesofmap, 16)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(usermap)

        const customermarker = L.marker(coordinatesofmap)
        customermarker.addTo(usermap)
        const customercircle = L.circle(coordinatesofmap, { radius: 100 }).addTo(usermap)
        const centermarker = () => {
            const newLatLng = new L.LatLng(usermap.getCenter().lat, usermap.getCenter().lng);
            customermarker.setLatLng(newLatLng)
            customercircle.setLatLng(newLatLng)
        }
        usermap.addEventListener('move', centermarker)

        const getuserlocation = () => {
            this.props.getusercoordinates(usermap.getCenter().lat, usermap.getCenter().lng)
            this.props.getuseraddress(usermap.getCenter().lat, usermap.getCenter().lng)
        }

        usermap.addEventListener('dragend', getuserlocation)
        usermap.addEventListener('zoomend', () => {
            this.props.getusercoordinates(usermap.getCenter().lat, usermap.getCenter().lng)
            this.props.getuseraddress(usermap.getCenter().lat, usermap.getCenter().lng)
            usermap.removeEventListener('move', centermarker)
            usermap.addEventListener('move', centermarker)
            usermap.removeEventListener('dragend', getuserlocation)
            usermap.addEventListener('dragend', getuserlocation)

        })
    }

    componentDidUpdate() {
        console.log(this.props.address)
    }

    render() {
        return (
            <>
                <div className="profileseperator2 pe-3 me-3 ps-3 pb-3  ">
                    <h3>Select your location</h3>
                    <div ref={this.leafletmap} className="leafletmap">
                    </div>


                    <div className="mt-3 p-3 profilecontentdisplaycolor ">
                        {this.props.address.length > 1 &&
                            this.props.address.map((item, index) => {
                                if (index !== this.props.address.length - 1) {
                                    return (
                                        <span key={index}>
                                            {item},
                                        </span>
                                    )
                                }

                                else {
                                    return (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    )
                                }

                            })
                        }


                        {this.props.address.length === 1 && this.props.address[0] === "Sorry we do not serve your area" ?
                            <span className="text-danger">Sorry we do not serve your area</span> : <></>
                        }
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        {this.props.address[0] === "Sorry we do not serve your area" ?
                            <button className="btn btn-primary rounded-pill disabled">
                                Save Location
                            </button> :
                            
                            <button className="btn rounded-pill btn-primary">
                                Save Location
                            </button>
                        }

                    </div>


                </div>
            </>
        )
    }
}

export default connect(mapStatetoprops, mapdispatchtoprops)(LocationMap)