import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './index.css'
import L from 'leaflet'

export const LocationMap = () => {
    const leafletmap = useRef()
    const { Location } = useSelector(state => state.Profile)
    const [mapset, mapisset] = useState(false)
    const [currentlocation, changefulllocation] = useState({})
    const {suburb,city_district, city, state} = currentlocation

    
    let usermap
    let customer 
    let usercircle
    let latitude = Location[0]
    let longtitude = Location[1]
    

    useEffect(() => {
        if (leafletmap.current !== undefined && leafletmap.current !== null && mapset === false) {
            mapisset(true)
            usermap = L.map(leafletmap.current).setView(Location, 16)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(usermap)
            customer = L.marker(Location)
            customer.addTo(usermap)

            usercircle = L.circle(Location, {radius: 100}).addTo(usermap)
            function centermarker() {
                var newLatLng = new L.LatLng(usermap.getCenter().lat, usermap.getCenter().lng);
                latitude = newLatLng.lat
                longtitude = newLatLng.lng
                customer.setLatLng(newLatLng)
                usercircle.setLatLng(newLatLng)
            }
            
            usermap.addEventListener('move', centermarker)
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longtitude}&key=263b2cff3cb04499a101034d9817aa17`).then(res => res.json()).then(data => changefulllocation(data.results[0].components))
            function getcurrentaddress() {
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longtitude}&key=263b2cff3cb04499a101034d9817aa17`).then(res => res.json()).then(data => changefulllocation(data.results[0].components))
            }
            usermap.addEventListener('dragend', getcurrentaddress)
        }

    }, [mapisset, Location, mapset, usermap])

    return (
        <>

            <div  className="profileseperator2 pe-3 me-3 ps-3 pb-3  ">
                <h3>Select your location</h3>
                <div ref={leafletmap} className="leafletmap ">
                </div>
                <div className="mt-3 p-3 profilecontentdisplaycolor currentaddress">
                    <p>Current Location:</p>
                    {suburb !== undefined && <p className="lead smalltext"> { suburb},{city_district}, {city}, {state} </p>}
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary">
                        Save Location
                    </button>
                </div>
            </div>

        </>
    )
}

