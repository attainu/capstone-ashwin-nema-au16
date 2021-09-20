function ordinal(number) {
    const english_ordinal_rules = new Intl.PluralRules("en", {
        type: "ordinal"
    });
    const suffixes = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th"
    }
    const suffix = suffixes[english_ordinal_rules.select(number)];
    return (number + suffix);
}



const properformatteddate = (givendate, days) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const desireddate = new Date()
    if (givendate === undefined) {
        desireddate.setDate(desireddate.getDate() + days)
    } else {
        desireddate.setDate(givendate.getDate() + days)
    }
    return weekdays[desireddate.getDay()] + ", " + ordinal(desireddate.getDate()) + " " + month[desireddate.getMonth()]

}

const properformattedtimewithdate = (givendate, days=0) => {
    let hours = givendate.getHours()
    let minutes = givendate.getMinutes()
    const ampm = hours >= 12 ? "p.m." : "a.m."
    hours = hours % 12;
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    return hours + ":" + minutes + " " + ampm + " " + properformatteddate(givendate, days)
}

export const deliverydate = properformatteddate(undefined, 3)

export const orderstatusmesssages = {
    notshipped:"Not yet shipped",
    shipped:"Order Shipped",
    outfordelivery:"Out for delivery",
    delivered:"Order delivered"
}

export const checkorderdate = (orderdate, cancellationdate) => {
    const orderplaceddate = new Date(orderdate)
    const currenttime = new Date()
    const dividingfactor = 60 * 60 * 24
    const difference = (currenttime.getTime() - orderplaceddate.getTime()) / 1000
    const timepassed = difference / dividingfactor
    const shippingdate = properformatteddate(orderplaceddate, 1)
    const outfordeliverydate = properformatteddate(orderplaceddate, 2)
    const deliverydate = properformatteddate(orderplaceddate, 3)
    const currentorderstatus = { shippingdate, outfordeliverydate, deliverydate, orderplaceddate:properformatteddate(orderplaceddate,0), ordereddatewithtime:properformattedtimewithdate(orderplaceddate) ,delivereddatewithtime:properformattedtimewithdate(orderplaceddate, 3) }
    const {notshipped, shipped, outfordelivery, delivered} = orderstatusmesssages

    if (cancellationdate !== undefined) {
        const ordercancellationdate = new Date(cancellationdate)
        currentorderstatus.ordercancellationdate = properformatteddate(ordercancellationdate,0)
    }

    if (timepassed >= 3) {
        return { deliverystatus: delivered, ordertimestatus: 3, ...currentorderstatus }
    }

    if (timepassed < 1) {
        return { deliverystatus: notshipped, ordertimestatus: 0, ...currentorderstatus }
    }

    if (timepassed < 2) {
        return { deliverystatus: shipped, ordertimestatus: 1, ...currentorderstatus }
    }

    return { deliverystatus: outfordelivery, ordertimestatus: 2, ...currentorderstatus }
}