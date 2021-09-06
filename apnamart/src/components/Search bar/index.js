import './index.css'
import SearchBar from 'material-ui-search-bar'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PATHS } from '../../config'
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';

export const InputSearchBar = () => {
    const [searchbar, changesearchvalue] = useState("")
    const products = useSelector(state => state.Productsdata.products)
    const subcategories = useSelector(state => state.Productsdata.subcategories)
    const [productresults, changeproductresults] = useState([])
    const [subcategoryresults, changesubcategoryresults] = useState([])
    const [currentclass, changecurrenclass] = useState(false)
    const Searchbaref = useRef()
    
    const productslength = productresults.length + subcategoryresults.length > 0

    const setsearchvbarvalue = (newvalue) => {
        changesearchvalue(newvalue)
    }

    const AddToggleclass = (e) => {
        e.stopPropagation()
        changecurrenclass(true)
    }

    const RemoveToggleclass = () => {
        changecurrenclass(false)
    }

    useEffect(() => {
        if (Searchbaref.current !== undefined) {
            Searchbaref.current.addEventListener('keydown', AddToggleclass)
        }

    }, [])

    useEffect(() => {
        if (currentclass === true) {
            document.body.addEventListener('click', RemoveToggleclass)
            return
        }
        document.body.removeEventListener('click', RemoveToggleclass)
    }, [currentclass])

    useEffect(() => {
        if (searchbar !== "" && searchbar.trim() !== "") {
            const regx = new RegExp(searchbar.trim(), 'i')

            const productslist = Object.keys(products).reduce((totalproducts, item) => {
                if (regx.test(products[item].name) === true) {
                    const productobject = { name: products[item].name, id: products[item]._id, image: products[item].image }
                    totalproducts.push(productobject)
                }
                return totalproducts
            }, [])
            changeproductresults([...productslist])

            const subcategorylist = Object.keys(subcategories).reduce((totalsubcategories, item) => {
                if (regx.test(subcategories[item].name) === true) {
                    const subcategoryobject = { name: subcategories[item].name, id: subcategories[item]._id, image: subcategories[item].imageurl }
                    totalsubcategories.push(subcategoryobject)
                }
                return totalsubcategories
            }, [])

            changesubcategoryresults([...subcategorylist])
            return
        }
        changeproductresults([])
        changesubcategoryresults([])
    }, [searchbar, products, subcategories])


    return (
        <>
            <div className="dropdown">
                <span ref={Searchbaref}>
                <SearchBar   className="marginbottomzero" value={searchbar}  onClick={AddToggleclass}  onMouseLeave={RemoveToggleclass} onChange={setsearchvbarvalue}></SearchBar>
                     </span>
                {
                    currentclass === true && productslength > 0 &&
                    <ul onClick={RemoveToggleclass} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="marginnegative show dropdown-menu">
                        <SimpleBar style={{ height: "20vh" }}>
                            {
                                productresults.map((item, index) => {
                                    return (
                                        <Link key={index} className="dropdown-item space-between text-decoration-none text-dark text-wrap w-100" to={`${PATHS.PRODUCTPATH}${item.id}`} >
                                            <img src={item.image} className="searchbarimage" alt={item.name} />
                                            {item.name}</Link>
                                    )
                                })
                            }

                            {
                                subcategoryresults.map((item, index) => {
                                    return (
                                        <Link key={index} className="dropdown-item space-between text-decoration-none text-dark text-wrap w-100" to={`${PATHS.SUBCATEGORYPATH}${item.id}`} >
                                            <img src={item.image} className="searchbarimage" alt={item.name} />
                                            {item.name}</Link>
                                    )
                                })
                            }
                        </SimpleBar>
                    </ul>
                }
            </div>
        </>
    )
}