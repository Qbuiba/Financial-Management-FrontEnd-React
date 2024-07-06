import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function Dashboard() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          console.error('User not authenticated');
          return;
        }

        const token = user.token;
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        const response = await axios.get('/api/finance/overview', config);
        console.log('Response Data:', response.data);

        setTotalBalance(response.data.totalBalance);
        setRecentTransactions(response.data.recentTransactions);
        setUpcomingBills(response.data.upcomingBills);
      } catch (error) {
        console.error('Error fetching financial overview:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-section">
          <h3>Total Balance</h3>
          <p className="amount">${totalBalance}</p>
        </div>
        <div className="dashboard-section">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.map((transaction) => (
              <li key={transaction._id}>
                <span className="description">{transaction.description}</span>
                <span className="date">{new Date(transaction.date).toLocaleDateString()}</span>
                <span className="amount">${transaction.amount}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-section">
          <h3>Upcoming Bills</h3>
          <ul>
            {upcomingBills.map((bill) => (
              <li key={bill._id}>
                <span className="description">{bill.description}</span>
                <span className="date">{new Date(bill.dueDate).toLocaleDateString()}</span>
                <span className="amount">${bill.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
