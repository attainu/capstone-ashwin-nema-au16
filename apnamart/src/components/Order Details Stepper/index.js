import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { OrderStepLabelIcon, Orderstepslabelsconnector, OrderTimelineConnector, OrderDetailsIcon } from '../Custom Stepper Component'
import {steps, cancellationsteps} from '../../utils'

export const OrderDetailsStepper = ({ orderdatedata, ordertimeline }) => {

    function OrderTimelineIcon(props) {
        const { active, completed, className } = props;
        const icons = {
            1: <DoneIcon />,
            2: <LocalShippingIcon />,
            3: <DeliveryDiningIcon />,
            4: <DoneIcon />
        };
        return (
            <OrderDetailsIcon active={active} completed={completed} className={className} icon={icons[String(props.icon)]} backgroundcolor={'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'} />
        );
    }

    const OrderPlacedIcon = (props) => {
        const { active, completed, className } = props
        return (
            <OrderDetailsIcon active={active} completed={completed} className={className} icon={<DoneIcon />} backgroundcolor={'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);'} />
        )
    }

    const OrderCancelledIcon = (props) => {
        const { active, completed, className } = props
        return (
            <OrderDetailsIcon active={active} completed={completed} className={className} icon={<ClearIcon />} backgroundcolor={'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'} />
        )
    }

    return (
        <>
            {
                orderdatedata.length === 4 &&
                <>

                    <Stepper alternativeLabel activeStep={4} connector={<Orderstepslabelsconnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={OrderStepLabelIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    <Stepper alternativeLabel activeStep={ordertimeline} connector={<OrderTimelineConnector  backgroundimage='linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)' height={3} border={0} top={22} borderradius={1} />}>
                        {orderdatedata.map((label, index) => (
                            <Step key={index}>
                                <StepLabel StepIconComponent={OrderTimelineIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </>
            }
            {
                orderdatedata.length === 2 &&
                <>
                    {
                        orderdatedata.length === 2 &&
                        <>

                            <Stepper alternativeLabel activeStep={1} connector={<Orderstepslabelsconnector />}>
                                {cancellationsteps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={OrderStepLabelIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <Stepper alternativeLabel activeStep={1} connector={<OrderTimelineConnector height={3} border={0} borderradius={1} top={22} backgroundimage={'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'} />}>
                                <Step>
                                    <StepLabel StepIconComponent={OrderPlacedIcon} >{orderdatedata[0]}</StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel StepIconComponent={OrderCancelledIcon} >{orderdatedata[1]}</StepLabel>
                                </Step>
                            </Stepper>
                        </>
                    }
                </>
            }
        </>
    )
}