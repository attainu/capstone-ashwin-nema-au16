import { useSelector } from "react-redux";
import { useParams } from 'react-router'
import { Redirect } from "react-router";
import { PATHS } from '../../config'
import Carouselitem from "../../components/Carouselitem";

const Subcategory = ({history}) => {
    const { subcategoryname } = useParams()
    const subcategory = useSelector(state => state.Subcategory)
    const items = useSelector(state => state.Itemslist)

    if (subcategory[subcategoryname] === undefined) {
        return <Redirect to={PATHS.HOME} />
    }

    return (
        <>
            <h3 className="mt-3 ms-2">{subcategoryname}</h3>

            <div className="row">
                {
                    subcategory[subcategoryname].items.map((item, index) => {
                        return (
                            <div key={index} className="col-4 mt-2">
                                <Carouselitem itemname={item} itemdetails={items[item]} history={history} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Subcategory