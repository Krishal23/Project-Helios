import { useTheme } from '../ThemeContext';
import styles from './styles/AboutUs.module.css';
import teamImage from '../assets/team.jpeg'; // You can add a team image or similar

function AboutUs() {
    const { isDarkTheme } = useTheme();

    return (
        <>
        <div className={`${styles.aboutUs} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.container}>
                <h1>Welcome to Our Student Community</h1>
                <p className={styles.intro}>
                    We are a passionate group of students from <strong>IIT Patna</strong> dedicated to helping our peers manage their finances and achieve financial independence. 
                    Our platform offers students an easy way to <strong>track expenses</strong>, <strong>log income</strong>, and receive <strong>personalized financial guidance</strong>.
                </p>

                <div className={styles.visionSection}>
                    <h2>Our Vision</h2>
                    <p>
                        Our goal is to equip every student with the knowledge and tools to handle their finances smartly, avoid unnecessary debt, and build a foundation for financial success.
                    </p>
                </div>

                {/* New Team Section */}
                <div className={styles.teamSection}>
                    <h2>Meet the Team</h2>
                    <p>Behind every great platform is a dedicated team of innovators. Here are the faces making it all happen!</p>
                    <div className={styles.teamImageWrapper}>
                        <img src={teamImage} alt="Our Team" className={styles.teamImage} />
                    </div>
                </div>

                {/* Values Section */}
                <div className={styles.valuesSection}>
                    <h2>Our Core Values</h2>
                    <div className={styles.values}>
                        <div className={styles.valueItem}>
                            <h3>Transparency</h3>
                            <p>We ensure every financial insight you see is based on real, accessible data, helping you make informed choices.</p>
                        </div>
                        <div className={styles.valueItem}>
                            <h3>Empowerment</h3>
                            <p>We provide the tools and knowledge to empower students in taking control of their financial journey.</p>
                        </div>
                        <div className={styles.valueItem}>
                            <h3>Support</h3>
                            <p>We foster a supportive community where you can learn from others, share tips, and receive guidance.</p>
                        </div>
                    </div>
                </div>

                {/* New Testimonials Section */}
                <div className={styles.testimonialsSection}>
                    <h2>What Our Users Say</h2>
                    <div className={styles.testimonials}>
                        <div className={styles.testimonial}>
                            <p>“This platform has helped me track my monthly expenses easily. Now I know where my money goes and I can save more!”</p>
                            <span>- Akash, 3rd Year Student</span>
                        </div>
                        <div className={styles.testimonial}>
                            <p>“The personalized financial guidance from the team helped me plan my budget better, and I feel more financially secure.”</p>
                            <span>- Riya, 2nd Year Student</span>
                        </div>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className={styles.membership}>
                    <h2>Join Us</h2>
                    <p>Want personalized financial advice, exclusive resources, and a community that supports your financial journey? Become a member today and take control of your future!</p>
                    <a href="#membership" className={styles.joinButton}>Become a Member</a>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default AboutUs;
