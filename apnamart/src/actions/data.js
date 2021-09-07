import { data } from '../actionTypes'
import axios from 'axios'
import {covertarraytoobject} from '../utils'

const { products_data, subcategory_data} = data

// url: 'https://apna-mart.herokuapp.com/getprofile',
// url: 'http://localhost:3000/getprofile',
// url: 'http://localhost:5000/getprofile',
export const getproductsdata = () => (dispatch) => {
    return axios({
        method: 'post',
        url: 'http://localhost:5000/products',
        data: {}
    }).then(resp => {
        if (resp.data.error !== "") {
            dispatch({ type: products_data, payload: {error:"Sorry products data could not be fetched"} })
            dispatch({ type: subcategory_data, payload: {error:"Sorry products data could not be fetched"}})
            return
        }

        const productsdata = covertarraytoobject(resp.data.products)
        const categorydata = covertarraytoobject(resp.data.subcategories)

        dispatch({ type: products_data, payload: productsdata })
        dispatch({ type: subcategory_data, payload: categorydata })
    }).catch((error) => {
        console.log(error)
        dispatch({ type: products_data, payload: ["Sorry products data could not be fetched"] })
        dispatch({ type: subcategory_data, payload: ["Sorry category data could not be fetched"] })
    })
}