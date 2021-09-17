import { data } from '../actionTypes'
import {convertarraydatatoobjectdata} from '../utils'
import {PATHS, axiosinstance} from '../config'

const { products_data, subcategory_data, category_data} = data

export const getproductsdata = () => (dispatch) => {
    axiosinstance.post("/products").then(resp => {
        const productsdata = convertarraydatatoobjectdata(resp.data.products, PATHS.PRODUCT)
        const subcategorydata = convertarraydatatoobjectdata(resp.data.subcategories, PATHS.SUBCATEGORY)
        const categorydata = convertarraydatatoobjectdata(resp.data.categories, PATHS.CATEGORY)
        dispatch({ type: products_data, payload: productsdata })
        dispatch({ type: subcategory_data, payload: subcategorydata })
        dispatch({ type: category_data, payload: categorydata })
        return
    }).catch(() => {
        console.log("Something went wrongg while fetching order data")
    })
    
}