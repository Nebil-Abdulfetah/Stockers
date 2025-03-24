import { useState, useEffect } from "react";
import axios from "axios";
import StockCard from '../../components/StockCard/StockCard';
import styles from './stocks.module.css'
function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stock");
        setStocks(response.data); // Assuming response.data is an array of stock items
      } catch (err) {
        setError("Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <p>Loading stock data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className={styles.stock_container}>
      {stocks.map((stock) => (
        <StockCard key={stock.id} stock={stock} />
      ))
    }
    </div>
    </>
  );
}

export default Stocks;
