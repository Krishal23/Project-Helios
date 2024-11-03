// Signup.jsx
import { useState } from 'react';
import axios from 'axios';
import styles from './styles/Signup.module.css';

function Signup({ closePopup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
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
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
