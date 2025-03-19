import React from "react";
import styles from "./stockCard.module.css";
import classNames from "classnames";
function StockCard({ stock }) {
  // stock is an object with the following properties: id, model, quantity
 const {brand_name, model, quantity} = stock;
  return (
    <>
      <div className={styles.stock_card}>
        <div className={styles.stock_details}>
          <div>{brand_name}</div>
          <div>Model: {model}</div>
          <div>Quantity: {quantity}</div>
        </div>
        <div className={styles.btn_container}>
          <button className={classNames(styles.btn, styles.add_btn)}>Buy</button>
          <button className={classNames(styles.btn, styles.sell_btn)}>Sell</button>
        </div>
      </div>
    </>
  );
}

export default StockCard;
