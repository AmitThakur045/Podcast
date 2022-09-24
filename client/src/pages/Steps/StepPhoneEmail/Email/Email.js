import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import { AiOutlineMail } from "react-icons/ai";
import TextInput from "../../../../components/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../API";
import { setOtp } from "../../../../store/authSlice";
import { useDispatch } from "react-redux";

const Email = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!email) return;
    // server request
    try {
      const { data } = await sendOtp({ phone: "", email: email });
      dispatch(
        setOtp({ phone: data.phone, email: data.email, hash: data.hash })
      );
      onClick();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      title="Enter your email id"
      icon={<AiOutlineMail color="#ffcd3a" fontSize={30} />}
    >
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={handleSubmit} text="Next" />
        </div>
        <p className={styles.paragraph}>
          By entering your email id, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
