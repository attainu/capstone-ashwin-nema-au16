import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Redirect, Add_Remove_Item_Button_Setter} from '../../utils'
import {NotificationModal} from '../Modal Components'
import { useState } from 'react';

export const PageItemsGrid = ({ headername, itemsdata, history }) => {
    const dispatch = useDispatch()
    const { Productsdata: { products }, CartPrice, Cart } = useSelector(state => state)
    const [productname, changeproductname] = useState("")
    const [modal, showhidemodal] = useState(false)

    return (
        <>
            <h3 className="mt-3 ms-2">{headername}</h3>

            <div className="itempagegrid ms-3 me-3">
                {
                    itemsdata.map((item) => {
                        const { price, image, name, _id, link } = products[item._id]
                        const count = Cart[_id] === undefined ? 0 : Cart[_id].count
                        const addremovebbuttonconfigration = [count, dispatch, CartPrice, price, _id,showhidemodal, name, changeproductname]

                        return (
                            <div key={Math.random()} className="mt-2 border itempagegriditem">
                                <div className="itempagegriditemimagecontainer">
                                    <img onClick={() => Redirect(history, link)} alt={name} src={image} className="itempagegriditemimage" />
                                </div>

                                <div className="itempagegriditemdetails">
                                    <div onClick={() => Redirect(history, link)} className="text-center itemcarouseltext">{name}</div>
                                    <div className="text-center">Rs. {price}</div>
                                </div>

                                <div className="itempagegriditemcount">
                                    {count === 0 ? <button onClick={() => Add_Remove_Item_Button_Setter(count, addremovebbuttonconfigration, true)} className="btn btn-warning w-100">Add to cart</button> : <>
                                        <div className="space-between">
                                            <RemoveCircleIcon fontSize="large" className="cursorpointer" onClick={() => Add_Remove_Item_Button_Setter(count, addremovebbuttonconfigration)} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>
                                            <div className="itemcarouselcount">{count}</div>
                                            <AddCircleTwoToneIcon fontSize="large" className={`${count < 20 ? "cursorpointer " : ""}`} onClick={() => Add_Remove_Item_Button_Setter(count, addremovebbuttonconfigration, true)} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <NotificationModal show={modal} centered={true} currentmodalmessage={`Sorry you cannot order more than 20 items of ${productname}`} onHide={showhidemodal} alertvariant="danger" successmessage="" />
        </>
    )
}