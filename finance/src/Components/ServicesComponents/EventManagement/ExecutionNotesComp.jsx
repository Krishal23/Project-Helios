import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { useTheme } from '../../../ThemeContext';
import styles from '../../styles/ExecutionNotesComp.module.css';

const ExecutionNotesComp = ({ events }) => {
    const { isDarkTheme } = useTheme();
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(''); // Store selected event's ID for saving notes
    const [selectedDisplayEvent, setSelectedDisplayEvent] = useState(''); // Store selected event for displaying notes
    const [importance, setImportance] = useState('Normal');
    const [editIndex, setEditIndex] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]);





    // Fetch notes when the selected display event changes
    useEffect(() => {
        if (selectedDisplayEvent) {
            fetchNotes(selectedDisplayEvent.projectId);
        }
    }, [selectedDisplayEvent]);

    // Function to fetch notes for the selected event
    const fetchNotes = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5000/notes/${projectId}`, {
                method: 'GET',
                credentials: 'include', // Include session cookies
            });
            const data = await response.json();
            if (response.ok) {
                setSavedNotes(data.notes || []);
            } else {
                console.error('Error fetching notes:', data.message);
                setSavedNotes([]);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSaveEventChange = (e) => {
        const event = events.find(event => event.eventName === e.target.value);
        setSelectedEvent(event); // Set the selected event for saving the note
    };

    const handleDisplayEventChange = (e) => {
        const event = events.find(event => event.eventName === e.target.value);
        setSelectedDisplayEvent(event); // Set the selected event for displaying the notes
    };

    const handleImportanceToggle = () => {
        setImportance((prev) => (prev === 'High' ? 'Low' : 'High'));
    };

    const handleSaveNote = async () => {

        console.log("1")
        const dateTime = new Date().toLocaleString();
        const newNote = {
            notes,
            category,
            importance,
            dateTime,
            projectId: selectedEvent.projectId,
        };
        console.log(newNote)

        // Save the note to the backend
        try {
            const response = await fetch('http://localhost:5000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
                credentials: 'include', // Important for sending session cookies
            });

            console.log(response)
            const data = await response.json();
            console.log("fgchvbjn,m.")
            console.log(data)
            if (response.ok) {
                setSavedNotes((prevNotes) => [...prevNotes, newNote]);
            } else {
                console.error('Error saving note:', data.message);
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }

        // Reset fields after saving
        setNotes('');
        setCategory('');
        setSelectedEvent('');
        setImportance('Normal');
    };

    const handleEditNote = (index) => {
        console.log("editing");
    };

    const handleDeleteNote = async (index) => {
        console.log("deleting");
    };

    return (
        <div className={`${isDarkTheme ? styles.dark : styles.light}`}>
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
            <div className={styles.eventDropdown}>
                <label htmlFor="saveEvent">Select Event to Save Note:</label>
                <select
                    id="saveEvent"
                    value={selectedEvent.eventName || ''}
                    onChange={handleSaveEventChange}
                    className={styles.eventSelect}
                >
                    <option value="">--Select an Event--</option>
                    {events.map((event) => (
                        <option key={event.projectId} value={event.eventName}>
                            {event.eventName}
                        </option>
                    ))}
                </select>
            </div>

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

            <div className={styles.eventDropdown}>
                <label htmlFor="displayEvent">Select Event to Display Notes:</label>
                <select
                    id="displayEvent"
                    value={selectedDisplayEvent.eventName || ''}
                    onChange={handleDisplayEventChange}
                    className={styles.eventSelect}
                >
                    <option value="">--Select an Event--</option>
                    {events.map((event) => (
                        <option key={event.projectId} value={event.eventName}>
                            {event.eventName}
                        </option>
                    ))}
                </select>
            </div>

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
    );
};

export default ExecutionNotesComp;
