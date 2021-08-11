import {useDispatch, useSelector } from "react-redux"
import { Category } from "../Category"
// import Allitemsscrollbar from "../../components/Carousel"

export const Home = () => {
    const allitems = useSelector(state => state.Items)
    return (
        <>

        <p>Hello</p>
        {
            allitems.map((item, index) => {
                return (
                    <Category item={item} key={index} index={index} />
                )
            })
        }

        </>
    )
}