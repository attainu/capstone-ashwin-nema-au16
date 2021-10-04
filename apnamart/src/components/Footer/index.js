import './index.css'
import { Link } from 'react-router-dom'
import { PATHS } from '../../config'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    // mt-5
    return (
        <>
            <footer className="footer bg-warning  pt-3 text-break">
                <div className="footer-content space-between ms-2">
                    <div className="d-flex flex-column">
                        <strong>Quick Links</strong>
                        <Link className="text-decoration-none text-dark smalltext" to={PATHS.ABOUT}>About Developer</Link>
                        <Link className="text-decoration-none text-dark smalltext" to={PATHS.FAQ}>FAQs</Link>
                    </div>
                    <div className="d-flex flex-column">
                        <strong>Contact us:  </strong>
                        <div>
                            <a rel="noreferrer" href="https://twitter.com/ashwin_nema" target="_blank"><TwitterIcon color="primary" ></TwitterIcon>  </a>
                            <a rel="noreferrer" href="https://www.linkedin.com/in/ashwin-nema-4223671a5/" target="_blank"><LinkedInIcon color="primary" ></LinkedInIcon>  </a>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                  ©All rights reserved. Apna Mart
                </div>
            </footer>
        </>
    )
}

export default Footer