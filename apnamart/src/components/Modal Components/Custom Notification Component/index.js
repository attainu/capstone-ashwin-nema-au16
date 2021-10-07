import { Link } from "react-router-dom"

export const CustomModalNotificationComponent = ({message, linkmessage, link, linktext}) => {
    return (
        <>
        <p>{message}</p> 
        {linkmessage !== undefined &&  <p className="smalltext text-center">{linkmessage} <Link to={link} >{linktext} </Link></p>}
        </>
    )
}