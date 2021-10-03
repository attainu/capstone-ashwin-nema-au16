import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';

const OrderDetailsIconRoot = styled('div')(({ theme, ownerState, backgroundcolor }) => ({
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
        backgroundImage:
            backgroundcolor,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            backgroundcolor,
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    }),
}));

export const OrderDetailsIcon = (props) =>  {
    const { active, completed, className, icon, backgroundcolor } = props;
    return (
        <OrderDetailsIconRoot ownerState={{ completed, active }} className={className} backgroundcolor={backgroundcolor}>
            {icon}
        </OrderDetailsIconRoot>
    );
}

OrderDetailsIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

export const OrderStepLabelIcon =() => {
    return (
        <div></div>
    );
}

OrderStepLabelIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
};