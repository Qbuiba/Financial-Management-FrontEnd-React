import React, {useEffect, useState} from 'react';
import axios from 'axios';


//Dashboard components
function Dashboard(){
    const [totalBalance, setTotalBalance] = useState(0);
    const [recentTransaction, setRecentTransaction] = useState([]);
    const [upcomingBills, setUpcomingBills] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {
                    headers: {
                        'x-auth-token' : token
                    }
                };
                const response = await axios.get('/api/finance/overview', config);
                setTotalBalance(response.data.totalBalance);
                setRecentTransaction(response.data.recentTransaction);
                setUpcomingBills(response.data.upcomingBills);
                
            }catch(error){
                console.error('Error fetching financial overview: ', error);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Total Balance: ${totalBalance}</h2>
            <h3>Recent Transactions</h3>
            <ul>
                {recentTransaction.map((transaction)=>(
                    <li key={transaction._id}>
                        {transaction.date} - {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <h3>Upcoming Bills</h3>
            <ul>
                {upcomingBills.map((bill) => (
                <li key={bill._id}>
                    {bill.dueDate} - {bill.description}: ${bill.amount}
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Dashboard;