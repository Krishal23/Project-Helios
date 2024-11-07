import FinancialModeling from './EventManagement/FinancialModeling';
import EventPlanning from './EventManagement/EventPlanning';
import ExecutionNotes from './EventManagement/ExecutionNotes';
import PreviousProjects from './EventManagement/PreviousProjects'; // Import the new component
import styles from '../styles/ProjectEventManagement.module.css';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeContext'; // Importing useTheme
import Preview from './EventManagement/PreviewComponent';
import ExecutionNotesComp from './EventManagement/ExecutionNotesComp';



const ProjectEventManagement = () => {


    const [financialData, setFinancialData] = useState({});
    const [eventData, setEventData] = useState({});
    const [executionNotes, setExecutionNotes] = useState({});

    // State to hold combined previous projects
    const [previousProjects, setPreviousProjects] = useState([]);

    // Use theme context
    const { isDarkTheme } = useTheme();

    // Combine project data whenever it changes
    // const combineProjectData = () => {
    //     const combinedProjects = [];
    //     if (eventData.title && financialData.model && executionNotes.notes) {
    //         combinedProjects.push({
    //             title: eventData.title,
    //             event: eventData.description,
    //             financialModel: financialData.model,
    //             notes: executionNotes.notes,
    //             status: executionNotes.status,
    //         });
    //     }
    //     setPreviousProjects(combinedProjects);
    // };

    // Trigger the combine function when any of the data changes
    // React.useEffect(() => {
    //     combineProjectData();
    // }, [eventData, financialData, executionNotes]);




    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            console.log("1")
            try {
                const response = await fetch('http://localhost:5000/get-events', {
                    method: 'GET',
                    credentials: 'include', // Include session cookies
                  });
                console.log("2",response)
                const data = await response.json();
                console.log("3")

                console.log(data)
                if (data.success) {
                    setEvents(data.events);  // Set the events state
                    console.log("fdg", events)

                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch events', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);




    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h1 className={styles.title}>Project & Event Management</h1>
            <div className={styles.columns}>
                <div className={styles.leftColumn}>
                    <div className={styles.section} id="event-planning">
                        <h2 className={styles.sectionTitle}>Event Planning</h2>
                        <EventPlanning setEventData={setEventData} />
                    </div>

                    <div className={styles.section} id="financial-modeling">
                        <h2 className={styles.sectionTitle}>Financial Modeling</h2>
                        <FinancialModeling events={events} />
                    </div>

                    <div className={styles.section} id="execution-notes">
                        <h2 className={styles.sectionTitle}>Execution Notes</h2>
                        <ExecutionNotesComp events={events} />
                    </div>
                </div>
                <div className={styles.rightColumn}>
                <Preview events={events}  />
                </div>
            </div>

            {/* <div className={styles.previousProjectsSection}>
                <PreviousProjects previousProjects={previousProjects} />
            </div> */}
        </div>
    );
};

export default ProjectEventManagement;
