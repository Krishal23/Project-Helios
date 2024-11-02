// Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing the necessary icons
import styles from './styles/Footer.module.css';
import { useTheme } from '../ThemeContext';

function Footer() {
    const { isDarkTheme } = useTheme();

    return (
        <footer className={`${styles.footer} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.container}>
                <div className={styles.about}>
                    <h4>About Us</h4>
                    <p>Your go-to platform for professional services and support. We’re here to help you succeed.</p>
                </div>
                <div className={styles.links}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#membership">Membership</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className={styles.social}>
                    <h4>Follow Us</h4>
                    <div className={styles.icons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
