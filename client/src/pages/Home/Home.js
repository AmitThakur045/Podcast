import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { BsFillMicFill } from "react-icons/bs";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  const startRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Welcome the PodCast!!"
        icon={<BsFillMicFill color="#ffcd3a" fontSize={23} />}
      >
        <p className={styles.text}>
          We're working hard to get provide all the interesting stories of hindu
          mythology, politcs, biography and many more to the people of world.
        </p>
        <div>
          <Button onClick={startRegister} text="Get Your Username" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.invite}>Have an invite text?</span>
          <Link
            to="/login"
            style={{
              color: "#0077FF",
              fontWeight: "bold",
              marginLeft: "10px",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
