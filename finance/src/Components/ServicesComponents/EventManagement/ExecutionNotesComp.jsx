import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { useTheme } from '../../../ThemeContext';
import styles from '../../styles/ExecutionNotesComp.module.css';

const ExecutionNotesComp = ({ setExecutionNotes }) => {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [event, setEvent] = useState('');
    const [importance, setImportance] = useState('Normal');
    const [editIndex, setEditIndex] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]);

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };

    const handleImportanceToggle = () => {
        setImportance((prev) => (prev === 'High' ? 'Low' : 'High'));
    };

    const handleSaveNote = () => {
        const dateTime = new Date().toLocaleString();
        const newNote = {
            notes,
            category,
            event,
            importance,
            dateTime,
        };

        if (editIndex !== null) {
            const updatedNotes = savedNotes.map((note, index) =>
                index === editIndex ? newNote : note
            );
            setSavedNotes(updatedNotes);
            setEditIndex(null);
        } else {
            setSavedNotes([...savedNotes, newNote]);
        }
        
        // Reset fields
        setNotes('');
        setCategory('');
        setEvent('');
        setImportance('Normal');
        setExecutionNotes(savedNotes);
    };

    const handleEditNote = (index) => {
        const noteToEdit = savedNotes[index];
        setNotes(noteToEdit.notes);
        setCategory(noteToEdit.category);
        setEvent(noteToEdit.event);
        setImportance(noteToEdit.importance);
        setEditIndex(index);
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = savedNotes.filter((_, i) => i !== index);
        setSavedNotes(updatedNotes);
        setExecutionNotes(updatedNotes);
    };

    return (

        <div className={`${styles.component} ${isDarkTheme ? styles.dark : styles.light}`}>
        <div className={`${styles.executionNotes} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h3 className={styles.title}>Execution Notes</h3>
            <textarea
                value={notes}
                onChange={handleNotesChange}
                className={styles.textArea}
                placeholder="Write your notes here..."
            />
            <input
                type="text"
                className={styles.categoryInput}
                placeholder="Category"
                value={category}
                onChange={handleCategoryChange}
            />
            <input
                type="text"
                className={styles.eventInput}
                placeholder="Event"
                value={event}
                onChange={handleEventChange}
            />
            <div className={styles.importanceToggle}>
                <span>Importance:</span>
                <button className={styles.toggleButton} onClick={handleImportanceToggle}>
                    {importance === 'High' ? <FaStar color="gold" /> : <FaRegStar />}
                    {importance}
                </button>
            </div>
            <button className={styles.saveButton} onClick={handleSaveNote}>
                {editIndex !== null ? 'Update Note' : 'Save Note'}
            </button>

            <div className={styles.notesContainer}>
                <h4>Saved Notes</h4>
                {savedNotes.length > 0 ? (
                    savedNotes.map((note, index) => (
                        <div key={index} className={styles.noteCard}>
                            <p>{note.notes}</p>
                            <p><strong>Category:</strong> {note.category}</p>
                            <p><strong>Event:</strong> {note.event}</p>
                            <p><strong>Importance:</strong> {note.importance}</p>
                            <p><strong>Date & Time:</strong> {note.dateTime}</p>
                            <div className={styles.buttonGroup}>
                                <button className={styles.editButton} onClick={() => handleEditNote(index)}>
                                    <FaEdit /> Edit
                                </button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteNote(index)}>
                                    <FaTrashAlt /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notes saved yet.</p>
                )}
            </div>
        </div>
        </div>

    );
};

export default ExecutionNotesComp;
