import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaCaretDown } from 'react-icons/fa';
import styles from '../../styles/Preview.module.css';

const Preview = ({ events }) => {

    const [selectedDisplayEvent, setSelectedDisplayEvent] = useState(''); // Store selected event for displaying notes
    const handleDisplayEventChange = (e) => {
        const event = events.find(event => event.eventName === e.target.value);
        setSelectedDisplayEvent(event); // Set the selected event for displaying the notes
    };
    console.log(selectedDisplayEvent)



    useEffect(() => {

        if (selectedDisplayEvent && selectedDisplayEvent.projectId) {
            // Fetch data once selectedEvent is confirmed as updated
            fetchEvent(selectedDisplayEvent.projectId);
            
        }
    }, [selectedDisplayEvent]); // Only re-run when selectedEvent changes

    const fetchEvent = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5000/preview-event/${projectId}`, {
                method: 'GET',
                credentials: 'include',
            });
            // console.log("vhbj",response)
            const data = await response.json();
            // console.log("vhbj",data)
            if (response.ok) {
                setSelectedDisplayEvent(data); 
            } else {
                console.error('Error fetching notes:', data.message);
                setSelectedDisplayEvent([]);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            setSelectedDisplayEvent([]);
        }
    };

    console.log(selectedDisplayEvent)
    console.log(selectedDisplayEvent.project?.eventPlanning?.attendees, "efakslmdfasodkf")
    console.log(JSON.stringify(selectedDisplayEvent?.project?.financialModeling?.budget , null, 2), "pwfplsaksafdvfslmdfasodkf")

    const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

    return (
        <div className={styles.rightColumn}>
            
            <div className={styles.eventDropdown}>
            <label htmlFor="displayEvent" className={styles.label}>Select Event to Display Preview:</label>
            <div className={styles.selectWrapper}>
                <select
                    id="displayEvent"
                    value={selectedDisplayEvent.eventName}
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
                <FaCaretDown className={styles.icon} />
            </div>
        </div>
            {
                selectedDisplayEvent && (
                    <div>
                        <h3>Event Information</h3>
                    <div className={styles.infoCard}>
                        <h4><FaCalendarAlt /> Event Name: {selectedDisplayEvent?.project?.eventPlanning?.eventName}</h4>
                        <p><FaCalendarAlt /> Date: {formatDate(selectedDisplayEvent.project?.eventPlanning?.date)}</p>
                        <p><FaMapMarkerAlt /> Location: {selectedDisplayEvent.project?.eventPlanning?.location|| 'N/A'}</p>
                        <p><FaUsers /> Attendees: {selectedDisplayEvent.project?.eventPlanning?.attendees}</p>
                        <p><FaMoneyBillWave /> Notes: {selectedDisplayEvent.project?.eventPlanning?.notes }</p> 
                    </div>

                    <h3>Financial Data</h3>
                    <div className={styles.infoCard}>
                        <p><strong>Budget:</strong></p>
                        <pre>{JSON.stringify(selectedDisplayEvent.project?.financialModeling?.budget || {}, null, 2)}</pre>
                        <p><strong>Income:</strong></p>
                        <pre>{JSON.stringify(selectedDisplayEvent.project?.financialModeling?.income || {}, null, 2)}</pre>
                        <p><strong>Profit Margin:</strong> {selectedDisplayEvent.project?.financialModeling?.profitMargin ? selectedDisplayEvent.project?.financialModeling.profitMargin * 100 : 'N/A'}%</p>
                    </div>
                    <h3>Notes</h3>
                    <div className={styles.infoCard}>
                        {selectedDisplayEvent.project?.executionNotes?.length > 0 ? selectedDisplayEvent.project?.executionNotes.map((note, index) => (
                            <div key={index}>
                                <h4>{note.eventName} - {note.category}</h4>
                                <p><strong>Importance:</strong> {note.importance}</p>
                                <p><strong>Date & Time:</strong> {formatDate(note.dateTime)}</p>
                                <p><strong>Note:</strong> {note.notes}</p>
                            </div>
                        )) : <p>No Execution Notes available.</p>}
                    </div>
                    </div>
                )
            }

        </div>
    );
};

export default Preview;
