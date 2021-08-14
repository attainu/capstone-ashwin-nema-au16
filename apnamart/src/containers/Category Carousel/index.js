import { useSelector } from "react-redux"
import Categorycarouselitem from "../../components/Carousel category"
import Carousel from 'react-elastic-carousel'

const CategoryCarousel = ({ history }) => {
    const items = useSelector(state => state.Subcategory)
    const itemslist = Object.keys(items)
    const breakpoints = [
        { width: 500, itemsToShow: 3 },
        { width: 760, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
        { width: 2000, itemsToShow: 7 }
    ]

    return (
        <>
            <div className="mt-3 pt-3">
                <div className="ms-3 mb-2">
                    Search by category
                </div>

                <Carousel breakPoints={breakpoints}>
                    {
                        itemslist.map((item, index) => {
                            return (
                                <Categorycarouselitem history={history} key={index} image={items[item].imageurl} categoryname={item}
                                />
                            )
                        })
                    }
                </Carousel>
            </div>

        </>
    )
}

export default CategoryCarousel