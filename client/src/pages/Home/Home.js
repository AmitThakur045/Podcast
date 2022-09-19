import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { BsFillMicFill } from "react-icons/bs";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  const startRegister = () => {
    navigate("/authenticate");
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
          <Button onClick={startRegister} text="Let's Go" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.invite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
