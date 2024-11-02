import { Link } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import styles from './styles/Header.module.css';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
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
                    <li className={styles.profileLink}>
                        <Link to="/profile">
                            {/* <FaUserCircle size={24} /> */}
                            <img className={styles.profile} src={logo2} alt="Logo" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
