import { Carouselitem } from '../../components'
import Carousel from 'react-elastic-carousel'
import './index.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { Redirect, ProductsdataloadedContext } from '../../utils'
import { useContext } from 'react'

export const Home = ({ history }) => {
    const { products, subcategories, categories } = useSelector(state => state.Productsdata)
    const [productsref, productbounds] = useMeasure()
    const breakpoints = [
        { width: 200, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 500, itemsToShow: 3 },
        { width: 760, itemsToShow: 4 },
        { width: 2000, itemsToShow: 5 },
    ]
    const isdataloaded = useContext(ProductsdataloadedContext)

    return (
        <>
            {isdataloaded &&
                <div className="homegrid">
                    <div ref={productsref} className="mt-3 pt-3 w-100">
                        <div className="ms-3 mb-3">
                            <strong>Search by item</strong>
                        </div>
                        <Carousel className="displaycarousel" breakPoints={breakpoints}>
                            {
                                Object.keys(products).map((item, index) => {
                                    return (
                                        <Carouselitem carouselheight={productbounds.height} history={history} key={index} index={index} itemdetails={products[item]} />
                                    )
                                })
                            }
                        </Carousel>
                    </div>

                    <div className="mt-3 pt-3">
                        <div className="ms-3 mb-3">
                            <strong>Search by category</strong>
                        </div>

                        <Carousel className="displaycarousel" breakPoints={breakpoints}>
                            {
                                Object.keys(subcategories).map((item, index) => {
                                    const { image, name, link } = subcategories[item]

                                    return (
                                        <div key={index} className="ms-2 w-100">
                                            <div className="categorycarouselimagecontainer  w-100">
                                                <img onClick={() => Redirect(history, link)} src={image} className="cardimage" alt={name} />
                                            </div>
                                            <div className="w-100">
                                                <p onClick={() => Redirect(history, link)} className="card-text text-center">{name}</p>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </Carousel>
                    </div>

                    <div className="mt-3 pt-3 ms-4 homecategorygrid mb-5">
                        {
                            Object.keys(categories).map((item, index) => {
                                const { image, name, link } = categories[item]

                                return (
                                    <div key={index} className="border   categorycontainer  ">
                                        <div className="categorycarouselimagecontainer d-flex justify-content-center w-100">
                                            <img onClick={() => Redirect(history, link)} src={image} className=" cardimage" alt={name} />
                                        </div>
                                        <div className="mb-5">
                                            <p onClick={() => Redirect(history, link)} className="card-text text-center"><Link className="text-decoration-none text-dark" to={link}>{name}</Link> </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

        </>
    )
}