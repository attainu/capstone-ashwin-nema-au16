import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import { useEffect } from 'react'
import { useRef, useState, useContext } from 'react'
import { useMemo, useCallback } from 'react'
import L from 'leaflet'
import { SetAddressContext } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { getuseraddress, setprofile } from '../../actions'
import { Alert, Modal } from 'react-bootstrap'
import axios from 'axios'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import './index.css'

function DisplayPosition({ map, markerref, circleref }) {
    const dispatch = useDispatch()

    const onMove = useCallback(() => {
        const newLatLng = new L.LatLng(map.getCenter().lat, map.getCenter().lng)

        if (markerref.current !== undefined && circleref.current !== undefined) {
            circleref.current.setLatLng(newLatLng)
            markerref.current.setLatLng(newLatLng)
        }
    }, [map, markerref, circleref])

    const onDragend = useCallback(() => {
        const { lat, lng } = map.getCenter()

        dispatch(getuseraddress(lat, lng))
    }, [map, dispatch])

    const onZoomend = useCallback(() => {
        const { lat, lng } = map.getCenter()
        dispatch(getuseraddress(lat, lng))
    }, [map, dispatch])

    useEffect(() => {
        map.on('move', onMove)
        map.on('dragend', onDragend)
        map.on('zoomend', onZoomend)

        return () => {
            map.off('move', onMove)
            map.off('dragend', onDragend)
            map.off('zoomend', onZoomend)
        }

    }, [map, onMove, onDragend, onZoomend])

    return (
        <>
        </>
    )
}

export default function LocationMap() {
    const dispatch = useDispatch()
    const [map, setMap] = useState(null)
    const mapismounted = useRef(false)
    const markerref = useRef()
    const circleref = useRef()
    const addresscontext = useContext(SetAddressContext)
    const { Name, Mobilenumber, Email, Location } = useSelector(state => state.Profile)
    const address = useSelector(state => state.Useraddress)
    const Auth = useSelector(state => state.Auth)
    const [modal, showmodal] = useState(false)
    const [modalvariant, changemodalvariant] = useState('warning')
    const modalmessage = useRef("")

    const hidemodal = () => {
        showmodal(false)
    }

    const displaymodaltouser = (message) => {
        modalmessage.current = message
        showmodal(true)
        if (message === "Location saved") {
            changemodalvariant('warning')
            return
        }
        changemodalvariant('danger')
    }

    useEffect(() => {
        if (address.length === 0 && addresscontext === undefined) {
            dispatch(getuseraddress(Location[0], Location[1]))
        }

        if (mapismounted.current === false && address.length === 1) {
            mapismounted.current = true
            dispatch(getuseraddress(Location[0], Location[1]))
        }

    }, [address, dispatch, Location, addresscontext])

    const findcurrentuserlocation = () => {
        navigator.permissions.query({ name: 'geolocation' })
            .then(
                ({ state }) => {
                    if (state === "denied") {
                        displaymodaltouser("You have to enable location access in the browser first in order to enable map to find your location")
                    }
                }
            )
        if (map !== undefined && map !== null) {
            try {
                map.locate()
                map.on('locationfound', (e) => {
                    map.flyTo(e.latlng, map.getZoom())
                })
            }
            catch (error) {
                console.log("Error occurred")
            }
        }
    }


    const saveuserlocation = () => {
        if (map !== undefined && map !== null) {
            const { lat, lng } = map.getCenter()
            const auth = { "Auth": Auth }
            return axios({
                method: 'put',
                url: 'http://localhost:5000/user/location',
                data: {
                    location: `${lat},${lng}`,
                    Location: [lat, lng]
                },
                headers: auth

            }).then((resp) => {
                if (resp.data.error !== "") {
                    displaymodaltouser(resp.data.error)
                    return
                }

                displaymodaltouser("Location saved")
                dispatch(setprofile({ Name, Email, Mobilenumber, Location: [lat, lng] }))

                if (addresscontext !== undefined && addresscontext !== null) {
                    addresscontext(false)
                }
            }).catch(() => {
                console.log("Location could not be saved some error occurred")
                displaymodaltouser("Sorry you location could not be saved. Please try again later")
            })
        }
    }

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={Location}
                style={{ height: "40vh" }}
                zoom={16}
                scrollWheelZoom={true}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker ref={markerref} position={Location} >

                </Marker>
                <Circle ref={circleref} center={Location} pathOptions={{ fillColor: 'blue' }} radius={200} />
            </MapContainer>
        ),
        [Location],
    )

    return (
        <div>
            <div className="leafletmap">
                <h3>Select your location</h3>
                <span className="text-info smalltext leafletend" onClick={findcurrentuserlocation} >Allow location access </span>
            </div>
            {map ? <DisplayPosition circleref={circleref} markerref={markerref} map={map} /> : null}
            {displayMap}

            <Alert variant={`${address[0] === 'Sorry we do not serve your area' ? 'danger' : 'warning'}`} >
                {
                    address.map((item, index) => {
                        if (index !== address.length - 1) {
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
            </Alert>
            <div className="d-flex justify-content-center">
                <button onClick={saveuserlocation} className={`mt-2 btn btn-info rounded-pill ${address[0] === 'Sorry we do not serve your area' ? 'disabledr' : ''}`}>
                    Save Location
                </button>
            </div>

            <Modal centered show={modal} contentClassName="modalwithoutcolor py-5" onHide={hidemodal}>
                <Alert variant={`${modalvariant}`}>
                    <span className="d-flex justify-content-center ">
                        {
                            modalmessage.current === "Location saved" ?
                                <>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex justify-content-center">
                                            <CheckCircleOutlinedIcon style={{ color: "green", border: "none" }} />
                                        </div>

                                        <div >
                                            <h5>
                                                {modalmessage.current}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <ErrorRoundedIcon style={{ color: "red" }} />
                                    <h5>
                                        {modalmessage.current}
                                    </h5>
                                </>
                        }
                    </span>
                </Alert>
            </Modal>
        </div>
    )
}