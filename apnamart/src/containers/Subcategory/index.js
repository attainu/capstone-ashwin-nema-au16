import { Item } from "../../components/Item"
export const Subcategory = (props) => {
    const { item } = props
    const { name, items } = item
    return (
        <>
            <div className="row d-flex justify-content-center mb-3">
                <h3 className="text-center">{name}</h3>
                {
                    items.map((itemdetails, itemno) => {
                        return (
                            < Item key={itemno} itemdetails={itemdetails} />
                        )
                    })
                }
            </div>
        </>
    )
}