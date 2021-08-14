import './index.css'
import { PATHS } from '../../config'

const Categorycarouselitem = (props) => {

    const { image, categoryname, history } = props
    const Redirect = () => {
        history.push(`${PATHS.SUBCATEGORYPATH}${categoryname}`)
    }

    return (
        <>
            <div className="card carouselcategorycontent ms-2">
                <img onClick={Redirect} src={image} className="card-img-top carouselcategoryimage" alt={categoryname} />
                <div className="card-body">
                    <p onClick={Redirect} className="card-text">{categoryname}</p>
                </div>
            </div>
        </>
    )
}

export default Categorycarouselitem