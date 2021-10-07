import { Modal, Alert } from 'react-bootstrap'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const NotificationModal = ({ show, centered, currentmodalmessage, onHide, alertvariant, successmessage, additionalcustomcomponent, Customcomponent }) => {
    return (
        <Modal show={show} centered={centered} contentClassName="modalwithoutcolor" onHide={() => onHide(false)} >
            <Alert variant={alertvariant} >
                <div className="d-flex justify-content-center">
                    <h5>
                        {additionalcustomcomponent === undefined && 
                             currentmodalmessage === successmessage ?
                             <>
                                 <div className="d-flex flex-column">
                                     <div className="d-flex justify-content-center">
                                         <CheckCircleIcon style={{ color: "green" }} />
                                     </div>
 
                                     <div >
                                         {currentmodalmessage}
                                     </div>
                                 </div>
                             </>
                             : additionalcustomcomponent === undefined && 
                             <>
                                 <div className="row">
                                     <div className="col-1"><ErrorRoundedIcon style={{ color: "red" }} /> </div>
                                     <div className="col-10">
                                         <h5>{currentmodalmessage}</h5>
 
                                     </div>
                                 </div>
                             </>
                        }
                           

                        {
                            additionalcustomcomponent !== undefined && Customcomponent
                        }

                    </h5>
                </div>
            </Alert>
        </Modal>
    )
}