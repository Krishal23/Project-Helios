import LogExpense from './ExpenseTrack/LogExpense';
import TrackBudget from './ExpenseTrack/TrackBudget';
import { useTheme } from '../../ThemeContext';
import styles from '../styles/ExpenseTracking.module.css';

const ExpenseTracking = ({expenses,setExpenses, budget, onBudgetChange}) => {
    const { isDarkTheme } = useTheme(); // Access the theme


    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h1 className={styles.title}>Expense Tracking & Budgeting</h1>
            <p className={styles.subtitle}>Manage your finances with our comprehensive tools.</p>
            <div className={styles.features}>
                <LogExpense expenses={expenses} setExpenses={setExpenses} /> {/* Pass expenses and setExpenses */}
                <TrackBudget loggedExpenses={expenses} budget={budget} onBudgetChange={onBudgetChange} /> {/* Pass expenses to TrackBudget */}
            </div>
        </div>
    );
};

export default ExpenseTracking;
