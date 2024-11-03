import React from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth for logout functionality
import styles from './styles/ProfilePage.module.css';

function ProfilePage({ closePopup }) {
    const { logout } = useAuth(); // Get logout function from context

    const handleLogout = () => {
        logout(); // Call the logout function from context
        closePopup(); // Close the profile popup after logging out
    };

    // Handle clicks on the overlay
    const handleOverlayClick = (e) => {
        // Only close the popup if the overlay (not the content) is clicked
        if (e.target === e.currentTarget) {
            console.log("sgfdhf")
            closePopup();
        }
    };

    return (
        <div className={styles.popupOverlay} onClick={handleOverlayClick}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closePopup}>
                    &times;
                </button>
                <h2>User Profile</h2>
                {/* Replace with actual profile details */}
                <p>Username: TestUser</p>
                <p>Email: test@example.com</p>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
