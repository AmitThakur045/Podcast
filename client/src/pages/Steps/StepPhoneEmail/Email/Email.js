import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import { AiOutlineMail } from "react-icons/ai";
import TextInput from "../../../../components/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onClick }) => {
  const [email, setEmail] = useState("");

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
          <Button onClick={onClick} text="Next" />
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
