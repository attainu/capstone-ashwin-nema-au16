import { useSelector } from "react-redux"
import Carouselitem from "../../components/Carouselitem"
import Carousel from 'react-elastic-carousel'

const ItemsCarousel = () => {
    const items = useSelector(state => state.Itemslist)
    const itemslist = Object.keys(items)


    const breakpoints = [
        { width: 500, itemsToShow: 3 },
        { width: 760, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
        { width: 2000, itemsToShow: 7 }
    ]
    return (
        <>
            <div  className="row mt-3 pt-3">
                <Carousel breakPoints={breakpoints}>
                    {
                        itemslist.map((item, index) => {
                            return (
                                <Carouselitem key={index} itemname={item} itemdetails={items[item]} 
                                />
                            )
                        })
                    }
                </Carousel>
            </div>

        </>
    )
}

export default ItemsCarousel