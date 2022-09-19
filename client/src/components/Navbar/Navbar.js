import React from "react";
import { Link } from "react-router-dom";
import { BsFillMicFill } from "react-icons/bs";
import styles from "./Navbar.module.css";
import { logout } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const logoStyle = {
    color: "#fff",
    fontWeight: "none",
    fontSize: "1.3rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoutHandler = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={`container ${styles.navbar}`}>
      <Link to="/" style={logoStyle}>
        <BsFillMicFill color="#ffcd3a" />
        <span style={logoText}>PodCast</span>
      </Link>
      {isAuth && <button onClick={logoutHandler}>Logout</button>}
    </nav>
  );
};

export default Navbar;
