import { useParams } from 'react-router'
import { PATHS } from '../../config'
import {  useSelector } from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import { axiosinstance } from '../../config'
import {PageItemsGrid} from '../../components'

import { ProductsdataloadedContext } from '../../utils'

const Subcategory = ({ history }) => {

    const productdataisloaded = useContext(ProductsdataloadedContext)

    const { subcategoryid } = useParams()
    const { Productsdata: {  subcategories } } = useSelector(state => state)
    const [Subcategorydata, changeSubcategorydata] = useState([])
    const [currenid, changecurrenid] = useState("")

    useEffect(() => {
        if (Subcategorydata.length === 0) {
            axiosinstance.post(`/subcategory/${subcategoryid}`).then(({ data }) => {
                changeSubcategorydata([...data])
                changecurrenid(subcategoryid)
            }).catch(() => {
                history.push(PATHS.NOTFOUND)
            })
        }
    }, [Subcategorydata, history, subcategoryid])

    useEffect(() => {
        if (currenid.length > 0 && subcategoryid !== currenid) {
            changeSubcategorydata([])
        }
    }, [currenid, subcategoryid])

    return (
        <>
            {
                subcategories[subcategoryid] !== undefined && productdataisloaded &&
                <PageItemsGrid headername={subcategories[subcategoryid].name} itemsdata={Subcategorydata} history={history} />
            }
        </>
    )
}

export default Subcategory