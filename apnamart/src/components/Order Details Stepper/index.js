import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneIcon from '@mui/icons-material/Done';
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const steps = [
    'Order placed',
    'Order shipped',
    'Out for delivery',
    "Delivered"
];

const cancellationsteps = ["Order placed", "Order cancelled"]
export const OrderDetailsStepper = ({ orderdatedata, ordertimeline }) => {
    const Orderstepslabelsconnector = styled(StepConnector)(() => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
            backgroundColor: "#ffffff",
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#ffffff',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#ffffff',
            },
        }
    }));


    function Ordersteplabels() {
        return (
            <div></div>
        );
    }

    Ordersteplabels.propTypes = {
        active: PropTypes.bool,
        className: PropTypes.string,
        completed: PropTypes.bool,
    };
    // 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'  gradient for OrderTimelineConnector
    const OrderTimelineConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: "#4d5dfb",
                backgroundImage:
                    'linear-gradient(315deg, #4d5dfb 0%, #08c8f6 74%);',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: "#4d5dfb",
                backgroundImage:
                    'linear-gradient(315deg, #4d5dfb 0%, #08c8f6 74%);',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    // linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)  backgroundImage for OrderTimelineIconRoot
    const OrderTimelineIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: "#2a2a72",
            backgroundImage:
                'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor: "#2a2a72",
            backgroundImage:
                'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);',
        }),
    }));

    function OrderTimelineIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <DoneIcon />,
            2: <LocalShippingIcon />,
            3: <DeliveryDiningIcon />,
            4: <DoneIcon />
        };

        return (
            <OrderTimelineIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </OrderTimelineIconRoot>
        );
    }

    OrderTimelineIcon.propTypes = {
        active: PropTypes.bool,
        className: PropTypes.string,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    return (
        <>
            {
                orderdatedata.length === 4 &&
                <>

                    <Stepper alternativeLabel activeStep={4} connector={<Orderstepslabelsconnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={Ordersteplabels}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    <Stepper alternativeLabel activeStep={ordertimeline} connector={<OrderTimelineConnector />}>
                        {orderdatedata.map((label, index) => (
                            <Step key={index}>
                                <StepLabel StepIconComponent={OrderTimelineIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </>
            }
        </>
    )
}