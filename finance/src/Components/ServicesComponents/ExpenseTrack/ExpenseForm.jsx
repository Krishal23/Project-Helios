import { useState } from 'react';
import styles from '../../styles/ExpenseForm.module.css';


const ExpenseForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
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

        // Call the parent function to add the expense
        onAddExpense(expense);

        // Reset form fields
        setAmount('');
        setCategory('');
        setDate('');
        setNotes('');
        setErrorMessage(''); // Clear any previous error
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.formGroup}>
                <label htmlFor="amount">Amount ($):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0" // Ensure no negative numbers
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
            <button type="submit" className={styles.submitButton}>Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
