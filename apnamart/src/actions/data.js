import { data } from '../actionTypes'
import {convertarraydatatoobjectdata} from '../utils'
import {PATHS, axiosinstance} from '../config'

const { products_data, subcategory_data, category_data} = data

export const getproductsdata = (datafetchedfunction) => (dispatch) => {
    axiosinstance.post("/products").then(resp => {
        const {products, subcategories, categories} = resp.data
        const productsdata = convertarraydatatoobjectdata(products, PATHS.PRODUCT)
        const subcategorydata = convertarraydatatoobjectdata(subcategories, PATHS.SUBCATEGORY)
        const categorydata = convertarraydatatoobjectdata(categories, PATHS.CATEGORY)

        dispatch({ type: products_data, payload: productsdata })
        dispatch({ type: subcategory_data, payload: subcategorydata })
        dispatch({ type: category_data, payload: categorydata })
        if (datafetchedfunction !== undefined) {
            datafetchedfunction(true)
        }
        return
    }).catch((error) => {
        console.log(error)
        console.log("Something went wrongg while fetching order data")
    })
    
}