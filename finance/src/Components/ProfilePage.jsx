import React from 'react';
import styles from './styles/ProfilePage.module.css';

function ProfilePage({ closePopup }) {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closePopup}>
                    &times;
                </button>
                <h2>User Profile</h2>
                {/* Replace with actual profile details */}
                <p>Username: TestUser</p>
                <p>Email: test@example.com</p>
                <button className={styles.logoutButton} onClick={closePopup}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
