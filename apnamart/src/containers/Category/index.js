import { Subcategory } from "../Subcategory"

export const Category = (props) => {
    const { index, item } = props
    const { category, subcategories } = item
    return (

        <>
            <h3 className="">{category}</h3>
            
            {subcategories.map((item, index) => {
                return (
                    <Subcategory key={index} index={index} item={item} />
                )
            })}
        </>

    )
}