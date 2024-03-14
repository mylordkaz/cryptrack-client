import './CryptoTable.css';
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../service/fetchTransactions';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import DeleteTransactionModal from './DeleteTransactionModal';
import axios from 'axios';

interface Transaction {
  id: number;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchAndSetTransactions = async () => {
      try {
        const fetchedTransactions = await fetchTransactions(cryptoName);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error in component:', error);
      }
    };
    fetchAndSetTransactions();
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
  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) return;

    try {
      await axios.delete(
        `https://cryptrack-server.onrender.com/transactions/${selectedTransaction.id}`,
        { withCredentials: true }
      );
      setTransactions(
        transactions.filter((t) => t.id !== selectedTransaction.id)
      );
      setIsModalOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <>
      <DeleteTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
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
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.date}>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.price.toFixed(4)}</td>
                    <td>{transaction.quantity}</td>
                    <td>
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setSelectedTransaction(transaction);
                        }}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
