import styles from '../../styles/PreviousProjects.module.css'; // Import your styles

const PreviousProjects = ({ previousProjects }) => {
    return (
        <div className={styles.previousProjectsContainer}>
            <h2>Previous Events</h2>
            {previousProjects.length > 0 ? (
                previousProjects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                        <h3>{project.title}</h3>
                        <p><strong>Event:</strong> {project.event}</p>
                        <p><strong>Financial Model:</strong> {project.financialModel}</p>
                        <p><strong>Notes:</strong> {project.notes}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                    </div>
                ))
            ) : (
                <p>No previous projects available.</p>
            )}
        </div>
    );
};

export default PreviousProjects;
