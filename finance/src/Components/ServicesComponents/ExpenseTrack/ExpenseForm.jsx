import { useState, useEffect } from 'react';
import styles from '../../styles/ExpenseForm.module.css';

const ExpenseForm = ({ editingExpense, onUpdateExpense }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Populate the form with the data of the expense being edited
    useEffect(() => {
        if (editingExpense) {
            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
            setDate(new Date(editingExpense.date).toISOString().split('T')[0]); // Format date correctly
            setNotes(editingExpense.notes || ''); // Handle optional notes
        } else {
            // Clear form fields if no expense is being edited (i.e., when adding a new expense)
            setAmount('');
            setCategory('');
            setDate('');
            setNotes('');
        }
    }, [editingExpense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!amount || !category || !date) {
            setErrorMessage("Please fill in all required fields!");
            return;
        }

        const expense = {
            amount: parseFloat(amount),
            category,
            date,
            notes,
        };

        // Check if we are updating an existing expense
        if (editingExpense) {
            onUpdateExpense(expense); // Call the update handler passed as a prop
        } else {
            try {
                // Make API call to add a new expense
                const response = await fetch('http://localhost:5000/expenses', {
                    method: 'POST',
                    credentials: 'include', // Important for sending cookies/session info
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(expense),
                });

                const data = await response.json();

                if (response.ok) {
                    // Expense added successfully
                    setSuccessMessage("Expense added successfully!");
                    // Clear form fields
                    setAmount('');
                    setCategory('');
                    setDate('');
                    setNotes('');
                    setErrorMessage(''); // Clear any previous error
                } else {
                    // Handle server error
                    setErrorMessage(data.message || 'Failed to add expense.');
                }
            } catch (error) {
                // Handle network or other errors
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            <div className={styles.formGroup}>
                <label htmlFor="amount">Amount ($):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="notes">Notes:</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes"
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
        </form>
    );
};

export default ExpenseForm;
