import React from "react";
import axios from "axios";
import logo from "../../assets/img/logo.png";
import styles from "./header.module.css";
import { IoMdMenu } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
function Header() {
  async function handleLogout() {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );
    localStorage.clear();
    window.location.href = "/login";
  }
  return (
    <>
      <header>
        <div className={styles.logo_container}>
          <img src={logo} alt="" className={styles.logo} />
        </div>
        <nav>
          <ul className={styles.nav_item_list}>
            <li className={styles.nav_item}>
              <a href="" className={styles.nav_link}>
                Dashboard
              </a>
            </li>
            <li className={styles.nav_item}>
              <a href="" className={styles.nav_link}>
                Stocks
              </a>
            </li>
            <li className={styles.nav_item}>
              <a href="" className={styles.nav_link}>
                Credits
              </a>
            </li>
            <li className={styles.nav_item}>
              <a href="" className={styles.nav_link}>
                Users
              </a>
            </li>
            <li className={styles.nav_item}>
              <a href="" className={styles.nav_link}>
                Employees
              </a>
            </li>
            <li>
              <button className={styles.logout} onClick={handleLogout}>
                <span>Logout</span>
                <span>
                  <CiLogout />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
