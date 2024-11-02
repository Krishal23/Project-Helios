import { useTheme } from '../../ThemeContext';
import styles from '../styles/Features.module.css';
import { FaRegChartBar, FaRegCreditCard, FaRegHandshake } from 'react-icons/fa';

const Features = () => {
    const { isDarkTheme } = useTheme();

    const featuresData = [
        {
            id: 1,
            icon: <FaRegChartBar size={40} className={styles.icon} />,
            title: "Expense Tracking",
            description: "Effortlessly track your daily expenses with our intuitive interface, allowing you to categorize and visualize your spending habits."
        },
        {
            id: 2,
            icon: <FaRegCreditCard size={40} className={styles.icon} />,
            title: "Financial Insights",
            description: "Get valuable insights into your spending habits, empowering you to make informed decisions and improve your budgeting skills."
        },
        {
            id: 3,
            icon: <FaRegHandshake size={40} className={styles.icon} />,
            title: "Personalized Guidance",
            description: "Receive tailored advice based on your financial behaviors and goals, ensuring you stay on track with your budget."
        },
    ];

    return (
        <section className={`${styles.featuresSection} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.container}>
                <h2 className={styles.title}>Our Features</h2>
                <div className={styles.featuresGrid}>
                    {featuresData.map(feature => (
                        <div key={feature.id} className={`${styles.featureItem} ${isDarkTheme ? styles.darkItem : styles.lightItem}`}>
                            {feature.icon}
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
