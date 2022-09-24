import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import { AiFillLock } from "react-icons/ai";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import styles from "./StepOTP.module.css";
import { verifyOtp } from "../../../API";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const StepOTP = ({ onClick }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  // fetching the phone and hash from global auth store
  const { phone, email, hash } = useSelector((state) => state.auth.otp);

  const handleSubmit = async () => {
    if (!otp || !hash || !(phone || email)) return;
    try {
      const { data } = await verifyOtp({
        otp,
        phone,
        email,
        hash,
      });
      console.log(data);
      dispatch(setAuth(data));
      onClick();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card
          title="Enter the Otp"
          icon={<AiFillLock color="#ffcd3a" fontSize={30} />}
        >
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={handleSubmit} text="Next" />
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
