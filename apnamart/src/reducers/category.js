const initialState = {
    "Snacks": {
        subcategories: [ "Chocolate","Biscuits"],
        categoryurl:"https://res.cloudinary.com/ash006/image/upload/v1628832772/snacks_oaqksa.jpg"
    },

    "Bathroom and laundry":{
        subcategories: ["Handwash","Detergents"],
        categoryurl:"https://res.cloudinary.com/ash006/image/upload/v1628832770/bathroom_and_laundry_ytym6p.jpg"
    },

    "Staples":{
        subcategories: ["Atta", "Edible Oils"],
        categoryurl:"https://res.cloudinary.com/ash006/image/upload/v1628832769/staples_rpt0as.png"
    } 
}

const Category = (state, action) => {
    state = state || initialState
    return state
}

export default Category