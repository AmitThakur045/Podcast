import styles from "./Loader.module.css";
import { BounceLoader } from "react-spinners";

const Loader = ({ message }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.loader}>
        <BounceLoader color="#1aa3e8" size={80} />
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Loader;
