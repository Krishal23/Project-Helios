import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import styles from './styles/Header.module.css';
import logo from '../assets/logo.png';
import { FaUserCircle } from 'react-icons/fa'; // Default user icon
import logo2 from '../assets/logo2.png';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import ProfilePage from './ProfilePage';
import { useAuth } from '../AuthContext';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();
    const { isAuthenticated, user, login } = useAuth(); // Access user object from context
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // Add this line

    const navigate = useNavigate(); // Hook for navigation

    const openLoginPopup = () => {
        setIsLoginPopupOpen(true);
        setIsSignupPopupOpen(false); // Ensure signup is closed
    };

    const openSignupPopup = () => {
        setIsSignupPopupOpen(true);
        setIsLoginPopupOpen(false); // Ensure login is closed
    };

    const openProfilePopup = () => {
        setIsProfilePopupOpen(true); // Set the profile popup state to true
    };

    const closePopup = () => {
        setIsLoginPopupOpen(false);
        setIsSignupPopupOpen(false);
        setIsProfilePopupOpen(false); // Ensure the profile popup is closed
        navigate('/');
    };


    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    credentials: 'include' // Ensure credentials are sent
                });
                if (response.ok) {
                    const data = await response.json();
                    login(data.user); // Update your auth context to set user state
                }
            } catch (error) {
                console.error('Error fetching user session:', error);
            }
        };

        checkUserSession();
    }, [login]);

    const handleServicesClick = () => {
        if (!isAuthenticated) {
            openLoginPopup(); // Open login popup if not authenticated
        } else {
            navigate('/services'); // Navigate to services if authenticated
        }
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
                        {/* <li><Link to="/services">Services</Link></li> */}
                        <li><div onClick={handleServicesClick} className={styles.servicesLink}>Services</div></li>
                        <li><Link to="/membership">Membership</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        {/* <li>
                            <div className={styles.profileLink} onClick={isAuthenticated ? openProfilePopup : openLoginPopup}>
                                <img className={styles.profile} src={logo2} alt="Profile" />
                            </div>
                        </li> */}
                        <li>
                            <div className={styles.profileLink} onClick={isAuthenticated ? openProfilePopup : openLoginPopup}>
                                {isAuthenticated ? (
                                    user?.displayPicture? (
                                        <img
                                            className={styles.profile}
                                            src={user.displayPicture}
                                            alt="Profile"
                                            onError={(e) => { e.target.onerror = null; e.target.src = logo2; }} // Fallback to logo2 on error
                                        />
                                    ) : (
                                        <img
                                            className={styles.profile}
                                            src={logo}
                                            alt="Profile"
                                            onError={(e) => { e.target.onerror = null; e.target.src = logo2; }} // Fallback to logo2 on error
                                        />
                                    )
                                ) : (
                                    <FaUserCircle className={styles.avatarIcon} size={30}/> // Default avatar icon
                                )}
                            </div>
                        </li>

                    </ul>
                </nav>
            </header>

            {/* Render LoginPopup and SignupPopup based on state */}
            {isLoginPopupOpen && (
                <LoginPopup closePopup={closePopup} openSignup={openSignupPopup} />
            )}
            {isSignupPopupOpen && (
                <SignupPopup closePopup={closePopup} openLogin={openLoginPopup} />
            )}

            {/* Show ProfilePage when logged in */}
            {isAuthenticated && isProfilePopupOpen && <ProfilePage closePopup={closePopup} />}
        </>
    );
}

export default Header;
