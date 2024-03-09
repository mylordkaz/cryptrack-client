import './CryptoTable.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  name: string;
  price: number;
  quantity: number;
  date: string;
}
interface TransactionTableProps {
  cryptoName: string;
  onBack: () => void;
}

export default function TransactionTable({
  cryptoName,
  onBack,
}: TransactionTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/transactions/all?name=${cryptoName}`,
          {
            withCredentials: true,
          }
        );
        setTransactions(response.data.transactions);
        console.log(transactions);
      } catch (error: any) {
        console.error('Error fetching transactions:', error.message);
      }
    };
    fetchTransactions();
  }, [cryptoName]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat(undefined, options);
    return formatter.format(date);
  };

  return (
    <>
      <div className="crypto-container">
        <div className="crypto-table">
          <div className="crypto-nav">
            <span>transactions</span>
            <button onClick={onBack}>back</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.date}>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.price}</td>
                    <td>{transaction.quantity}</td>
                  </tr>
                ))}
                {/* <tr>
                  <td>16/02/24</td>
                  <td>$ 67543.43</td>
                  <td>$ 100</td>
                </tr>
                <tr>
                  <td>05/01/24</td>
                  <td>$ 60345</td>
                  <td>$ 250</td>
                </tr>
                <tr>
                  <td>23/12/23</td>
                  <td>$ 54484</td>
                  <td>$ 100</td>
                </tr>
                <tr>
                  <td>20/12/23</td>
                  <td>$ 66783</td>
                  <td>$ 260</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
