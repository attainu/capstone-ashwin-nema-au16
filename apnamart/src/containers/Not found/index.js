import { PATHS } from '../../config'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {  useEffect } from 'react'
export const NotFound = ({ history }) => {
    useEffect(() => {
        setTimeout(() => {
            history.push(PATHS.HOME)
        }, 2500)
    }, [ history])

    return (
        <>
            <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-center mt-5">
                    <SentimentVeryDissatisfiedIcon style={{ fontSize: "25vh" }} />
                </div>
                <h1 className="text-center">404</h1>
                <h3 className="text-center">Not Found</h3>
                <p className="text-center">Sorry the page you are looking for does not exists</p>
            </div>
        </>
    )
}