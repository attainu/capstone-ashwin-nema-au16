import CategoryCarousel from '../Category Carousel'
import ItemsCarousel from '../Items Carousel'
export const Home = ({history}) => {
    return (
        <>
        <ItemsCarousel history={history} />
        <CategoryCarousel history={history} />
        </>
    )
}