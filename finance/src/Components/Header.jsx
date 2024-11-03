import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useState } from 'react';
import styles from './styles/Header.module.css';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import LoginPopup from './LoginPopup'; // Import LoginPopup component
import ProfilePage from './ProfilePage'; // Import ProfilePage component
import Signup from './Signup';
import { useAuth } from '../AuthContext.jsx';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    // const [isLoggedIn, setIsLoggedIn] = useState(true); // State to check if the user is logged in
    const [showPopup, setShowPopup] = useState(false); // State to show/hide login popup or profile page
    const [isSignup, setIsSignup] = useState(false); // State for showing signup popup

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle the visibility of the popup or profile page
        setIsSignup(false);
    };
    const openSignup = () => {
        setIsSignup(true);
    };

    return (
        <>
            <header className={`${styles.header} ${isDarkTheme ? styles.dark : styles.light}`}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <span>Helios</span>
                </div>
                <nav className={styles.navLinks}>
                    <ul>
                        <div className={styles.themeToggle} onClick={toggleTheme}>
                            <span
                                className={styles.toggleSwitch}
                                style={{ left: isDarkTheme ? '26px' : '4px' }}
                            >
                                {isDarkTheme ? '🌙' : '☀️'}
                            </span>
                        </div>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/membership">Membership</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li className={styles.profileLink} onClick={togglePopup}>
                            {/* Trigger the popup/profile page when clicking on the profile icon */}
                            <img className={styles.profile} src={logo2} alt="Profile" />
                        </li>
                    </ul>
                </nav>
            </header>

           {/* Render LoginPopup or Signup based on state */}
           {showPopup && !isLoggedIn && 
                (isSignup ? <Signup closePopup={togglePopup} /> : <LoginPopup closePopup={togglePopup} openSignup={openSignup} />)
            }
            {showPopup && isLoggedIn && <ProfilePage closePopup={togglePopup} />}
        </>
    );
}

export default Header;
