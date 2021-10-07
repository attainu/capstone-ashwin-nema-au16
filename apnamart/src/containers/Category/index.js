import { PATHS, axiosinstance } from '../../config'
import { useParams } from 'react-router'
import {  PageItemsGrid } from "../../components";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './index.css'

export const Category = ({ history }) => {
    const { categoryid } = useParams()
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
            <div className="categorydata mb-5">
                {
                    Categories[categoryid] !== undefined &&
                    <PageItemsGrid headername={Categories[categoryid].name} itemsdata={Categorydata} history={history} />

                }
            </div>

        </>
    )
}