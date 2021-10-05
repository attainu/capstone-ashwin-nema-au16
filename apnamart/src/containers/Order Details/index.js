import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosinstance, PATHS } from "../../config"
import { orderstatusmesssages, makesubpath, setorderdetailspagedata, modalstatesetter, setorderpagedatatoordercancelled } from '../../utils'
import { useParams } from "react-router"
import { OrderDetailsStepper, DetailsTable, NotificationModal } from '../../components'
import { Alert } from "react-bootstrap"
import './index.css'
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { withAuthentication } from '../../Higher Order Components'
import useMediaQuery from '@mui/material/useMediaQuery'

const Orderdetails = ({ location: { state }, history }) => {
  const dispatch = useDispatch()
  const { orderid } = useParams()
  const { Profile, Auth, Productsdata: { products } } = useSelector(state => state)

  const [orderdetails, changeorderdetails] = useState(state)
  const [orderdatedata, changeorderdata] = useState(["", "", "", ""])
  const [ordertimeline, changeordertimeline] = useState(0)
  const [orderdisplaydetails, changedisplaydetails] = useState(["", ""])
  const [orderdetailstabledata, changeorderdetailstabledata] = useState([])
  const [modal, showmodal] = useState(false)
  const [modalmessage, setmodalmessage] = useState("")
  const [modalvariant, changemodalvariant] = useState("danger")

  const orderdetailsmargin = useMediaQuery('(max-width:450px)')
  const displaymodalconfiguration = [showmodal, modalmessage, setmodalmessage, modalvariant, changemodalvariant]

  useEffect(() => {
    if (orderdetails === undefined) {
      axiosinstance.post(`/user/order/orderdetails/${orderid}`).then(({ data }) => {
        const { error } = data
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
      setorderdetailspagedata(orderdetails, changedisplaydetails, changeorderdata, changeordertimeline)
    }
  }, [orderdatedata, changeorderdata, orderdetails, ordertimeline, changeordertimeline, changedisplaydetails])


  useEffect(() => {
    if (orderdetails !== undefined) {
      const { Name } = Profile
      const { PaymentMode, Price, PaymentId } = orderdetails
      let orderdetailstabledata = [{ Name }, { Price }, { "Payment Mode": PaymentMode }]
      if (PaymentId !== undefined) {
        orderdetailstabledata.push({ "Payment Id": PaymentId })
      }
      changeorderdetailstabledata([...orderdetailstabledata])
    }
  }, [orderdetails, Profile, changeorderdetailstabledata])

  const Canceluserorder = () => {
    if (orderdetails !== undefined) {
      const { _id } = orderdetails
      axiosinstance.post(`/user/order/cancelorder/${_id}`).then(({ data }) => {
        const { error, cancellationtime, success } = data
        if (error !== undefined || success !== true) {
          modalstatesetter("Sorry you have been logged out. Please reload the page and sign in again to continue", "danger", displaymodalconfiguration)
          return
        }
        setorderpagedatatoordercancelled(orderdetails.CreatedAt, null, changedisplaydetails, changeorderdata, cancellationtime, state)

      }).catch(() => {
        modalstatesetter("Sorry time for cancelling order is over. Now you cannot change your order", "danger", displaymodalconfiguration)
      })
    }
  }

  return (
    <>
      {orderdetails !== undefined &&
        <>
          <div className="orderdetailsdivider mt-5">
            <div>
              <Alert className="text-break" variant="warning" >
                <h3 >Order status</h3>
                <p> {orderdisplaydetails[0]}</p>

                {
                  orderdetails.Status !== "Order cancelled" ? <> {
                    orderdisplaydetails[0] === orderstatusmesssages["delivered"] ? <p >Delivered on {orderdisplaydetails[1]} </p> : <p>Ordered on {orderdisplaydetails[1]} </p>
                  } </> :
                    <p> Order cancelled on {orderdisplaydetails[1]} </p>
                }

                {
                  orderdatedata.length !== 2 && ordertimeline === 0 && <Button className="navy text-white p-2" onClick={Canceluserorder} variant="contained"  >Cancel Order</Button>
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

          <div className="orderdetailsdivider mb-3">
            <div>
              <Alert className="text-break" variant="success">
                <strong><p>Delivery Address:</p></strong>
                <p>{orderdetails["DeliveryAddress"]}</p>
              </Alert>

              <div className={`${orderdetailsmargin && "mb-3"}`}>
                <DetailsTable title={"Order Details"} tabledata={orderdetailstabledata} />
              </div>

            </div >
            <div className="orderdetailitems pb-3">
              <div></div>
              <div className="profilecontentdisplaycolor ps-3 pt-3 pb-1">

                <strong className="ordereditemgrid">
                  <p>Ordered Items ({Object.keys(orderdetails["OrderedItems"]).length})</p>
                  <p> </p>
                  <p>Total Price</p>
                </strong>


                <SimpleBar style={{ height: "45vh" }}>
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
          <NotificationModal show={modal} centered={true} currentmodalmessage={modalmessage} onHide={showmodal} alertvariant={modalvariant} successmessage="Your order is successfully cancelled" />
        </>
      }
    </>
  )
}

export default withAuthentication(Orderdetails)