import React from 'react';
import { FaDollarSign, FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import styles from '../../styles/ExpensesSection.module.css';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Function to get category icon
const getCategoryIcon = (category) => {
  switch (category) {
    case 'fasd':
      return <FaDollarSign size={24} className={styles.iconStyle} />;
    case 'sadf':
      return <MdPayment size={24} className={styles.iconStyle} />;
    case 'wqd':
      return <FaShoppingCart size={24} className={styles.iconStyle} />;
    case 'asdas':
      return <FaCreditCard size={24} className={styles.iconStyle} />;
    default:
      return <FaDollarSign size={24} className={styles.iconStyle} />;
  }
};

const ExpensesSection = ({ expenses, budget, previousMonthExpenses }) => {

  // Calculate Total Expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate Average Expense
  const averageExpense = totalExpenses / expenses.length;

  // Calculate Category-wise Distribution
  const categoryDistribution = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  // Extract categories and their amounts for the analysis
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

  // Advice based on spending patterns
  const mostSpentCategory = categoryLabels.reduce((max, category, index) => 
    categoryAmounts[index] > categoryAmounts[max] ? index : max, 0);

  const highestSpendingCategory = categoryLabels[mostSpentCategory];
  const adviceMessages = [];

  // Basic Spending Advice
  adviceMessages.push(`You have spent the most on ${highestSpendingCategory}. Consider reviewing your expenses in this category and look for potential savings.`);

  // Advice for High Spending
  if (categoryDistribution[highestSpendingCategory] > averageExpense * 2) {
    adviceMessages.push(`Your spending on ${highestSpendingCategory} is twice the average. You may want to cut back in this area to save more.`);
  }

  // Advice for Low Spending
  categoryLabels.forEach((category, index) => {
    if (categoryAmounts[index] < averageExpense * 0.5) {
      adviceMessages.push(`Your spending on ${category} is quite low. If this category includes necessary expenses, you may need to reconsider your budget in this area.`);
    }
  });

  // General Budgeting Advice
  if (totalExpenses > 500) {
    adviceMessages.push("Your total expenses are quite high this month. Consider reviewing your overall spending to ensure you're within your budget.");
  }

  // Personalized Budgeting Advice
  if (totalExpenses > averageExpense * categoryLabels.length) {
    adviceMessages.push("Your total expenses this month exceed your average spending per category. Try to balance your budget better across categories.");
  }

  // Budget Comparison Advice
  if (budget && totalExpenses > budget) {
    adviceMessages.push(`You're overspending your budget this month by ₹${totalExpenses - budget}. Consider cutting back in some areas to avoid exceeding your financial limits.`);
  } else if (budget && totalExpenses < budget) {
    adviceMessages.push(`You're under budget this month by ₹${budget - totalExpenses}. Great job! Keep it up or allocate the savings to your future expenses.`);
  }

  // Monthly Analysis Advice
  if (previousMonthExpenses) {
    const spendingChange = totalExpenses - previousMonthExpenses;
    if (spendingChange > 0) {
      adviceMessages.push(`You have spent ₹${spendingChange} more this month than last month. Revisit your spending to see if it's sustainable.`);
    } else if (spendingChange < 0) {
      adviceMessages.push(`Your spending has decreased by ₹${Math.abs(spendingChange)} this month. Keep up the good work managing your expenses.`);
    }
  }

  return (
    <div className={styles.expensesSection}>
      <h2 className={styles.sectionTitle}>Expenses Report</h2>

          {/* Budget Display Section */}
      {budget && (
        <div className={styles.budgetSection}>
          <h3>Budget</h3>
          <p>${budget.toFixed(2)}</p>
        </div>
      )}

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
              <div className={styles.cardAmount}>${expense.amount}</div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardNotes}>{expense.notes}</p>
              <p className={styles.cardDate}>{new Date(expense.date).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expense Analysis Section */}
      <div className={styles.analysisSection}>
        <div className={styles.analysisItem}>
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={styles.analysisItem}>
          <h3>Average Expense</h3>
          <p>${averageExpense.toFixed(2)}</p>
        </div>

        {/* Category-wise Distribution */}
        <div className={styles.categoryDistribution}>
          <h3>Category-wise Expenses</h3>
          <div className={styles.chartWrapper}>
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        {/* Expense Breakdown (Bar Chart) */}
        <div className={styles.barChartSection}>
          <h3>Expenses Breakdown by Category</h3>
          <div className={styles.chartWrapper}>
            <Bar data={barData} options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }} />
          </div>
        </div>

        {/* Advice Section */}
        <div className={styles.adviceSection}>
          <h3>Advice</h3>
          {adviceMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesSection;
