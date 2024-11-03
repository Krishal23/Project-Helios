import FinancialModeling from './EventManagement/FinancialModeling';
import EventPlanning from './EventManagement/EventPlanning';
import ExecutionNotes from './EventManagement/ExecutionNotes';
import PreviousProjects from './EventManagement/PreviousProjects'; // Import the new component
import styles from '../styles/ProjectEventManagement.module.css';
import React ,{ useState } from 'react';
import { useTheme } from '../../ThemeContext'; // Importing useTheme

const ProjectEventManagement = () => {
    const [financialData, setFinancialData] = useState({});
    const [eventData, setEventData] = useState({});
    const [executionNotes, setExecutionNotes] = useState({});
    
    // State to hold combined previous projects
    const [previousProjects, setPreviousProjects] = useState([]);

    // Use theme context
    const { isDarkTheme } = useTheme();

    // Combine project data whenever it changes
    const combineProjectData = () => {
        const combinedProjects = [];
        if (eventData.title && financialData.model && executionNotes.notes) {
            combinedProjects.push({
                title: eventData.title,
                event: eventData.description,
                financialModel: financialData.model,
                notes: executionNotes.notes,
                status: executionNotes.status,
            });
        }
        setPreviousProjects(combinedProjects);
    };

    // Trigger the combine function when any of the data changes
    React.useEffect(() => {
        combineProjectData();
    }, [eventData, financialData, executionNotes]);

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
                        <FinancialModeling setFinancialData={setFinancialData} />
                    </div>

                    <div className={styles.section} id="execution-notes">
                        <h2 className={styles.sectionTitle}>Execution Notes</h2>
                        <ExecutionNotes setExecutionNotes={setExecutionNotes} />
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <h2 className={styles.previewTitle}>Preview</h2>
                    <div className={styles.previewContent}>
                        <h3>Event Data:</h3>
                        <pre>{JSON.stringify(eventData, null, 2)}</pre>
                        <h3>Financial Data:</h3>
                        <pre>{JSON.stringify(financialData, null, 2)}</pre>
                    </div>
                </div>
            </div>

            <div className={styles.previousProjectsSection}>
                <PreviousProjects previousProjects={previousProjects} />
            </div>
        </div>
    );
};

export default ProjectEventManagement;
