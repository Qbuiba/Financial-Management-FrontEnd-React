import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Dashboard</h1>
      <h2>Total Balance: ${totalBalance}</h2>
      <h3>Recent Transactions</h3>
      <ul>
        {recentTransactions.map((transaction) => (
          <li key={transaction._id}>
            {new Date(transaction.date).toLocaleDateString()} - {transaction.description}: ${transaction.amount}
          </li>
        ))}
      </ul>
      <h3>Upcoming Bills</h3>
      <ul>
        {upcomingBills.map((bill) => (
          <li key={bill._id}>
            {new Date(bill.dueDate).toLocaleDateString()} - {bill.description}: ${bill.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
