// VisualReports.js
import React, { useState } from 'react';
import ToggleButtons from './VisualReports/ToggleButtons';
import EventsSection from './VisualReports/EventsSection';
import ExpensesSection from './VisualReports/ExpensesSection';
import styles from '../styles/VisualReports.module.css';

const VisualReports = ({ expenses, events, budget }) => {
    const [activeSection, setActiveSection] = useState('expenses');

    // Handlers to toggle sections
    const showEvents = () => setActiveSection('events');
    const showExpenses = () => setActiveSection('expenses');

    return (
        <div className={styles.visualReportsContainer}>
            {/* <ToggleButtons
                activeSection={activeSection}
                onShowEvents={showEvents}
                onShowExpenses={showExpenses}
            /> */}

            <div className={styles.sectionContent}>
                {activeSection === 'events' ? (
                    <EventsSection events={events} />
                ) : (
                    <ExpensesSection expenses={expenses} budget={budget}/>
                )}
            </div>
        </div>
    );
};

export default VisualReports;
