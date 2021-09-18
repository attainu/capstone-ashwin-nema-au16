import './index.css'
import SearchBar from "material-ui-search-bar";
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import { searchdatafilter } from '../../utils'

export const InputSearchBar = () => {
    const products = useSelector(state => state.Productsdata.products)
    const subcategories = useSelector(state => state.Productsdata.subcategories)
    const categories = useSelector(state => state.Productsdata.categories)

    const [searchbar, changesearchvalue] = useState("")
    const [filterdata, changefiltereddata] = useState([])
    const [currentclass, changecurrenclass] = useState(false)

    const Searchbaref = useRef()
    const productslength = filterdata.length > 0

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
            changefiltereddata([...searchdatafilter(products, searchbar), ...searchdatafilter(subcategories, searchbar), ...searchdatafilter(categories, searchbar)])
            return
        }
        changefiltereddata([])

    }, [searchbar, products, subcategories, categories])

    return (
        <>
            <div className="dropdown">
                <span ref={Searchbaref}>
                    <SearchBar className="marginbottomzero" value={searchbar} onClick={AddToggleclass} onMouseLeave={RemoveToggleclass} onChange={setsearchvbarvalue}></SearchBar>
                </span>
                {
                    currentclass === true && productslength > 0 &&
                    <ul onClick={RemoveToggleclass} onMouseEnter={AddToggleclass} onMouseLeave={RemoveToggleclass} className="marginnegative show dropdown-menu">
                        <SimpleBar style={{ height: "20vh" }}>
                            {
                                filterdata.map((item, index) => {
                                    const {name, link, image} = item
                                    return (
                                        <Link key={index} to={link} className="dropdown-item space-between text-decoration-none text-dark text-wrap w-100"  >
                                            <img src={image} className="searchbarimage" alt={name} />
                                            {name}</Link>
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