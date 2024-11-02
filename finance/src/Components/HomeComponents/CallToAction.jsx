import { useTheme } from '../../ThemeContext'; // Adjust the import path based on your structure
import styles from '../styles/CallToAction.module.css';
import joinus from '../../assets/joinus.png';

const CallToAction = () => {
    const { isDarkTheme } = useTheme(); // Get the theme context

    const handleClick = () => {
        // Define the action to take on button click, e.g., redirect to another page
        // window.location.href = '/signup'; // Change this to your desired path
        console.log(isDarkTheme)
    };

    return (
        <div className={`${styles.ctaSection} ${isDarkTheme ? styles.dark : ''}`}>
            <div className={styles.container}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>Join Our Community</h1>
                    <p className={styles.description}>
                        Be a part of something bigger. Sign up now to unlock exclusive benefits and resources tailored just for you!
                    </p>
                    <button 
                        className={`${styles.ctaButton} ${isDarkTheme ? styles.darkButton : ''}`} 
                        onClick={handleClick}
                    >
                        Get Started
                    </button>
                </div>
                <div className={styles.imageContent}>
                    <img src={joinus} alt="Join Us" className={styles.ctaImage} />
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
