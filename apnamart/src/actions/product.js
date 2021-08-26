import {product_count} from '../actionTypes'
const {increase_product, decrease_product, set_count_zero} = product_count

export const changeproductcount = {
    product_added:(product) => ({type:increase_product, payload:product }),
    product_removed:(product) => ({type:decrease_product, payload:product}),
    make_count_zero:(payload) => ({type:set_count_zero, payload})
}