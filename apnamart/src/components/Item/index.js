import './index.css'
import { add_to_Cart } from '../../actions'
import { useDispatch } from 'react-redux'

export const Item = (props) => {
    const { itemdetails } = props
    const { name, image, description, price, details } = itemdetails

    return (
        <>
            <div className="col-2">
                <div className="card">
                    <img src={image} className="card-img-top cardimage" alt="..." />

                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>

        </>
    )
}