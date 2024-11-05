import { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import styles from '../../styles/LogExpense.module.css';
import { useTheme } from '../../../ThemeContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Icons for deleting and editing expenses

const LogExpense = ({expenses, setExpenses}) => {
    const { isDarkTheme } = useTheme();
    // const [] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch expenses on mount
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const response = await fetch('http://localhost:5000/get-expenses', {
            method: 'GET',
            credentials: 'include', // Include session cookies
          });
          const data = await response.json();
          
          if (data.success) {
            setExpenses(data.expenses);
            console.log("Expenses:", data.expenses); // Log the expenses
          } else {
            setError(data.message || 'Failed to fetch expenses.');
          }
        } catch (error) {
          console.error('Error fetching expenses:', error);
          setError('An error occurred while fetching expenses.');
        } finally {
          setLoading(false);
        }
      };

      fetchExpenses();
    }, []);

    // Handle deleting an expense
    const deleteExpense = async (index) => {
      const expenseId = expenses[index]._id;
      try {
        const response = await fetch(`http://localhost:5000/expenses/${expenseId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();

        if (data.success) {
          setExpenses(expenses.filter((_, i) => i !== index)); // Remove the deleted expense
          console.log("Expense deleted successfully.");
        } else {
          console.error("Failed to delete expense.");
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    };

    // Start editing an expense
    const startEditing = (index) => {
      setEditIndex(index);
      setEditingExpense(expenses[index]); // Load the selected expense into the form
    };

    // Handle updating an expense
    const updateExpense = async (updatedExpense) => {
      const expenseId = expenses[editIndex]._id;

      try {
        const response = await fetch(`http://localhost:5000/expenses/${expenseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updatedExpense), // Send the updated expense data
        });

        const data = await response.json();

        if (data.success) {
          const updatedExpenses = [...expenses];
          updatedExpenses[editIndex] = data.expense; // Replace the updated expense in the array
          setExpenses(updatedExpenses);
          setEditIndex(null);
          setEditingExpense(null);
          console.log("Expense updated successfully.");
        } else {
          console.error("Failed to update expense.");
        }
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h2 className={styles.title}>Log Your Expense</h2>
            <div className={styles.columns}>
                <div className={styles.formColumn}>
                    <ExpenseForm
                        editingExpense={editingExpense}
                        onUpdateExpense={updateExpense}
                    />
                </div>
                <div className={styles.expenseColumn}>
                    <h3>Logged Expenses</h3>
                    {expenses.length === 0 ? (
                        <p>No expenses logged yet.</p>
                    ) : (
                        <ul>
                            {expenses.map((exp, index) => (
                                <li key={exp._id} className={styles.expenseItem}>
                                    <div>
                                        {new Date(exp.date).toLocaleDateString()} - {exp.category}: <strong>${exp.amount}</strong> ({exp.notes})
                                    </div>
                                    <button
                                        onClick={() => startEditing(index)}
                                        className={styles.editButton}
                                        aria-label="Edit expense"
                                    >
                                        <FaEdit />
                                    </button>
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
