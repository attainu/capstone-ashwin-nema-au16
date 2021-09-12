import { Modal, Alert } from 'react-bootstrap'
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
export const NotificationModal = ({ show, centered, currentmodalmessage, onHide, alertvariant, successmessage, contentClassName }) => {
    return (
        <Modal show={show} centered={centered} contentClassName={`modalwithoutcolor ${contentClassName !== undefined && contentClassName}`} onHide={() => onHide(false)} >
            <Alert variant={alertvariant} >
                <div className="d-flex justify-content-center">
                    <h5>
                        {currentmodalmessage === successmessage ?
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
                            :
                            <>
                                <div className="row">
                                    <div className="col-1"><ErrorRoundedIcon style={{ color: "red" }} /> </div>
                                    <div className="col-10">
                                        <h5>{currentmodalmessage}</h5>

                                    </div>
                                </div>
                            </>
                        }
                    </h5>
                </div>
            </Alert>
        </Modal>
    )
}