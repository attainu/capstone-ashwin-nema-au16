import './index.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Alert } from 'react-bootstrap';
import useMediaQuery from '@mui/material/useMediaQuery'
export const AboutMyself = () => {
    const profilemessagequery = useMediaQuery('(max-width:700px)')
    return (
        <>
            <div className="profilegrid" >
                <div className="profilebackground">
                    <div className={`profileimagecontainer `}>
                        <img className={`profileimage `} src="https://res.cloudinary.com/ash006/image/upload/v1632483175/ashwin_x6sbti.jpg" alt="Ashwin Nema" />
                    </div>
                    <div className={`${profilemessagequery === true && "d-flex justify-content-center"}`} >

                        <Alert className="w-75" variant="warning">
                            <p className="mt-3"><strong>Hello</strong></p>
                            <p className="mt-3"><strong>My name is Ashwin Nema. I am currently a trainee at AttainU. I made this project using React and Node.js,</strong></p>
                            <p className="mt-3">
                                <span >
                                    <a rel="noreferrer" href="https://twitter.com/ashwin_nema" target="_blank"><TwitterIcon color="primary" ></TwitterIcon>  </a>
                                    <a rel="noreferrer" href="https://www.linkedin.com/in/ashwin-nema-4223671a5/" target="_blank"><LinkedInIcon color="primary" ></LinkedInIcon>  </a>
                                </span>
                            </p>
                        </Alert>

                    </div>
                </div>
                <div className="skillsbackground ">
                    <h3 className="text-center">My skills </h3>
                    <div className="myskills w-100">
                        <Alert className="skillsalert" variant="info">
                            <div>Git</div>
                            <div>GitHub</div>
                        </Alert>
                        <Alert className="skillsalert" variant="info">
                            <div>HTML</div>
                            <div>CSS</div>
                            <div>Bootstrap</div>
                        </Alert>
                        <Alert className="skillsalert" variant="info">
                            <div>Javascript</div>
                            <div>Node.js</div>
                        </Alert>
                        <Alert className="skillsalert" variant="info">
                            <div>React</div>
                            <div>MongoDb</div>
                            <div>SQL</div>
                        </Alert>
                    </div>
                </div>
            </div>
        </>
    )
}