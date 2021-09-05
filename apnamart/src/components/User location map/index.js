import './index.css'
import { setlocationcoordinates, getuseraddress } from '../../actions'
import L from 'leaflet'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { setprofile } from '../../actions'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const mapStatetoprops = state => {
    return {
        coordinates: state.Usercoordinates,
        profilelocation: state.Profile.Location,
        address: state.Useraddress,
        auth:state.Auth,
        userprofile:state.Profile
    }
}

const mapdispatchtoprops = (dispatch) => {
    return {
        getusercoordinates: (latitude, longtitude) => dispatch(setlocationcoordinates([latitude, longtitude])),
        getuseraddress: (latitude, longtitude) => dispatch(getuseraddress(latitude, longtitude)),
        setuserprofile: (userdata) => dispatch(setprofile(userdata))
    }
}

class LocationMap extends React.Component {
    constructor() {
        super()
        this.leafletmap = React.createRef()
        this.state = {
            displaymodaltouser: false,
            modalmessage: ""
        }
    }

    componentDidMount() {
        const [userlatitude, userlongtitude] = this.props.userprofile.Location
        this.props.getusercoordinates(userlatitude, userlongtitude)
        this.props.getuseraddress(userlatitude, userlongtitude)
        const usermap = L.map(this.leafletmap.current).setView([userlatitude, userlongtitude], 16)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(usermap)

        const customermarker = L.marker([userlatitude, userlongtitude])
        customermarker.addTo(usermap)
        const customercircle = L.circle([userlatitude, userlongtitude], { radius: 100 }).addTo(usermap)
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

        const onuserzoomchange = () => {
            this.props.getusercoordinates(usermap.getCenter().lat, usermap.getCenter().lng)
            this.props.getuseraddress(usermap.getCenter().lat, usermap.getCenter().lng)
            usermap.removeEventListener('move', centermarker)
            usermap.addEventListener('move', centermarker)
            usermap.removeEventListener('dragend', getuserlocation)
            usermap.addEventListener('dragend', getuserlocation)
        }
        usermap.addEventListener('zoomend', onuserzoomchange)
    }

    render() {
        const setmodalmessage = (message) => {
            this.setState({ ...this.state, modalmessage: message })
        }

        const showmodal = () => {
            const auth = { "Auth": this.props.auth  }
            return axios({
                method: 'put',
                url: 'http://localhost:5000/user/location',
                data: {
                    location: `${this.props.coordinates[0]},${this.props.coordinates[1]}`,
                    Location: this.props.coordinates
                },
                headers: auth

            }).then((resp) => {
                this.setState({ ...this.state, displaymodaltouser: true, modalmessage: "" })

                if (resp.data.error !== "") {
                    return
                }

                setmodalmessage("Location saved")
                const {Name, Mobilenumber,Email} = this.props.userprofile
                this.props.setuserprofile({Name, Mobilenumber, Email, Location:this.props.coordinates})

                if (this.props.setaddress !== undefined) {
                    this.props.setaddress(currentstate => !currentstate)
                }
            }).catch(() => {
                console.log("Location could not be saved some error occurred")
                setmodalmessage("Your Location cannot be saved. Some error occurred at backend")
            })
        }

        const hidemodal = () => {
            this.setState({ ...this.state, displaymodaltouser: false })
        }

        return (
            <>
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

                        <>
                            <button onClick={showmodal} className="btn rounded-pill btn-primary">
                                Save Location
                            </button>
                            {
                                this.state.modalmessage === "Location saved" &&
                                <Modal centered show={this.state.displaymodaltouser} contentClassName="modalsuccess py-5" onHide={hidemodal}>

                                    <span className="d-flex justify-content-center ">
                                        <CheckCircleOutlinedIcon style={{ color: "green", border: "none" }} />
                                        <h5>
                                        {this.state.modalmessage}
                                        </h5>
                                    </span>

                                </Modal>

                            }

                            {
                                this.state.modalmessage !== "Location saved" &&
                                <Modal centered show={this.state.displaymodaltouser} contentClassName="modalalert text-danger py-5" onHide={hidemodal}>
                                    <span className="d-flex justify-content-center ">
                                        <h5>The location is not saved. Please try again</h5>
                                    </span>

                                </Modal>

                            }

                        </>
                    }
                </div>

            </>
        )
    }
}

export default connect(mapStatetoprops, mapdispatchtoprops)(LocationMap)