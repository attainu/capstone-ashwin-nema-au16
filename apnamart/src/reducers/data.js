import {data} from '../actionTypes'
const {products_data, subcategory_data} = data

const initialstate = {products:{}, subcategories:{}}

const Productsdata = (state, action) => {
    state = state || initialstate

    switch (action.type) {
        case products_data:
            state.products = action.payload
            return state
        
        case subcategory_data:
            state.subcategories = action.payload
            return state
        
        default:
            return state
    }
}

export default Productsdata