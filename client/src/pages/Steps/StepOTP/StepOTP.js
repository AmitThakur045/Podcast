import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import { AiFillLock } from "react-icons/ai";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import styles from "./StepOTP.module.css";

const StepOTP = ({ onClick }) => {
  const [otp, setOtp] = useState("");

  const next = () => {};

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card
          title="Enter the Otp"
          icon={<AiFillLock color="#ffcd3a" fontSize={30} />}
        >
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={next} text="Next" />
          </div>
          <p className={styles.paragraph}>
            By entering your number, you're agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOTP;
