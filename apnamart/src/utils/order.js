import { checkorderdate } from './date'
const createHistory = require("history").createBrowserHistory

export const orderstatusmesssages = {
    notshipped: "Not yet shipped",
    shipped: "Order Shipped",
    outfordelivery: "Out for delivery",
    delivered: "Order delivered"
}

export const setorderpagedatatoordercancelled = (CreatedAt, OrderCancellationTime, changedisplaydetails, changeorderdata, cancellationtime, state) => {
    if (cancellationtime === undefined) {
        const { orderplaceddate, ordercancellationdatewithtime, ordercancellationdate } = checkorderdate(CreatedAt, OrderCancellationTime)
        changedisplaydetails(["Order cancelled", ordercancellationdatewithtime])
        changeorderdata([orderplaceddate, ordercancellationdate])
        return
    }
    const history = createHistory();
    if (history.location.state !== undefined) {
        let state = undefined
        history.replace({ ...history.location, state })
    }
    const { orderplaceddate, ordercancellationdatewithtime, ordercancellationdate } = checkorderdate(CreatedAt, cancellationtime)
    changedisplaydetails(["Order cancelled", ordercancellationdatewithtime])
    changeorderdata([orderplaceddate, ordercancellationdate])

}

export const setorderdetailspagedata = (orderdetails, changedisplaydetails, changeorderdata, changeordertimeline) => {
    const { notshipped, shipped, outfordelivery, delivered } = orderstatusmesssages
    const { CreatedAt, Status, OrderCancellationTime } = orderdetails

    if (Status === "Order cancelled") {
        setorderpagedatatoordercancelled(CreatedAt, OrderCancellationTime, changedisplaydetails, changeorderdata)
        return
    }
    const { ordertimestatus, deliverystatus, shippingdate, outfordeliverydate, deliverydate, orderplaceddate, ordereddatewithtime, delivereddatewithtime } = checkorderdate(CreatedAt)

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