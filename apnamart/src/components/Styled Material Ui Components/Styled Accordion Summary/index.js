import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: `${theme.palette.action.hover} !important`,
    width:"100%"
}));
