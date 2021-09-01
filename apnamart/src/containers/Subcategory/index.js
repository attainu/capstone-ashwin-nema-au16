import { useParams } from 'react-router'
import { Redirect } from "react-router";
import { PATHS } from '../../config'
import {Carouselitem} from "../../components";
import {Subcategorydata, Productsdata} from '../../Data'

const Subcategory = ({history}) => {
    const { subcategoryname } = useParams()
    if (Subcategorydata[subcategoryname] === undefined) {
        return <Redirect to={PATHS.HOME} />
    }

    return (
        <>
            <h3 className="mt-3 ms-2">{subcategoryname}</h3>

            <div className="row">
                {
                    Subcategorydata[subcategoryname].items.map((item, index) => {
                        return (
                            <div key={index} className="col-4 mt-2">
                                <Carouselitem itemname={item} itemdetails={Productsdata[item]} history={history} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Subcategory