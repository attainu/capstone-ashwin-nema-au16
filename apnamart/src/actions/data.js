import { data } from '../actionTypes'
import {convertarraydatatoobjectdata} from '../utils'
import {PATHS, axiosinstance} from '../config'

const { products_data, subcategory_data, category_data} = data

export const getproductsdata = () => (dispatch) => {
    axiosinstance.post("/products").then(resp => {
        console.log("Request came here")
        if (resp.data.error !== "") {
            dispatch({ type: products_data, payload: {error:"Sorry products data could not be fetched"} })
            return
        }
        const productsdata = convertarraydatatoobjectdata(resp.data.products, PATHS.PRODUCTPATH)
        const subcategorydata = convertarraydatatoobjectdata(resp.data.subcategories, PATHS.SUBCATEGORYPATH)
        const categorydata = convertarraydatatoobjectdata(resp.data.categories, PATHS.CATEGORYPATH)
        dispatch({ type: products_data, payload: productsdata })
        dispatch({ type: subcategory_data, payload: subcategorydata })
        dispatch({ type: category_data, payload: categorydata })
        return
    }).catch((error) => {
        console.log(error)
        dispatch({ type: products_data, payload: {error:"Sorry products data could not be fetched"} })

        return
    })
    
}