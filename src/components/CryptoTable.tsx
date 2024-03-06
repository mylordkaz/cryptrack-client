import './CryptoTable.css';

export default function CryptoTable() {
  return (
    <>
      <div className="crypto-container">
        <div className="crypto-table">
          <div className="crypto-nav">
            <span>Assets</span>
            <button>+</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="coin">Coin</th>
                  <th>Price</th>
                  <th>Holding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BTC</td>
                  <td>$ 67543.43</td>
                  <td>$ 3457.34</td>
                </tr>
                <tr>
                  <td>ETC</td>
                  <td>$ 3463.84</td>
                  <td>$ 2303.12</td>
                </tr>
                <tr>
                  <td>KASPA</td>
                  <td>$ 0.0023</td>
                  <td>$ 654.56</td>
                </tr>
                <tr>
                  <td>USDT</td>
                  <td>$ 1</td>
                  <td>$ 1549</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
