// ToggleButtons.js
import React from 'react';
import styles from '../../styles/ToggleButtons.module.css';

const ToggleButtons = ({ activeSection, onShowEvents, onShowExpenses }) => {
    return (
        <div className={styles.toggleButtons}>
            <button
                onClick={onShowEvents}
                className={`${styles.toggleButton} ${activeSection === 'events' ? styles.active : ''}`}
            >
                Events
            </button>
            <button
                onClick={onShowExpenses}
                className={`${styles.toggleButton} ${activeSection === 'expenses' ? styles.active : ''}`}
            >
                Expenses
            </button>
        </div>
    );
};

export default ToggleButtons;
