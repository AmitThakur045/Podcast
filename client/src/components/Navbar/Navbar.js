import React from "react";
import { Link } from "react-router-dom";
import { BsFillMicFill } from "react-icons/bs";
import styles from "./Navbar.module.css";
import { logout } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { setAvatar, setName } from "../../store/activateSlice";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

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
      dispatch(setName(""));
      dispatch(setAvatar(""));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={`container ${styles.navbar}`}>
      <Link to="/" style={logoStyle}>
        <BsFillMicFill color="#ffcd3a" fontSize={20} />
        <span style={logoText}>PodCast</span>
      </Link>

      <div className={styles.rightElement}>
        <h3>{user.name}</h3>
        <Link to="/">
          <img
            className={styles.avatar}
            src={user.avatar}
            alt="avatar"
          />
        </Link>
        <button className={styles.logoutButton} onClick={logoutHandler}>
          <AiOutlineLogout color="#ffcd3a" fontSize={30} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
