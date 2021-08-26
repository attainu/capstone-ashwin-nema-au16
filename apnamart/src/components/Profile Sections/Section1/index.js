import './index.css'
import { Userintro, OrderSection, Viewlocationoption, Viewcartoption } from '../../Profile Section Components'

export const Section1 = ({selectcomponenttodisplay,  changedisplaycomponent}) => {
    return (
        <>
            <div className="profileseperator1 me-3 pe-3 ps-3 pb-3">
                <Userintro  selectcomponenttodisplay={selectcomponenttodisplay}  changedisplaycomponent={changedisplaycomponent} />
                <OrderSection />
                <Viewlocationoption selectcomponenttodisplay={selectcomponenttodisplay}  changedisplaycomponent={changedisplaycomponent} />
                <Viewcartoption />
            </div>
        </>
    )
}