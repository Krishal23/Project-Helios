import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import styles from './styles/LoginPopup.module.css';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import Signup from './SignupPopup.jsx'; // Import the Signup component
import { redirect } from 'react-router-dom';

function LoginPopup({ closePopup,openSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useAuth(); // Destructure isAuthenticated from context
    
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        setIsAuthenticated(false); // Update logged-in status
    };

    useEffect(() => {
        console.log("Authentication state updated:", isAuthenticated);
    }, [isAuthenticated]);


    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("@!")

        try {
            console.log("1")
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            }, {
                withCredentials: true, // Include credentials with the request
            });
            console.log("Full response:", response);
            console.log({ response });

            console.log("11")

            if (response.data.success) {
                console.log("2")
                setIsAuthenticated(true); // Set user as logged in
                console.log("21")
                localStorage.setItem('token', response.data.token); // Store token
                console.log("22")
                closePopup(); // Close popup after login
                console.log("23")
                
            } else {
                console.log("3")
                alert('Invalid credentials');
            }
        } catch (error) {
            console.log("4")
            console.error('Login error:', error);
            // Enhanced error handling
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            alert(message);
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
                <h2 className={styles.login}>
                    Login
                </h2>
                <form className={styles.loginForm} onSubmit={handleLogin}>
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
                        Log In
                    </button>
                </form>
                <p>
                    Don't have an account?{' '}
                    <button onClick={() => { closePopup(); openSignup(); }}>
                        Sign Up
                    </button>
                </p>

                

                {/* Uncomment below if you want to show logout button conditionally */}
                {isAuthenticated && <button onClick={handleLogout}>Log Out</button>}
            </div>
        </div>
    );
}

export default LoginPopup;
