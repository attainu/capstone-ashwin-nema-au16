import './index.css'
import { Userintro, OrderSection, Viewlocationoption } from '../../Profile Section Component'

export const Section1 = ({selectoption2display ,changeoption2display}) => {
    return (
        <>
            <div className="profileseperator1 me-3 pe-3 ps-3 pb-3">
                <Userintro />
                <OrderSection />
                <Viewlocationoption />
            </div>
        </>
    )
}