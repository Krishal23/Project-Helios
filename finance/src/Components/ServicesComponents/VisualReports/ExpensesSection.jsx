import React from 'react';
import { FaDollarSign, FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TimeScale, PointElement, LineElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import styles from '../../styles/ExpensesSection.module.css';
import { useTheme } from '../../../ThemeContext';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TimeScale, PointElement, LineElement);

const ExpensesSection = ({ expenses, budget, previousMonthExpenses }) => {
    const { theme } = useTheme();  // Get the current theme

    // Calculate Total Expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    // Calculate Average Expense
    const averageExpense = totalExpenses / expenses.length;

    // Category-wise Distribution
    const categoryDistribution = expenses.reduce((acc, expense) => {
        if (acc[expense.category]) {
            acc[expense.category] += expense.amount;
        } else {
            acc[expense.category] = expense.amount;
        }
        return acc;
    }, {});

    const categoryLabels = Object.keys(categoryDistribution);
    const categoryAmounts = Object.values(categoryDistribution);

    // Data for Pie Chart (Category-wise Distribution)
    const pieData = {
        labels: categoryLabels,
        datasets: [{
            data: categoryAmounts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
    };

    // Data for Bar Chart (Expense Breakdown)
    const barData = {
        labels: categoryLabels,
        datasets: [{
            label: 'Expenses by Category',
            data: categoryAmounts,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            borderWidth: 1
        }]
    };

    // Data for Time Series (Expenses over Time)
    const timeSeriesData = {
        labels: expenses.map(expense => new Date(expense.date)),
        datasets: [{
            label: 'Expense Over Time',
            data: expenses.map(expense => expense.amount),
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
        }]
    };

    // Progress bar for budget comparison
    const budgetProgress = Math.min((totalExpenses / budget) * 100, 100);

    // Advice messages
    const adviceMessages = [];
    const mostSpentCategory = categoryLabels.reduce((max, category, index) =>
        categoryAmounts[index] > categoryAmounts[max] ? index : max, 0);

    const highestSpendingCategory = categoryLabels[mostSpentCategory];
    adviceMessages.push(`You have spent the most on ${highestSpendingCategory}. Consider reviewing your expenses in this category.`);

    if (categoryDistribution[highestSpendingCategory] > averageExpense * 2) {
        adviceMessages.push(`Your spending on ${highestSpendingCategory} is twice the average. You may want to cut back.`);
    }

    if (totalExpenses > budget) {
        adviceMessages.push(`You're overspending your budget by ₹${totalExpenses - budget}.`);
    } else if (totalExpenses < budget) {
        adviceMessages.push(`You're under budget by ₹${budget - totalExpenses}. Great job!`);
    }

    if (previousMonthExpenses) {
        const spendingChange = totalExpenses - previousMonthExpenses;
        if (spendingChange > 0) {
            adviceMessages.push(`You have spent ₹${spendingChange} more this month than last month.`);
        } else if (spendingChange < 0) {
            adviceMessages.push(`Your spending has decreased by ₹${Math.abs(spendingChange)} this month.`);
        }
    }

    return (
        <div className={`${styles.expensesSection} ${theme === 'dark' ? styles.darkTheme : ''}`}>
            <h2 className={styles.sectionTitle}>Expenses Report</h2>

            {/* Expenses List Section */}
            <div className={styles.expensesList}>
                {expenses.map((expense, index) => (
                    <motion.div
                        key={expense._id}
                        className={styles.expenseCard}
                        initial={{ opacity: 0, transform: 'scale(0.8)' }}
                        animate={{ opacity: 1, transform: 'scale(1)' }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.icon}>{getCategoryIcon(expense.category)}</div>
                            <div className={styles.cardAmount}>₹{expense.amount}</div>
                        </div>
                        <div className={styles.cardBody}>
                            <p className={styles.cardNotes}>{expense.notes}</p>
                            <p className={styles.cardDate}>{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Budget Display Section */}
            {budget && (
                <div className={styles.budgetSection}>
                    <h3>Budget</h3>
                    <p>${budget.toFixed(2)}</p>
                </div>
            )}

            {/* Budget Progress Bar */}
            <div className={styles.budgetProgress}>
                <motion.div
                    className={styles.progressBar}
                    style={{ width: `${budgetProgress}%`, backgroundColor: budgetProgress > 100 ? '#FF4C4C' : '#4CAF50' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${budgetProgress}%` }}
                    transition={{ duration: 1 }}
                />
                <p>{budgetProgress > 100 ? 'Over Budget' : `${budgetProgress.toFixed(2)}% of Budget Used`}</p>
            </div>

            {/* Time Series Chart for Expenses Over Time */}
            <div className={styles.chartWrapper}>
                <h3>Expenses Over Time</h3>
                <Line data={timeSeriesData} options={{
                    responsive: true,
                    scales: {
                        x: { type: 'time', time: { unit: 'day' }, title: { display: true, text: 'Date' } },
                        y: { beginAtZero: true, title: { display: true, text: 'Amount (₹)' } }
                    }
                }} />
            </div>

            {/* Category-wise Distribution */}
            <div className={styles.box}>
                <div className={styles.chartWrapper}>
                    <h3>Category-wise Expenses</h3>
                    <Pie data={pieData} />
                </div>

                {/* Bar Chart for Category Breakdown */}
                <div className={styles.chartWrapper2}>
                    <h3>Expenses Breakdown by Category</h3>
                    <Bar data={barData} options={{
                        responsive: true,
                        scales: { y: { beginAtZero: true } }
                    }} />
                </div>
            </div>

            {/* Advice Section */}
            <div className={styles.adviceSection}>
                <h3>Personalized Advice</h3>
                {adviceMessages.map((message, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, transform: 'translateY(20px)' }}
                        animate={{ opacity: 1, transform: 'translateY(0)' }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                    >
                        {message}
                    </motion.p>
                ))}
            </div>
        </div>
    );
};

function getCategoryIcon(category) {
    switch (category) {
        case 'Food': return <FaShoppingCart />;
        case 'Bills': return <FaCreditCard />;
        case 'Entertainment': return <FaDollarSign />;
        case 'Miscellaneous': return <MdPayment />;
        default: return <FaDollarSign />;
    }
}

export default ExpensesSection;
