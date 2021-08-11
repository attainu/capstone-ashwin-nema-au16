import {useDispatch, useSelector } from "react-redux"
import { Category } from "../Category"
import ItemsCarousel from '../Items Carousel'


export const Home = () => {
    const allitems = useSelector(state => state.Items)
    

    return (
        <>
        <ItemsCarousel  />
        </>
    )
}