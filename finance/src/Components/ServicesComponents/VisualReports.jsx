import React, { useState, useEffect, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import styles from '../styles/VisualReports.module.css';
import { useTheme } from '../../ThemeContext';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const VisualReports = ({ expenses = [] }) => {
  const { isDarkTheme } = useTheme();
  const [chartData, setChartData] = useState({});
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Function to transform expenses data into chart-friendly format
  const prepareChartData = () => {
    if (!expenses.length) return null;  // Return null if no expenses

    const categories = expenses.map(exp => exp.category);
    const amounts = expenses.map(exp => exp.amount);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Expense Amount',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    // Prepare and set chart data when expenses change
    const data = prepareChartData();
    if (data) {
      setChartData(data);
    }

    return () => {
      // Cleanup chart instances
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
  }, [expenses]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Breakdown',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData?.labels?.length) {
    return <p>No data available to display charts.</p>;  // Conditional rendering if no data
  }

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
      <h2 className={styles.title}>Visual Reports</h2>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <h3>Expense Bar Chart</h3>
          <Bar ref={barChartRef} data={chartData} options={options} />
        </div>

        <div className={styles.chart}>
          <h3>Expense Pie Chart</h3>
          <Pie ref={pieChartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default VisualReports;
