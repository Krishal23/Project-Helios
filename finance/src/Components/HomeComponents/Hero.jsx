// Hero.js
import { useTheme } from '../../ThemeContext'; // Adjust the import path based on your structure
import styles from '../styles/Hero.module.css';
import phone from '../../assets/phone-mockup.png'
import { FaLock, FaUsers, FaHeart } from 'react-icons/fa';


function Hero() {
    const { isDarkTheme } = useTheme();

    return (
        <div className={`${styles.hero} ${isDarkTheme ? styles.dark : styles.light}`}>
            <header className={styles.header}>
                
                    <div >
                        <a href="#">
                            <img className={styles.phone} src={phone} alt="Logo" />
                        </a>
                    
                </div>
            </header>

            <section className={styles.content}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>
                        Simple way to manage <span className={styles.highlight}>personal finances</span>
                    </h1>
                    <p className={styles.description}>
                    Our tool helps you track your expenses based on your previous activity and provides insights to manage your money efficiently.
                    </p>
                    <button className={styles.button}>Get Started for Free</button>
                    <div className={styles.appAvailability}>
                        <div className={styles.features}>
                            <Feature icon={<FaLock />} title="100% Secured data" />
                            <Feature icon={<FaUsers />} title="100+ users" />
                            <Feature icon={<FaHeart />} title="40+ 5-star Reviews" />
                            {/* <Feature icon={<FaStar />} title="App of the day" /> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


const Feature = ({ icon, title }) => {
    return (
        <div className={styles.feature}>
            <div className={styles.icon}>{icon}</div>
            <p className={styles.featureText}>{title}</p>
        </div>
    );
};


export default Hero;
