import './CryptoTable.css';
import add from '../assets/btn+.svg';

export default function TransactionTable() {
  return (
    <>
      <div className="crypto-container">
        <div className="crypto-table">
          <div className="crypto-nav">
            <span>transactions</span>
            <button>
              <img src={add} alt="+ button" />
            </button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
