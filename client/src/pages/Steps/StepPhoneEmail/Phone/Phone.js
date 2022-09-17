import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import { AiFillPhone } from "react-icons/ai";
import TextInput from "../../../../components/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onClick }) => {
  const [phone, setPhone] = useState("");

  return (
    <Card
      title="Enter your phone number"
      icon={<AiFillPhone color="#ffcd3a" fontSize={30} />}
    >
      <TextInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone"
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onClick} text="Next" />
        </div>
        <p className={styles.paragraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
