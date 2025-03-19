import React from "react";
import logo from "../../assets/img/logo.png";
import styles from "./header.module.css";
import { IoMdMenu } from "react-icons/io";
import Footer from "../Footer/Footer";
function Header() {
  return (
    <>
    <header>
      <div className={styles.logo_container}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.menu_btn}><IoMdMenu/></div>
    </header>
    <Footer />
    </>
  );
}

export default Header;
