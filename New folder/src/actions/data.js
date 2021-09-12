import { data } from '../actionTypes'
import {convertarraytoobject} from '../utils'
import {PATHS, axiosinstance} from '../config'

const { products_data, subcategory_data, category_data} = data

export const getproductsdata = () => (dispatch) => {
    axiosinstance.post("/products").then(resp => {
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