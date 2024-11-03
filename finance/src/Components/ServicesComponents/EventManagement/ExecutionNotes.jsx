import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa"; // Import an icon from react-icons
import styles from '../../styles/ExecutionNotes.module.css'; // Assume you have a CSS file for styling

const ExecutionNotes = () => {
    return (
        
            <Link to="/notes" className={styles.executionNotesLink}>
                <FaClipboardList className={styles.icon} />
                <span className={styles.linkText}>See Notes</span>
            </Link>
       
    );
};

export default ExecutionNotes;
