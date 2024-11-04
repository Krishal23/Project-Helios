import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth for logout functionality
import styles from './styles/ProfilePage.module.css';

function ProfilePage({ closePopup }) {
    const { logout } = useAuth(); // Get logout function from context
    const [isEditing, setIsEditing] = useState(false); // State to toggle between view/edit modes
    const [profile, setProfile] = useState(null); // Initially null to indicate loading state
    const [loading, setLoading] = useState(true); // Loading state for data fetching
    const [error, setError] = useState(null); // Error state for any API issues

    // Fetch user profile from the server
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    credentials: 'include', // Important for sending session cookies
                });
                const data = await response.json();
                if (data.success) {
                    setProfile(data.user);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include', // Include session cookies
            });
            logout(); // Clear local auth state
            closePopup(); // Close popup
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // You can add an API call to save the updated profile to the backend here.
        setIsEditing(false);
        console.log('Profile saved:', profile);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.popupOverlay} onClick={handleOverlayClick}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closePopup}>
                    &times;
                </button>
                <h2>User Dashboard</h2>
                {profile && (
                    <div className={styles.profileSection}>
                        <img src={profile.displayPicture} alt="User DP" className={styles.displayPicture} />
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Enter your username"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Enter your email"
                                />
                                <input
                                    type="text"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Short bio"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Phone number"
                                />
                                <button className={styles.saveButton} onClick={handleSave}>
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <p><strong>Username:</strong> {profile.username}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Bio:</strong> {profile.bio}</p>
                                <p><strong>Phone:</strong> {profile.phone}</p>
                                <button className={styles.editButton} onClick={handleEditToggle}>
                                    Edit Profile
                                </button>
                            </>
                        )}
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
