import { OrderHistory } from '../../components'
import './index.css'
import { withAuthentication } from '../../Higher Order Components'
const Orderhistorypage = () => {


    return (
        <div className="orderhistorygrid">
            <div></div>
            <div>
                <OrderHistory />
            </div>
            <div>

            </div>
        </div>
    )
}

export default withAuthentication(Orderhistorypage)