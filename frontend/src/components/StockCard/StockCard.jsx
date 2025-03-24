import React from "react";
import styles from "./stockCard.module.css";
import classNames from "classnames";
function StockCard({ stock }) {
  // stock is an object with the following properties: id, model, quantity
  const { brand_name, model, quantity } = stock;
  return (
    <>
      <div className={styles.stock_card}>
        <div className={styles.stock_info}>
          <div>Boss</div>
          <div>Model: {model}</div>
          <p>
            Quantity: <span>{quantity}</span>
          </p>
        </div>
        <div className={styles.stock_actions}>
          <button className={classNames(styles.btn, styles.add_btn)}>
            Buy
          </button>
          <button className={classNames(styles.btn, styles.sell_btn)}>
            Sell
          </button>
        </div>
      </div>
    </>
  );
}

export default StockCard;
