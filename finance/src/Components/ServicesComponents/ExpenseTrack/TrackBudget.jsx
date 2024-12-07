import { useState, useEffect } from 'react';
import styles from '../../styles/TrackBudget.module.css';
import { useTheme } from '../../../ThemeContext';

const TrackBudget = ({ loggedExpenses, onBudgetChange }) => {
    const { isDarkTheme } = useTheme();
    const [expenses, setExpenses] = useState(loggedExpenses || []);
    const [budget, setBudget] = useState(0); // State to hold the budget
    const [budgetInput, setBudgetInput] = useState('');
    const [previousBudget, setPreviousBudget] = useState(0);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch the budget from the server
        const fetchBudget = async () => {
            console.log("1")
            try {
                const response = await fetch('http://localhost:5000/budget', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Ensure credentials are sent
                });
                console.log("2", response)

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message);
                    return;
                }

                const data = await response.json();
                console.log(budget,"asfdgsf")
                setBudget(data.budget);
                setPreviousBudget(data.budget);
                setBudgetInput(data.budget.toString());
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        fetchBudget();
    }, []);

    useEffect(() => {
        // Update expenses whenever loggedExpenses change
        setExpenses(loggedExpenses);
    }, [loggedExpenses]);

    const handleBudgetInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
            setBudgetInput(inputValue);
        }
    };

    const handleSetBudget = async () => {
        try {
            await onBudgetChange(Number(budgetInput) || 0);
            setPreviousBudget(Number(budgetInput)); // Update previous budget display
            setSuccessMessage('Budget updated successfully!');
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = budget - totalExpenses;

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.content}>
                <div className={styles.budgetColumn}>
                    <h2 className={styles.title}>Track Your Budget</h2>

                    <div className={styles.budgetInput}>
                        <label htmlFor="budget">Set Your Budget:</label>
                        <input
                            type="text"
                            id="budget"
                            value={budgetInput}
                            onChange={handleBudgetInputChange}
                            className={styles.input}
                            placeholder="Enter your budget"
                        />
                        <button 
                            className={styles.setButton} 
                            onClick={handleSetBudget}
                        >
                            Set Budget
                        </button>
                    </div>

                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <h3 className={styles.previousBudget}>
                        Current Budget: ${previousBudget.toFixed(2)}
                    </h3>

                    <h3 className={styles.summaryTitle}>Budget Summary</h3>
                    <div className={styles.summary}>
                        <p>Total Expenses: <span className={styles.expenseAmount}>${totalExpenses.toFixed(2)}</span></p>
                        <p>Remaining Budget: 
                            <span className={remainingBudget >= 0 ? styles.remainingAmount : styles.overspent}>
                                ${remainingBudget >= 0 ? remainingBudget.toFixed(2) : 'Overspent!'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackBudget;
