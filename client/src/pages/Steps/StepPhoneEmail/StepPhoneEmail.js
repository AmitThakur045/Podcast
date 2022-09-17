import React, { useState } from "react";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import styles from "./StepPhoneEmail.module.css";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onClick }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.iconTab} ${
                type === "phone" && styles.active
              }`}
              onClick={() => setType("phone")}
            >
              <AiFillPhone color="#fff" fontSize={25} />
            </button>
            <button
              className={`${styles.iconTab} ${
                type === "email" && styles.active
              }`}
              onClick={() => setType("email")}
            >
              <AiOutlineMail color="#fff" fontSize={25} />
            </button>
          </div>
          <Component onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
