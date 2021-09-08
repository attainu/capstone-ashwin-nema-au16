import { data } from '../actionTypes'
import axios from 'axios'
import {convertarraytoobject} from '../utils'
import {PATHS} from '../config'
const { products_data, subcategory_data, category_data} = data

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
            return
        }
        const productsdata = convertarraytoobject(resp.data.products, PATHS.PRODUCTPATH)
        const subcategorydata = convertarraytoobject(resp.data.subcategories, PATHS.SUBCATEGORYPATH)
        const categorydata = convertarraytoobject(resp.data.categories, PATHS.CATEGORYPATH)
        dispatch({ type: products_data, payload: productsdata })
        dispatch({ type: subcategory_data, payload: subcategorydata })
        dispatch({ type: category_data, payload: categorydata })
    }).catch((error) => {
        console.log(error)
        dispatch({ type: products_data, payload: {error:"Sorry products data could not be fetched"} })
    })
}