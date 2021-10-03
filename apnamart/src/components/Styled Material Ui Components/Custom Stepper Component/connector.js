import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

export const Orderstepslabelsconnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
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

export const  OrderTimelineConnector = styled(StepConnector)(({ theme, backgroundimage,height, border,top, borderradius }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: top,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:backgroundimage,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:backgroundimage,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: height,
        border: border,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: borderradius,
    },
}));