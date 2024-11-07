import { useState } from 'react';
import { useTheme } from '../../../ThemeContext'; // Adjust the import path based on your structure
import styles from '../../styles/EventPlanning.module.css';
import { FaCalendarAlt, FaLocationArrow, FaUsers, FaClipboardCheck } from 'react-icons/fa';

const EventPlanning = () => {
    const { isDarkTheme } = useTheme();
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        date: '',
        location: '',
        attendees: '',
        notes: ''
    });
    const [error, setError] = useState(null); // To handle error messages
    const [successMessage, setSuccessMessage] = useState(null); // To handle success message

    const handleChange = (e) => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('1');
        
        try {
            console.log('2');
            const response = await fetch('http://localhost:5000/event-planning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
                credentials: 'include', // Ensure cookies are sent with the request
            });
            console.log('3', response);
            
            const data = await response.json();
            console.log('4', data);
            
            if (response.ok) {
                console.log('5');
                setSuccessMessage('Event planned successfully!');
                setError(null); // Reset error if successful
                // Optionally, reset the form
                setEventDetails({
                    eventName: '',
                    date: '',
                    location: '',
                    attendees: '',
                    notes: ''
                });
                console.log(eventDetails);
            } else {
                console.log('6');
                setError(data.message || 'Error occurred while planning the event.');
                setSuccessMessage(null); // Reset success message if there's an error
            }
        } catch (error) {
            console.log('7');
            setError('Server error. Please try again later.');
            setSuccessMessage(null); // Reset success message if there's an error
        }
    };

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h2 className={styles.title}>Event Planning</h2>
            
            {/* Display error or success message */}
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.column}>
                    <div className={styles.inputGroup}>
                        <FaClipboardCheck className={styles.icon} />
                        <input
                            type="text"
                            name="eventName"
                            value={eventDetails.eventName}
                            onChange={handleChange}
                            placeholder="Event Name"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaCalendarAlt className={styles.icon} />
                        <input
                            type="date"
                            name="date"
                            value={eventDetails.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaLocationArrow className={styles.icon} />
                        <input
                            type="text"
                            name="location"
                            value={eventDetails.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.inputGroup}>
                        <FaUsers className={styles.icon} />
                        <input
                            type="number"
                            name="attendees"
                            value={eventDetails.attendees}
                            onChange={handleChange}
                            placeholder="Number of Attendees"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea
                            name="notes"
                            value={eventDetails.notes}
                            onChange={handleChange}
                            placeholder="Additional Notes"
                            rows="5"
                        />
                    </div>
                </div>
                <button type="submit" className={styles.button}>Plan Event</button>
            </form>
        </div>
    );
};

export default EventPlanning;
