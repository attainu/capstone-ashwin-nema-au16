import { useParams } from 'react-router'
import { PATHS } from '../../config'
import { Carouselitem } from "../../components";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {axiosinstance} from '../../config'

const Subcategory = ({ history }) => {
    const { subcategoryid } = useParams()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const Subcategories = useSelector(state => state.Productsdata.subcategories)
    const [Subcategorydata, changeSubcategorydata ] = useState([])
    const [currenid, changecurrenid] = useState("")

    useEffect(() => {
        let flag
        if (Subcategorydata.length === 0) {
            axiosinstance.post(`/subcategory/${subcategoryid}`).then(resp => {
                if (resp.data.error !== "") {
                    history.push(PATHS.HOME)
                }
                changeSubcategorydata([...resp.data.result])
                changecurrenid(subcategoryid)
                flag = true
                return
            }).catch(() => {
                flag = false
                history.push(PATHS.HOME)
            })

        }

        if (flag !== undefined && flag !== true) {
            history.push(PATHS.HOME)  
        }
        
    }, [Subcategories, Subcategorydata, history, subcategoryid])

    useEffect(() => {
        if (currenid.length > 0 && subcategoryid !== currenid) {
            changeSubcategorydata([])
        }
    }, [currenid, subcategoryid])
    return (
        <>
            {
                Subcategories[subcategoryid] !== undefined  &&
                <>
                    <h3 className="mt-3 ms-2">{Subcategories[subcategoryid].name}</h3>

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