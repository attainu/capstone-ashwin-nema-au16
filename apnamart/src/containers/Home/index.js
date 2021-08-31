import { useSelector } from 'react-redux'
import { Carouselitem } from '../../components'
import Carousel from 'react-elastic-carousel'
import { PATHS } from '../../config'
import './index.css'

export const Home = ({ history }) => {
    const items = useSelector(state => state.Itemslist)
    const itemslist = Object.keys(items)
    const subcategory = useSelector(state => state.Subcategory)
    const subcategorylist = Object.keys(subcategory)

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
                    Search by items
                </div>
                <Carousel breakPoints={breakpoints}>
                    {
                        itemslist.map((item, index) => {
                            return (
                                <Carouselitem history={history} key={index} itemname={item} itemdetails={items[item]}
                                />
                            )
                        })
                    }
                </Carousel>
            </div>

            <div className="mt-3 pt-3">
                <div className="ms-3 mb-2">
                    Search by category
                </div>

                <Carousel breakPoints={breakpoints}>
                    {
                        subcategorylist.map((item, index) => {
                            const image = subcategory[item].imageurl
                            const Redirect = () => {
                                history.push(`${PATHS.SUBCATEGORYPATH}${item}`)
                            }

                            return (
                                <div key={index} className="card carouselcategorycontent ms-2">
                                    <img onClick={Redirect} src={image} className="card-img-top carouselcategoryimage" alt={item} />
                                    <div className="card-body">
                                        <p onClick={Redirect} className="card-text">{item}</p>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                </Carousel>
            </div>
        </>
    )
}