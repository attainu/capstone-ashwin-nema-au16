import { PATHS } from '../../config'
import { useParams } from 'react-router'
import { Carouselitem } from "../../components";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Category = ({ history }) => {
    const { categoryid } = useParams()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const Categories = useSelector(state => state.Productsdata.categories)
    const [Categorydata, changeCategorydata] = useState([])
    const [currenid, changecurrenid] = useState("")

    useEffect(() => {
        let flag
        if (Categorydata.length === 0) {
            axios({
                method: 'post',
                url: `http://localhost:5000/category/${categoryid}`,
            }).then(resp => {
                if (resp.data.error !== "") {
                    history.push(PATHS.HOME)
                }
                changeCategorydata([...resp.data.result])
                changecurrenid(categoryid)
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

    }, [Categories, Categorydata, history, categoryid])

    useEffect(() => {
        if (currenid.length > 0 && categoryid !== currenid) {
            changeCategorydata([])
        }
    }, [currenid, categoryid])

    return (
        <>
            {
                Categories[categoryid] !== undefined &&
                <>
                    <h3 className="mt-3 ms-2">{Categories[categoryid].name}</h3>

                    <div className="row">
                        {
                            Categorydata.map((item) => {
                                const itemdetails = Productsdata[item._id]
                                return (
                                    <div key={Math.random()} className="col-4 mt-5">
                                        <Carouselitem itemdetails={itemdetails} history={history} />
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