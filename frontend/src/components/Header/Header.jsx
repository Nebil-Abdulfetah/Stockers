import React from "react";
import logo from "../../assets/img/logo(2).png";
import styles from "./header.module.css";
function Header() {
  async function handleLogout(e) {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      console.log("loggedout")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header>
      <aside>
        <div className={styles.logo_container}>
          <a href="#">
            <img src={logo} alt="Company logo" />
          </a>
        </div>
        <ul className={styles.top_nav_item_list}>
          <li className="nav_item">
            <a href="" className="nav_link">
              Dashboard
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Stocks
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Credits
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Users
            </a>
          </li>
          <li className="nav_item">
            <a href="" className="nav_link">
              Employees
            </a>
          </li>
        </ul>
        <ul className={styles.bottom_nav_item_list}>
          <li className="nav_item" onClick={handleLogout}>
            <a href="" className={styles.logout}>
              Logout
            </a>
          </li>
          <li className="user-info">
            <div className={styles.username}>Nebil Abdulfetah</div>
          </li>
        </ul>
      </aside>
    </header>
  );
}

export default Header;
