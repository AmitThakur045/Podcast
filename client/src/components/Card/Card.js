import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        {icon}
        <h1 className={styles.headingtext}>Welcome the PodCast!!</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
