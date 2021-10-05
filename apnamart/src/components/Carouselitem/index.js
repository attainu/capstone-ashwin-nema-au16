import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NotificationModal } from '../Modal Components'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useMediaQuery from '@mui/material/useMediaQuery'
import {  Redirect, Add_Remove_Item_Button_Setter } from '../../utils'

const CarouselItemContent = ({ history, itemdetails, showhidemodal }) => {
    const dispatch = useDispatch()
    const { CartPrice, Cart } = useSelector(state => state)
    const { price, image, name, _id, link } = itemdetails
    const count = Cart[_id] === undefined ? 0 : Cart[_id].count
    const Add_Remove_Button_Configuration = [count, dispatch, CartPrice, price,_id, showhidemodal ]
    return (
        <>
            <div className="productcarouselimage text-center">
                <img onClick={() => Redirect(history, link)} alt={name} src={image} className="cardimage" />
            </div>

            <div className="d-flex flex-column">
                <span onClick={() => Redirect(history, link)} className="text-center itemcarouseltext">{name}</span>
                <span className="text-center">Rs. {price}</span>
            </div>

            <div className="productcarouselitemcount">
                {count === 0 ? <button onClick={() => Add_Remove_Item_Button_Setter(count, Add_Remove_Button_Configuration, true)} className="btn btn-warning w-100">Add to cart</button> : <>
                    <div className="space-between">
                        <RemoveCircleIcon fontSize="large" className={`${count > 1 ? "cursorpointer" : ""}`} onClick={() => Add_Remove_Item_Button_Setter(count, Add_Remove_Button_Configuration)} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>
                        <div className="itemcarouselcount">{count}</div>
                        <AddCircleTwoToneIcon fontSize="large" className={`${count < 20 ? "cursorpointer " : ""}`} onClick={() => Add_Remove_Item_Button_Setter(count, Add_Remove_Button_Configuration, true)} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                    </div>
                </>}
            </div>
        </>
    )
}

const Carouselitem = ({ itemdetails, history, carouselheight }) => {
    const [carouselitemheight, setcarouselitemheight] = useState('30vh')
    const [modal, showhidemodal] = useState(false)
    const productcarouselheightquery300 = useMediaQuery('(max-width:300px)')
    const productcarouselheightquery250 = useMediaQuery('(max-width:235px)')

    useEffect(() => {
        if (carouselheight !== undefined && carouselheight !== 0 && productcarouselheightquery250) {
            const desiredheight = carouselheight * 0.78
            setcarouselitemheight(`${desiredheight}px`)
            return
        }

        if (carouselheight !== undefined && carouselheight !== 0 && productcarouselheightquery300) {
            const desiredheight = carouselheight * 0.75
            setcarouselitemheight(`${desiredheight}px`)
            return
        }

    }, [carouselheight, productcarouselheightquery300, productcarouselheightquery250])

    const { name } = itemdetails

    const props = {
        history, itemdetails, showhidemodal
    }

    return (
        <>
            {productcarouselheightquery300 === true ?
                <div style={{ minHeight: carouselitemheight }} className="productcarousel border ms-2 w-100">
                    <CarouselItemContent {...props} />
                </div>
                :
                <div className="productcarousel border ms-2 w-100">
                    <CarouselItemContent {...props} />
                </div>
            }
            <NotificationModal show={modal} centered={true} currentmodalmessage={`Sorry you cannot order more than 20 items of ${name}`} onHide={showhidemodal} alertvariant="danger" successmessage="" />
        </>
    )
}

export default Carouselitem