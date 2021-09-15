import { setaddress } from '../actionTypes'
import {axiosinstance} from '../config'
import {Logoutuser} from '../utils'

export const getuseraddress = (latitude, longtitude) => (dispatch) => {
    const location = `${latitude},${longtitude}`
    axiosinstance.post("/user/location", {location}).then(resp => {

        if (resp.data.error !== "") {
            Logoutuser()
            return
        }
        const finaluserlocationaddress = []
        if (resp.data.useraddress.country === "India" && resp.data.useraddress.state !== undefined) {
            
            if (resp.data.useraddress._type !== "suburb" &&
            resp.data.useraddress._type !== "city" &&
            resp.data.useraddress._type !== "city_district" &&
            resp.data.useraddress._type !== "state_district" &&
            resp.data.useraddress._type !== "village" &&
            resp.data.useraddress._type !== "town" &&
            resp.data.useraddress._type !== "county" &&
            resp.data.useraddress[resp.data.useraddress._type] !== undefined 
            ) {
                finaluserlocationaddress.push(resp.data.useraddress[resp.data.useraddress._type])
            }

            if (resp.data.useraddress.suburb !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.suburb)
            }

            if (resp.data.useraddress.village !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.village)
            }

            if (resp.data.useraddress.town !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.town)
            }

            if (resp.data.useraddress.county !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.county)
            }

            if (resp.data.useraddress.city_district !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.city_district )
            }

            if (resp.data.useraddress.state_district !== undefined ) 
            {
                finaluserlocationaddress.push(resp.data.useraddress.state_district)
            }

            if (resp.data.useraddress.city !== undefined ) 
            {

                finaluserlocationaddress.push(resp.data.useraddress.city)
            }

            finaluserlocationaddress.push(resp.data.useraddress.state)

        }

        if (finaluserlocationaddress.length === 0) {
            finaluserlocationaddress.push("Sorry we do not serve your area")
        }

        dispatch({ type: setaddress, payload: finaluserlocationaddress })
        return
    }).catch((error) => {
        console.log(error)
        console.log("Error occurred in the backend")
        return
    })
}