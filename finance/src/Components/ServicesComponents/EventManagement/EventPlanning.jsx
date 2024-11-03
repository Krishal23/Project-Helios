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

    const handleChange = (e) => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(eventDetails);
    };

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h2 className={styles.title}>Event Planning</h2>
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
