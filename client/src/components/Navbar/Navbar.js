import React from "react";
import { Link } from "react-router-dom";
import { BsFillMicFill } from "react-icons/bs";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const logoStyle = {
    color: "#fff",
    fontWeight: 'none',
    fontSize: "1.3rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  }

  return (
    <nav className={`container ${styles.navbar}`}>
      <Link to="/" style={logoStyle}>
        <BsFillMicFill color="#ffcd3a" />
        <span style={logoText}>PodCast</span>
      </Link>
    </nav>
  );
};

export default Navbar;
