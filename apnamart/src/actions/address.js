import { setaddress } from '../actionTypes'
import { getAuthinbrowser } from '../utils'
import axios from 'axios'

export const getuseraddress = (latitude, longtitude) => (dispatch) => {
    const authvalue = getAuthinbrowser() || ""
    const auth = { "Auth": authvalue }
    return axios({
        method: 'post',
        url: 'http://localhost:5000/user/location',
        data: {
            location: `${latitude},${longtitude}`
        },
        headers: auth
    }).then(resp => {
        if (resp.data.error !== "") {
            dispatch({ type: setaddress, payload: [] })
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
    }).catch(() => {
        console.log("Error occurred in the backend")
        return
    })
}