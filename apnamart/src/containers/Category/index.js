import { PATHS, axiosinstance } from '../../config'
import { useParams } from 'react-router'
import { Carouselitem } from "../../components";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './index.css'

export const Category = ({ history }) => {
    const { categoryid } = useParams()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const Categories = useSelector(state => state.Productsdata.categories)
    const [Categorydata, changeCategorydata] = useState([])
    const [currenid, changecurrenid] = useState("")

    useEffect(() => {
        if (Categorydata.length === 0) {
            axiosinstance.post(`/category/${categoryid}`).then(({data}) => {
                changeCategorydata([...data])
                changecurrenid(categoryid)
            }).catch(() => {
                history.push(PATHS.NOTFOUND)
            })
        }

    }, [Categories, Categorydata, history, categoryid])

    useEffect(() => {
        if (currenid.length > 0 && categoryid !== currenid) {
            changeCategorydata([])
        }
    }, [currenid, categoryid])

    return (
        <>
            <div className="categorydata">
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
            </div>

        </>
    )
}