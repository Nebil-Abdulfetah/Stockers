import { useState, useEffect } from "react";
import axios from "axios";
import StockCard from '../../components/StockCard/StockCard';
import styles from './stocks.module.css'
function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ totalStock: 0, bestSelling: {} });

  useEffect(() => {
    axios.get("http://localhost:5000/stock/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Error fetching stock summary:", err));
  }, []);

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
     <div className={styles.dashboard}>
      {/* 🔹 Summary Section */}
      <div className={styles.summary_card}>
        <h2>📊 Stock Overview</h2>
        <p>Total Stock: <strong>{summary.totalStock.total}</strong></p>
        <p>🏆 Best Selling: <strong>{summary.bestSelling.model} ({summary.bestSelling.sold} sold)</strong></p>
      </div>
    </div>
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
