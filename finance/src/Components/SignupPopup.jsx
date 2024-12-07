import { useState } from 'react';
import axios from 'axios';
import styles from './styles/Signup.module.css';
import logo from '../assets/logo.png'; // Import logo if needed

function SignupPopup({ closePopup, openLogin }) {
    const [username, setUsername] = useState(''); // New state for username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username, // Include username in the request
                email,
                password,
            });
            if (response.data.success) {
                alert('Signup successful! Please log in.');
                closePopup(); // Close signup popup after successful signup
            } else {
                alert('Signup failed: ' + response.data.message);
            }
        } catch (error) {
            alert('Error occurred during signup. Please try again.');
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closePopup}>
                    &times;
                </button>
                <h2 className={styles.welcome}>
                    Welcome to Helios
                    <img className={styles.logo} src={logo} alt="Logo" />
                </h2>
                <h2 className={styles.signup}>
                    Sign Up
                </h2>
                <form className={styles.signupForm} onSubmit={handleSignup}>
                    <label className={styles.label}>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>
                        Sign Up
                    </button>
                </form>
                <p>
                    Already have an account?{' '}
                    <button onClick={() => { closePopup(); openLogin(); }}>
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
}

export default SignupPopup;
