
import './footer.css'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <FaFacebook name="logo-facebook"></FaFacebook>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <FaInstagram name="logo-twitter"></FaInstagram>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <FaTwitter name="logo-linkedin"></FaTwitter>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <FaLinkedinIn name="logo-instagram"></FaLinkedinIn>
                    </a></li>
                </ul>
                <ul className="menu">
                    <li className='menu-item'><Link className='a'>Home</Link></li>
                    <li className='menu-item'><Link>About us</Link></li>
                    <li className='menu-item'><Link>Divisions</Link></li>
                    <li className='menu-item'><Link>Contact us</Link></li>
                    <li className='menu-item'><Link>Language</Link></li>

                </ul>
                <p>&copy; 2024 Knoz academy </p>
            </footer>
        </>
    )
}

export default Footer
 