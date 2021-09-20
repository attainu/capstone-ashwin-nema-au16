import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosinstance, PATHS } from "../../config"
import { validateuserpageaccess, checkorderdate, orderstatusmesssages, makesubpath } from '../../utils'
import { useParams } from "react-router"
import { OrderDetailsStepper, DetailsTable } from '../../components'
import { Alert } from "react-bootstrap"
import './index.css'
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import { Link } from "react-router-dom"

export const Orderdetails = ({ location: { state }, history }) => {
  const dispatch = useDispatch()
  const { orderid } = useParams()
  const { Profile, Auth, Productsdata: { products } } = useSelector(state => state)
  const [orderdetails, changeorderdetails] = useState(state)
  const [orderdatedata, changeorderdata] = useState(["", "", "", ""])
  const [ordertimeline, changeordertimeline] = useState(0)
  const [orderdisplaydetails, changedisplaydetails] = useState(["", ""])
  const [orderdetailstabledata, changeorderdetailstabledata] = useState([])

  useEffect(() => {
    const ispageaccessvalid = validateuserpageaccess(dispatch, history, Profile, Auth)
    if (orderdetails === undefined && ispageaccessvalid) {
      axiosinstance.post(`/user/order/orderdetails/${orderid}`).then(({ data }) => {

        const {error} = data
        if (error !== undefined) {
          history.push(PATHS.HOME)
          return
        }
        changeorderdetails(data)
      }).catch(() => {
        history.push(PATHS.NOTFOUND)
      })
    }

    document.body.style.backgroundColor = "#f1f3f6"
    return () => {
      document.body.style.backgroundColor = "white"
    }
  }, [history, Profile, Auth, orderid, changeorderdetails, orderdetails, dispatch])

  useEffect(() => {
    if (orderdetails !== undefined && orderdatedata[0] === "") {

      const { CreatedAt, Status } = orderdetails
      if (Status === "Order cancelled") {
        changeorderdata(["dd", ""])
        return
      }
      const { ordertimestatus, deliverystatus, shippingdate, outfordeliverydate, deliverydate, orderplaceddate, ordereddatewithtime, delivereddatewithtime } = checkorderdate(CreatedAt)
      const { notshipped, shipped, outfordelivery, delivered } = orderstatusmesssages
      changeordertimeline(ordertimestatus)
      changedisplaydetails([deliverystatus, ordereddatewithtime])

      switch (deliverystatus) {
        case notshipped:
          changeorderdata([orderplaceddate, "", "", ""])
          return

        case shipped:
          changeorderdata([orderplaceddate, shippingdate, "", ""])
          return

        case outfordelivery:
          changeorderdata([orderplaceddate, shippingdate, outfordeliverydate, ""])
          return

        case delivered:
          changedisplaydetails([deliverystatus, delivereddatewithtime])
          changeorderdata([orderplaceddate, shippingdate, outfordeliverydate, deliverydate])
          return

        default:
          return
      }
    }
  }, [orderdatedata, changeorderdata, orderdetails, ordertimeline, changeordertimeline, changedisplaydetails])

  useEffect(() => {
    if (orderdetails !== undefined ) {
      const {Name} = Profile
      const {PaymentMode, Price, PaymentId} = orderdetails
      let orderdetailstabledata = [{Name},{Price},{"Payment Mode":PaymentMode} ]
      if (PaymentId !== undefined) {
        orderdetailstabledata.push({"Payment Id":PaymentId})
      }
      changeorderdetailstabledata([...orderdetailstabledata])
    }
  }, [orderdetails, Profile, changeorderdetailstabledata])
  return (
    <>
      {
        orderdetails !== undefined &&
        <>
          <div className="orderdetailsdivider">
            <div>
              <Alert className="text-break" variant="warning" >
                <h3 >Order status</h3>
                <p> {orderdisplaydetails[0]}</p>
                {
                  orderdisplaydetails[0] === orderstatusmesssages["delivered"] ? <p >Delivered on {orderdisplaydetails[1]} </p> : <p>Ordered on {orderdisplaydetails[1]} </p>
                }
              </Alert>
            </div>
            <div className="orderdetailitems" >
              <div >

              </div>
              <div className="profilecontentdisplaycolor mb-3 ps-3 pt-3 pb-3">
                <span > <strong >Track Order</strong> </span>
                <OrderDetailsStepper orderdatedata={orderdatedata} ordertimeline={ordertimeline} />
              </div>
              <div></div>

            </div>
          </div>

          <div className="orderdetailsdivider">
            <div>
              <Alert className="text-break" variant="success">
                <strong><p>Delivery Address:</p></strong>
                <p>{orderdetails["DeliveryAddress"]}</p>
              </Alert>

              <DetailsTable title={"Order Details"} tabledata={orderdetailstabledata} />

            </div >
            <div className="orderdetailitems pb-3">
              <div></div>
              <div className="profilecontentdisplaycolor ps-3 pt-3 pb-1">

                <strong className="ordereditemgrid">
                  <p>Ordered Items ({Object.keys(orderdetails["OrderedItems"]).length})</p>
                  <p> </p>
                  <p>Total Price</p>
                </strong>


                <SimpleBar style={{ height: "400px" }}>
                  {
                    Object.keys(orderdetails["OrderedItems"]).map((item, index) => {
                      const { count, price } = orderdetails["OrderedItems"][item]
                      const { image, name } = products[item]
                      return (
                        <div className="ordereditemgrid mb-3 border-bottom" key={index}>
                          <div>
                            <Link className="text-decoration-none text-dark" to={makesubpath(PATHS.PRODUCT, item)} >
                              <img className="orderdetailitemimage" src={image} alt={name} />
                            </Link>

                          </div>
                          <div><p><Link className="text-decoration-none text-dark" to={makesubpath(PATHS.PRODUCT, item)} >{name} </Link> </p> <p> Price: {price}</p> <span>Quantity: {count}</span> </div>
                          <div>{price * count} </div>
                        </div>
                      )
                    })
                  }
                </SimpleBar>

              </div>
              <div></div>
            </div>
          </div>

        </>
      }
    </>
  )
}