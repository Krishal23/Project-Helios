import { useState, useEffect } from 'react';
import styles from '../../styles/TrackBudget.module.css';
import { useTheme } from '../../../ThemeContext';

const TrackBudget = ({ loggedExpenses }) => {
    const { isDarkTheme } = useTheme();
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState(loggedExpenses || []);

    useEffect(() => {
        // Update expenses whenever loggedExpenses change
        setExpenses(loggedExpenses);
    }, [loggedExpenses]);

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
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
                            type="number"
                            id="budget"
                            value={budget}
                            onChange={handleBudgetChange}
                            className={styles.input}
                            placeholder="Enter your budget"
                        />
                    </div>
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
