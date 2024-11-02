// src/Components/Membership.jsx
import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import styles from './styles/Membership.module.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Membership = () => {
    const { isDarkTheme } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', interests: '', feedback: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Optionally, handle form data submission to a backend or API
        setFormData({ name: '', email: '', phone: '', interests: '', feedback: '' }); // Reset form fields
    };

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.content}>
                <div className={styles.benefits}>
                    <h1 className={styles.title}>Membership Benefits</h1>
                    <div className={styles.benefitCards}>
                        <div className={styles.benefitCard}>
                            <AiOutlineCheckCircle className={styles.checkIcon} />
                            <p>Exclusive access to resources</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <AiOutlineCheckCircle className={styles.checkIcon} />
                            <p>Personalized financial guidance</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <AiOutlineCheckCircle className={styles.checkIcon} />
                            <p>Networking opportunities with peers</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <AiOutlineCheckCircle className={styles.checkIcon} />
                            <p>Discounts on events and merchandise</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <AiOutlineCheckCircle className={styles.checkIcon} />
                            <p>Regular newsletters with tips and updates</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Join Us</h2>
                    <form onSubmit={handleSubmit} className={styles.membershipForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="interests">Interests</label>
                            <input
                                type="text"
                                id="interests"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                placeholder="What interests you?"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="feedback">Feedback/Comments</label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                placeholder="Any additional feedback or comments?"
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Have Interest in Membership?</button>
                    </form>
                    {isSubmitted && (
                        <div className={styles.popup}>
                            <div className={styles.popupContent}>
                                <h2>Thank You for Your Interest!</h2>
                                <p>We will reach out soon.</p>
                                <button onClick={() => setIsSubmitted(false)} className={styles.closeButton}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Membership;
