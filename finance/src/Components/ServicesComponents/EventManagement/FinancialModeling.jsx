import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../../ThemeContext'; // Importing useTheme
import styles from '../../styles/FinancialModeling.module.css';

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialModeling = ({ setFinancialData }) => {
    const [budget, setBudget] = useState({
        venue: 0,
        catering: 0,
        marketing: 0,
        other: 0,
    });
    const [income, setIncome] = useState({
        ticketSales: 0,
        sponsorships: 0,
        merchandise: 0,
    });
    const [profitMargin, setProfitMargin] = useState(0);

    const totalBudget = Object.values(budget).reduce((acc, val) => acc + Number(val), 0);
    const totalIncome = Object.values(income).reduce((acc, val) => acc + Number(val), 0);
    const totalProjectedProfit = totalIncome - totalBudget;

    const handleBudgetChange = (e) => {
        setBudget({ ...budget, [e.target.name]: e.target.value });
    };

    const handleIncomeChange = (e) => {
        setIncome({ ...income, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFinancialData({
            budget,
            income,
            profitMargin,
        });
    };

    // Use theme context
    const { isDarkTheme } = useTheme();

    return (
        <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
            <h2 className={styles.title}>Financial Modeling</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.section}>
                    <h3>Budget Overview</h3>
                    {Object.keys(budget).map((key) => (
                        <div className={styles.inputGroup} key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="number"
                                name={key}
                                value={budget[key]}
                                onChange={handleBudgetChange}
                                placeholder={`Enter ${key} budget`}
                            />
                        </div>
                    ))}
                    <div className={styles.summary}>
                        <p><strong>Total Budget: </strong>${totalBudget}</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Revenue Projections</h3>
                    {Object.keys(income).map((key) => (
                        <div className={styles.inputGroup} key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="number"
                                name={key}
                                value={income[key]}
                                onChange={handleIncomeChange}
                                placeholder={`Enter expected ${key}`}
                            />
                        </div>
                    ))}
                    <div className={styles.chartContainer}>
                        <Pie
                            data={{
                                labels: Object.keys(income),
                                datasets: [{
                                    data: Object.values(income),
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                }],
                            }}
                            options={{ responsive: true, maintainAspectRatio: false }}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Financial Goals</h3>
                    <div className={styles.inputGroup}>
                        <label htmlFor="profitMargin">Desired Profit Margin (%):</label>
                        <input
                            type="number"
                            name="profitMargin"
                            value={profitMargin}
                            onChange={(e) => setProfitMargin(e.target.value)}
                            placeholder="Enter desired profit margin"
                        />
                    </div>
                    <div className={styles.summary}>
                        <p><strong>Total Income: </strong>${totalIncome}</p>
                        <p><strong>Projected Profit: </strong>${totalProjectedProfit}</p>
                    </div>
                </div>

                <button type="submit" className={styles.button}>Save Financial Data</button>
            </form>

            <div className={styles.actionableInsights}>
                <h3>Actionable Insights</h3>
                <p>Consider reducing marketing costs if total expenses exceed projected income.</p>
                <p>Explore additional sponsorship opportunities to enhance revenue.</p>
            </div>
        </div>
    );
};

export default FinancialModeling;
