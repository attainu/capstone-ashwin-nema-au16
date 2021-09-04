import { useParams } from 'react-router'
import { PATHS } from '../../config'
import { Carouselitem } from "../../components";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Subcategory = ({ history }) => {
    const { subcategoryname } = useParams()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const Subcategories = useSelector(state => state.Productsdata.subcategories)
    const [Subcategorydata, changeSubcategorydata ] = useState([])
    const [errormessage, seterrormessage] = useState("")

    useEffect(() => {
        if (Subcategories[subcategoryname] === undefined) {
            history.push(PATHS.HOME)
            return
        }

        if (Subcategorydata.length === 0) {
            return axios({
                method:'post',
                url:`http://localhost:5000/subcategory/${subcategoryname}`,
            }).then(resp => {
                if (resp.data.error !== "") {
                    seterrormessage("Sorry data could not be loaded. Please refresh the page")
                    return
                }
                changeSubcategorydata([...resp.data.result])
            }).catch(() => {
                seterrormessage("Sorry data could not be loaded. Please refresh the page")
            })
        }

    }, [Subcategories, Subcategorydata, history, subcategoryname])

    return (
        <>
            {
                Subcategories[subcategoryname] !== undefined && errormessage === "" &&
                <>
                    <h3 className="mt-3 ms-2">{Subcategories[subcategoryname].name}</h3>

                    <div className="row">
                        {
                            Subcategorydata.map((item) => {
                                const itemdetails = Productsdata[item._id]
                                return (
                                    <div key={Math.random()} className="col-4 mt-2">
                                        <Carouselitem  itemdetails={itemdetails} history={history} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Subcategory