import { Carouselitem } from '../../components'
import Carousel from 'react-elastic-carousel'
import './index.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Home = ({ history }) => {
    const items = useSelector(state => state.Productsdata.products)
    const subcategories = useSelector(state => state.Productsdata.subcategories)
    const categories = useSelector(state => state.Productsdata.categories)

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
                    Search by item
                </div>
                <Carousel breakPoints={breakpoints}>
                    {
                        Object.keys(items).map((item, index) => {
                            return (
                                <Carouselitem history={history} key={index} index={index} itemdetails={items[item]} />
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
                        Object.keys(subcategories).map((item, index) => {
                            const { image, name, link } = subcategories[item]
                            const Redirect = () => {
                                history.push(`${link}`)
                            }

                            return (
                                <div key={index} className="card carouselcategorycontent ms-2">
                                    <img onClick={Redirect} src={image} className="card-img-top carouselcategoryimage" alt={name} />
                                    <div className="card-body">
                                        <p onClick={Redirect} className="card-text">{name}</p>
                                    </div>
                                </div>
                            )

                        })
                    }
                </Carousel>


            </div>

            <div className="mt-3 pt-3 ms-2 row">
                {
                    Object.keys(categories).map((item, index) => {
                        const { image, name, link } = categories[item]
                        const Redirect = () => {
                            history.push(`${link}`)
                        }

                        return (
                            <div key={index} className="col-3 card ms-2">
    
                                <img onClick={Redirect} src={image} className="card-img-top carouselcategoryimage" alt={name} />
                                <div className="card-body">
                                <p onClick={Redirect} className="card-text text-center"><Link className="text-decoration-none text-dark" to={link}>{name}</Link> </p> 
                                </div>
                            </div>
                        )

                    })
                }


            </div>
        </>
    )
}