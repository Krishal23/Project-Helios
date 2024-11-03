import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import styles from '../../styles/LogExpense.module.css';
import { useTheme } from '../../../ThemeContext';
import { FaTrashAlt } from 'react-icons/fa'; // Icon for deleting expenses

const LogExpense = ({ expenses, setExpenses }) => {
    const { isDarkTheme } = useTheme();

    // Function to handle adding a new expense
    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    // Function to handle deleting an expense
    const deleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h2 className={styles.title}>Log Your Expense</h2>
            <div className={styles.columns}>
                <div className={styles.formColumn}>
                    <ExpenseForm onAddExpense={addExpense} />
                </div>
                <div className={styles.expenseColumn}>
                    <h3>Logged Expenses</h3>
                    {expenses.length === 0 ? (
                        <p>No expenses logged yet.</p>
                    ) : (
                        <ul>
                            {expenses.map((exp, index) => (
                                <li key={index} className={styles.expenseItem}>
                                    <div>
                                        {exp.date} - {exp.category}: <strong>${exp.amount}</strong> ({exp.notes})
                                    </div>
                                    <button
                                        onClick={() => deleteExpense(index)}
                                        className={styles.deleteButton}
                                        aria-label="Delete expense"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogExpense;
